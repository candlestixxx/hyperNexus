package agents

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

<<<<<<<< HEAD:agents/provider_hypernexus.go
type HyperNexusControlPlaneProvider struct {
	BaseURL string
}

func NewHyperNexusProvider() *HyperNexusControlPlaneProvider {
	return &HyperNexusControlPlaneProvider{
========
type HyperNexusControlPlaneProvider struct {
	BaseURL string
}

func NewHyperNexusProvider() *HyperNexusControlPlaneProvider {
	return &HyperNexusControlPlaneProvider{
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:agents/provider_hypernexus.go
		BaseURL: "http://127.0.0.1:4000",
	}
}

<<<<<<<< HEAD:agents/provider_hypernexus.go
func (p *HyperNexusControlPlaneProvider) Chat(ctx context.Context, messages []Message, tools []Tool) (Message, error) {
========
func (p *HyperNexusControlPlaneProvider) Chat(ctx context.Context, messages []Message, tools []Tool) (Message, error) {
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:agents/provider_hypernexus.go
	// Re-map messages to the format expected by the /api/agent/chat endpoint
	type payloadMsg struct {
		Role    string `json:"role"`
		Content string `json:"content"`
	}

	var history []payloadMsg
	for _, msg := range messages {
		history = append(history, payloadMsg{
			Role:    string(msg.Role),
			Content: msg.Content,
		})
	}

	reqBody, err := json.Marshal(map[string]interface{}{
		"message": "", // We send the full history
		"history": history,
	})
	if err != nil {
		return Message{}, err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", p.BaseURL+"/api/agent/chat", bytes.NewBuffer(reqBody))
	if err != nil {
		return Message{}, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 120 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
<<<<<<<< HEAD:agents/provider_hypernexus.go
		return Message{}, fmt.Errorf("failed to contact HyperNexus Control Plane: %w", err)
========
		return Message{}, fmt.Errorf("failed to contact HyperNexus Control Plane: %w", err)
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:agents/provider_hypernexus.go
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
<<<<<<<< HEAD:agents/provider_hypernexus.go
		return Message{}, fmt.Errorf("HyperNexus API error: %s - %s", resp.Status, string(body))
========
		return Message{}, fmt.Errorf("HyperNexus API error: %s - %s", resp.Status, string(body))
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:agents/provider_hypernexus.go
	}

	var result struct {
		Success bool `json:"success"`
		Data    struct {
			Content  string `json:"content"`
			Provider string `json:"provider"`
			Model    string `json:"model"`
		} `json:"data"`
		Error string `json:"error"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
<<<<<<<< HEAD:agents/provider_hypernexus.go
		return Message{}, fmt.Errorf("failed to parse HyperNexus response: %w", err)
	}

	if !result.Success {
		return Message{}, fmt.Errorf("HyperNexus rejected chat: %s", result.Error)
========
		return Message{}, fmt.Errorf("failed to parse HyperNexus response: %w", err)
	}

	if !result.Success {
		return Message{}, fmt.Errorf("HyperNexus rejected chat: %s", result.Error)
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:agents/provider_hypernexus.go
	}

	return Message{
		Role:    RoleAssistant,
		Content: result.Data.Content,
	}, nil
}

<<<<<<<< HEAD:agents/provider_hypernexus.go
func (p *HyperNexusControlPlaneProvider) Stream(ctx context.Context, messages []Message, tools []Tool, chunkChan chan<- string) error {
========
func (p *HyperNexusControlPlaneProvider) Stream(ctx context.Context, messages []Message, tools []Tool, chunkChan chan<- string) error {
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:agents/provider_hypernexus.go
	// Fallback to synchronous chat if streaming isn't perfectly supported on the sidecar yet
	msg, err := p.Chat(ctx, messages, tools)
	if err != nil {
		return err
	}
	chunkChan <- msg.Content
	close(chunkChan)
	return nil
}

<<<<<<<< HEAD:agents/provider_hypernexus.go
func (p *HyperNexusControlPlaneProvider) GetModelName() string {
	return "hypernexus-router-active"
========
func (p *HyperNexusControlPlaneProvider) GetModelName() string {
	return "hypernexus-router-active"
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:agents/provider_hypernexus.go
}
