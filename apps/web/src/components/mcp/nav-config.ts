import {
    Server,
    LayoutDashboard,
    Box,
    Globe,
    Key,
    Layers,
    Shield,
    FileCode,
    FileText,
    Settings,
    Search,
    BookOpen,
    Activity,
    Zap,
    Bot,
    Wrench,
    Download,
    Rocket,
    Brain,
    FlaskConical,
    Terminal,
    FileSearch,
    Settings2,
    Workflow,
    Library,
    BookOpenText,
    BarChart3,
    Hammer,
    Users,
    Eye,
    Heart,
    BookMarked,
    Building2,
    Lightbulb,
    Cog,
    FileCode2,
    ScrollText,
    Sparkles,
    Radio,
    Network,
    ShoppingBag,
} from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: any;
    variant: "default" | "ghost";
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const META_MCP_NAV: NavItem[] = [
    {
        title: "HyperNexus Aggregator Hub",
        href: "/dashboard/mcp",
        icon: Server,
        variant: "default",
    },
    {
        title: "HyperNexus Remote Server Pool",
        href: "/dashboard/mcp/hypernexus",
        icon: Network,
        variant: "ghost",
    },
    {
        title: "HyperNexus Resource Namespaces",
        href: "/dashboard/mcp/namespaces",
        icon: Box,
        variant: "ghost",
    },
    {
        title: "HyperNexus API Endpoints",
        href: "/dashboard/mcp/endpoints",
        icon: Globe,
        variant: "ghost",
    },
    {
        title: "HyperNexus Client API Keys",
        href: "/dashboard/mcp/api-keys",
        icon: Key,
        variant: "ghost",
    },
    {
        title: "HyperNexus Pre-grouped Tool Sets",
        href: "/dashboard/mcp/tool-sets",
        icon: Layers,
        variant: "ghost",
    },
    {
        title: "HyperNexus Tool Access Policies",
        href: "/dashboard/mcp/policies",
        icon: Shield,
        variant: "ghost",
    },
    {
        title: "Saved Automation Scripts",
        href: "/dashboard/mcp/scripts",
        icon: FileCode,
        variant: "ghost",
    },
    {
        title: "HyperNexus System Audit Trail",
        href: "/dashboard/mcp/audit",
        icon: FileText,
        variant: "ghost",
    },
    {
        title: "HyperNexus Daemon & Server Logs",
        href: "/dashboard/mcp/logs",
        icon: Activity,
        variant: "ghost",
    },
    {
        title: "HyperNexus Observability Dashboard",
        href: "/dashboard/mcp/observability",
        icon: Zap,
        variant: "ghost",
    },
    {
        title: "HyperNexus Call & Trace Inspector",
        href: "/dashboard/mcp/inspector",
        icon: Wrench,
        variant: "ghost",
    },
    {
        title: "HyperNexus Agent Playground",
        href: "/dashboard/mcp/agent",
        icon: Bot,
        variant: "ghost",
    },
    {
        title: "AI Provider Credentials Status",
        href: "/dashboard/mcp/ai-tools",
        icon: Sparkles,
        variant: "ghost",
    },
    {
        title: "HyperNexus Gateway Health",
        href: "/dashboard/mcp/system",
        icon: Activity,
        variant: "ghost",
    },
    {
        title: "HyperNexus Semantic Vector Search",
        href: "/dashboard/mcp/search",
        icon: Search,
        variant: "ghost",
    },
    {
        title: "HyperNexus Public Registry",
        href: "/dashboard/mcp/registry",
        icon: Download,
        variant: "ghost",
    },
    {
        title: "HyperNexus Indexed Tool Catalog",
        href: "/dashboard/mcp/catalog",
        icon: Search,
        variant: "ghost",
    },
    {
        title: "HyperNexus API Reference Docs",
        href: "/dashboard/mcp/docs",
        icon: BookOpen,
        variant: "ghost",
    },
    {
        title: "HyperNexus Router JSON Settings",
        href: "/dashboard/mcp/settings",
        icon: Settings,
        variant: "ghost",
    },
];

export const INTEGRATIONS_NAV: NavItem[] = [
    {
        title: "OpenCode Autopilot Console",
        href: "/dashboard/autopilot",
        icon: Sparkles,
        variant: "ghost",
    },
    {
        title: "Jules Autopilot Console",
        href: "/dashboard/jules",
        icon: Rocket,
        variant: "ghost",
    },
];

