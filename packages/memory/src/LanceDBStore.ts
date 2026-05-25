import { connect } from '@lancedb/lancedb';
import { pipeline } from '@xenova/transformers';
import path from 'path';
import fs from 'fs';
import { IVectorStore } from './IVectorStore.js';

function sanitizeMetadataForArrow(metadata: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(metadata)) {
        if (value === null || value === undefined) {
            result[key] = null;
        } else if (Array.isArray(value) || (typeof value === 'object')) {
            result[key] = JSON.stringify(value);
        } else {
            result[key] = value;
        }
    }
    return result;
}

export class LanceDBStore implements IVectorStore {
    private dbPath: string;
    private db: any;
    private embedder: any;
    private readonly HEAT_DECAY_HALFLIFE_MS = 1000 * 60 * 60 * 24;

    constructor(rootPath: string) {
        this.dbPath = path.join(rootPath, 'data', 'lancedb');
        if (!fs.existsSync(this.dbPath)) fs.mkdirSync(this.dbPath, { recursive: true });
    }

    async initialize() {
        this.db = await connect(this.dbPath);
        this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    async createEmbeddings(text: string): Promise<number[]> {
        const output = await this.embedder(text, { pooling: 'mean', normalize: true });
        return Array.from(output.data);
    }

    async addMemory(content: string, metadata: any) {
        const vector = await this.createEmbeddings(content);
        const { id, type, namespace, heat_score, ...rest } = metadata;
        const data = [{
            vector,
            text: content,
            id: id || `mem-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            type: type || 'memory',
            namespace: namespace || 'project',
            metadata: JSON.stringify(rest),
            heat_score: heat_score ?? 50,
            last_accessed_at: Date.now(),
            timestamp: Date.now()
        }];
        try {
            const table = await this.db.openTable('knowledge_memories');
            await table.add(data);
        } catch (e: any) {
            try {
                await this.db.createTable('knowledge_memories', data);
            } catch (inner: any) {
                if (String(inner).includes('already exists')) {
                    const table = await this.db.openTable('knowledge_memories');
                    await table.add(data);
                } else {
                    throw inner;
                }
            }
        }
    }

    async addDocuments(docs: any[]) {
        const processed = await Promise.all(docs.map(async d => {
            const { id, type, namespace, heat_score, text, content, vector, ...rest } = d;
            return {
                vector: vector || await this.createEmbeddings(text || content),
                text: text || content,
                id: id || `doc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                type: type || 'document',
                namespace: namespace || 'project',
                metadata: JSON.stringify(rest),
                heat_score: heat_score ?? 50,
                last_accessed_at: Date.now(),
                timestamp: Date.now()
            };
        }));
        try {
            const table = await this.db.openTable('knowledge_memories');
            await table.add(processed);
        } catch (e: any) {
            try {
                await this.db.createTable('knowledge_memories', processed);
            } catch (inner: any) {
                if (String(inner).includes('already exists')) {
                    const table = await this.db.openTable('knowledge_memories');
                    await table.add(processed);
                } else {
                    throw inner;
                }
            }
        }
    }

    async get(id: string) {
        try {
            const table = await this.db.openTable('knowledge_memories');
            const res = await table.search(await this.createEmbeddings('')).where(`id = '${id}'`).limit(1).toArray();
            if (res.length === 0) return null;
            const item = res[0];
            const metadata = item.metadata ? JSON.parse(item.metadata) : {};
            return { ...item, ...metadata };
        } catch (e) { return null; }
    }

    async delete(ids: string[]) {
        try {
            const table = await this.db.openTable('knowledge_memories');
            await table.delete(ids.map(id => `id = '${id}'`).join(' OR '));
        } catch (e) { /* ignore if table not found */ }
    }

    async reset() { try { await this.db.dropTable('knowledge_memories'); } catch (e) {} }

    async listDocuments(where?: string, limit: number = 100) {
        try {
            const table = await this.db.openTable('knowledge_memories');
            let q = table.search(await this.createEmbeddings('query')).limit(limit);
            if (where) q = q.where(where);
            const rows = await q.toArray();
            return rows.map(r => {
                const metadata = r.metadata ? JSON.parse(r.metadata) : {};
                return { ...r, ...metadata };
            });
        } catch (e) { return []; }
    }

    async search(query: string, limit: number = 5, where?: string) {
        try {
            const table = await this.db.openTable('knowledge_memories');
            let q = table.search(await this.createEmbeddings(query)).limit(limit);
            if (where) q = q.where(where);
            const rows = await q.toArray();
            return rows.map(r => {
                const metadata = r.metadata ? JSON.parse(r.metadata) : {};
                return { ...r, ...metadata };
            });
        } catch (e) { return []; }
    }

    async maintenance() {
        try {
            const table = await this.db.openTable('knowledge_memories');
            const all = await table.search(await this.createEmbeddings('')).limit(10000).toArray();
            const now = Date.now();
            const updates = all.map((item: any) => {
                const elapsed = now - (item.last_accessed_at || item.timestamp);
                const decay = Math.pow(0.5, elapsed / this.HEAT_DECAY_HALFLIFE_MS);
                return { ...item, heat_score: (item.heat_score || 50) * decay };
            });
            await this.db.dropTable('knowledge_memories');
            await this.db.createTable('knowledge_memories', updates);
        } catch (e) { /* ignore */ }
    }
}
