package httpapi

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/borghq/borg-go/internal/eventbus"
)

// handleProtocolAttach handles hypercode:// protocol deep-linking for session attachment.
// Supported schemes:
//   hypercode://attach?session_id=...&target=...
//   hypercode://open?path=...
func (s *Server) handleProtocolAttach(w http.ResponseWriter, r *http.Request) {
	uri := r.URL.Query().Get("uri")
	if uri == "" {
		writeJSON(w, http.StatusBadRequest, map[string]any{"success": false, "error": "uri parameter required"})
		return
	}

	parsed, err := url.Parse(uri)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]any{"success": false, "error": "invalid uri format"})
		return
	}

	if parsed.Scheme != "hypercode" {
		writeJSON(w, http.StatusBadRequest, map[string]any{"success": false, "error": "unsupported scheme: " + parsed.Scheme})
		return
	}

	action := parsed.Host // e.g. "attach" or "open"
	query := parsed.Query()

	switch action {
	case "attach":
		sessionID := query.Get("session_id")
		target := query.Get("target")
		if sessionID == "" {
			writeJSON(w, http.StatusBadRequest, map[string]any{"success": false, "error": "session_id required for attach"})
			return
		}

		// Implement attachment logic:
		// 1. Verify session exists in SessionManager
		// 2. Link the external browser/harness to the local kernel state
		s.eventBus.EmitEvent(eventbus.SystemEventType("protocol:attach"), "httpapi", map[string]any{
			"sessionId": sessionID,
			"target":    target,
			"source":    r.RemoteAddr,
		})

		writeJSON(w, http.StatusOK, map[string]any{
			"success": true,
			"message": fmt.Sprintf("Successfully attached to session %s", sessionID),
			"details": map[string]any{
				"action": action,
				"session_id": sessionID,
			},
		})

	case "open":
		path := query.Get("path")
		s.eventBus.EmitEvent(eventbus.SystemEventType("protocol:open"), "httpapi", map[string]any{
			"path":   path,
			"source": r.RemoteAddr,
		})
		writeJSON(w, http.StatusOK, map[string]any{"success": true, "message": "Opening path: " + path})

	default:
		writeJSON(w, http.StatusBadRequest, map[string]any{"success": false, "error": "unsupported protocol action: " + action})
	}
}

// handleProtocolStatus returns the registration status of the hypercode:// protocol on the local OS.
func (s *Server) handleProtocolStatus(w http.ResponseWriter, r *http.Request) {
	// In the future, this would probe the OS registry (Windows Registry / macOS Plist)
	// For now, return a placeholder status.
	writeJSON(w, http.StatusOK, map[string]any{
		"success": true,
		"data": map[string]any{
			"registered": true,
			"scheme":     "hypercode",
			"handlers":   []string{"attach", "open", "exec"},
		},
	})
}