export const MAIN_DASHBOARD_NAV: NavItem[] = [
    { title: "Main Mission Control", href: "/dashboard", icon: LayoutDashboard, variant: "ghost" },
    { title: "Director Agent Strategy Room", href: "/dashboard/director", icon: Bot, variant: "ghost" },
    { title: "Consensus Debate Council", href: "/dashboard/council", icon: Users, variant: "ghost" },
    { title: "Hierarchical Goal Planner", href: "/dashboard/supervisor", icon: Eye, variant: "ghost" },
    { title: "Multi-Agent Swarm Console", href: "/dashboard/swarm", icon: Users, variant: "ghost" },
    { title: "Knowledge Graph Visualizer", href: "/dashboard/brain", icon: Brain, variant: "ghost" },
    { title: "Deep Research Agent", href: "/dashboard/research", icon: FlaskConical, variant: "ghost" },
    { title: "L1/L2/L3 Memory Vault", href: "/dashboard/memory", icon: Brain, variant: "ghost" },
    { title: "Submodules & Agent Hub", href: "/dashboard/knowledge", icon: Network, variant: "ghost" },
    { title: "LSP Code Symbol Navigator", href: "/dashboard/code", icon: FileCode2, variant: "ghost" },
    { title: "Control Console REPL", href: "/dashboard/command", icon: Terminal, variant: "ghost" },
    { title: "MCP Packet Capture Inspector", href: "/dashboard/inspector", icon: FileSearch, variant: "ghost" },
    { title: "Raw Configuration Editor", href: "/dashboard/settings", icon: Settings2, variant: "ghost" },
    { title: "Agent Workflow Runner", href: "/dashboard/workflows", icon: Workflow, variant: "ghost" },
    { title: "Asset & Reference Library", href: "/dashboard/library", icon: Library, variant: "ghost" },
    { title: "User Guide & Runbooks", href: "/dashboard/manual", icon: BookOpenText, variant: "ghost" },
    { title: "Staged Changes Sandbox", href: "/dashboard/plans", icon: Lightbulb, variant: "ghost" },
    { title: "Performance Analytics", href: "/dashboard/metrics", icon: BarChart3, variant: "ghost" },
    { title: "Agent & Skill Marketplace", href: "/dashboard/marketplace", icon: ShoppingBag, variant: "ghost" },
    { title: "Skill Assimilation Console", href: "/dashboard/skills", icon: Hammer, variant: "ghost" },
    { title: "Parallel Worktree Agents", href: "/dashboard/squads", icon: Users, variant: "ghost" },
    { title: "Immune System Status", href: "/dashboard/healer", icon: Heart, variant: "ghost" },
    { title: "Autonomy & Security Governance", href: "/dashboard/security", icon: Shield, variant: "ghost" },
    { title: "System Event Stream", href: "/dashboard/events", icon: Activity, variant: "ghost" },
    { title: "Kernel Heartbeat & Health", href: "/dashboard/pulse", icon: Radio, variant: "ghost" },
    { title: "Web Markdown Scraper", href: "/dashboard/reader", icon: BookMarked, variant: "ghost" },
    { title: "Monorepo Component Topology", href: "/dashboard/architecture", icon: Building2, variant: "ghost" },
    { title: "Prompt Mutation Engine", href: "/dashboard/evolution", icon: Sparkles, variant: "ghost" },
    { title: "Director Agent Settings", href: "/dashboard/config", icon: Cog, variant: "ghost" },
    { title: "Workspace Git History", href: "/dashboard/chronicle", icon: ScrollText, variant: "ghost" },
    { title: "Git Submodule Manager", href: "/dashboard/submodules", icon: FileCode, variant: "ghost" },
    { title: "Tool Developer Workshop", href: "/dashboard/workshop", icon: Wrench, variant: "ghost" },
    { title: "MCP Overview & Tools", href: "/dashboard/super-assistant", icon: Bot, variant: "ghost" },
    { title: "API Keys, Routing & Billing", href: "/dashboard/billing", icon: Key, variant: "ghost" },
];

export const SIDEBAR_SECTIONS: NavSection[] = [
    {
        title: "HyperNexus Tools",
        items: META_MCP_NAV,
    },
    {
        title: "Integrations",
        items: INTEGRATIONS_NAV,
    },
    {
        title: "Main Dashboard + Subpages",
        items: MAIN_DASHBOARD_NAV,
    },
];
