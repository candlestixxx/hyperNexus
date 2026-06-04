package adapters

import (
	"os"
	"path/filepath"
	"testing"
)

func TestHyperNexusAdapterBuildsStatusWithoutPanicking(t *testing.T) {
	dir := t.TempDir()
	hypernexusDir := filepath.Join(dir, "..", "hypernexus")
	if err := os.MkdirAll(hypernexusDir, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(hypernexusDir, "README.md"), []byte("# HyperNexus"), 0o644); err != nil {
		t.Fatal(err)
	}
	adapter := NewHyperNexusAdapter(dir)
	status := adapter.Status()
	if !status.Assimilated {
		t.Fatal("expected assimilated hypernexus adapter")
	}
	if status.MemoryContext == "" {
		t.Fatal("expected memory context")
	}
	if status.Provider.CurrentProvider == "" {
		t.Fatal("expected provider status")
	}
	if status.HyperNexusRepoPath == "" {
		t.Fatal("expected discovered hypernexus repo path")
	}
	if adapter.RouteMCP("list tools") == "" {
		t.Fatal("expected routed MCP string")
	}
	if adapter.BuildSystemContext() == "" {
		t.Fatal("expected system context")
	}
}
