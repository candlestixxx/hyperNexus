package adapters

import (
	"os"
	"path/filepath"
	"testing"
)

<<<<<<<< HEAD:foundation/adapters/hypernexus_test.go
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
========
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
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:foundation/adapters/hypernexus_test.go
	}
	if status.MemoryContext == "" {
		t.Fatal("expected memory context")
	}
	if status.Provider.CurrentProvider == "" {
		t.Fatal("expected provider status")
	}
<<<<<<<< HEAD:foundation/adapters/hypernexus_test.go
	if status.HyperNexusRepoPath == "" {
		t.Fatal("expected discovered hypernexus repo path")
========
	if status.HyperNexusRepoPath == "" {
		t.Fatal("expected discovered hypernexus repo path")
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:foundation/adapters/hypernexus_test.go
	}
	if adapter.RouteMCP("list tools") == "" {
		t.Fatal("expected routed MCP string")
	}
	if adapter.BuildSystemContext() == "" {
		t.Fatal("expected system context")
	}
}
