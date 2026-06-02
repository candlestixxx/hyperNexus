<<<<<<<< HEAD:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/HyperNexusToolWindowFactory.kt
package com.hypernexus.plugin
========
package com.hypercode.plugin
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/HypercodeToolWindowFactory.kt

import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import com.intellij.ui.components.JBLabel
import com.intellij.ui.components.JBScrollPane
import com.intellij.ui.content.ContentFactory
import java.awt.BorderLayout
import javax.swing.*

<<<<<<<< HEAD:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/HyperNexusToolWindowFactory.kt
class HyperNexusToolWindowFactory : ToolWindowFactory {
    
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val panel = HyperNexusToolWindowPanel(project)
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val panel = JPanel(BorderLayout())
        val textArea = JTextArea("hypernexus Hub Status: Connected\n\nWaiting for activity...")
========
class HypercodeToolWindowFactory : ToolWindowFactory {
    
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val panel = HypercodeToolWindowPanel(project)
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val panel = JPanel(BorderLayout())
        val textArea = JTextArea("hypercode Hub Status: Connected\n\nWaiting for activity...")
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/HypercodeToolWindowFactory.kt
        textArea.isEditable = false
        
        val scrollPane = JScrollPane(textArea)
        panel.add(scrollPane, BorderLayout.CENTER)
        
        val bottomPanel = JPanel()
        val refreshButton = JButton("Refresh")
        refreshButton.addActionListener {
            textArea.append("\nRefreshing state...")
        }
        bottomPanel.add(refreshButton)
        panel.add(bottomPanel, BorderLayout.SOUTH)

        val content = ContentFactory.getInstance().createContent(panel, "", false)
        toolWindow.contentManager.addContent(content)
    }
}

<<<<<<<< HEAD:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/HyperNexusToolWindowFactory.kt
class HyperNexusToolWindowPanel(private val project: Project) : JPanel(BorderLayout()) {
    
    private val service = project.getService(HyperNexusService::class.java)
========
class HypercodeToolWindowPanel(private val project: Project) : JPanel(BorderLayout()) {
    
    private val service = project.getService(HypercodeService::class.java)
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/HypercodeToolWindowFactory.kt
    private val statusLabel = JBLabel("Disconnected")
    private val outputArea = JTextArea().apply {
        isEditable = false
        lineWrap = true
        wrapStyleWord = true
    }
    
    init {
        val topPanel = JPanel().apply {
            layout = BoxLayout(this, BoxLayout.X_AXIS)
<<<<<<<< HEAD:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/HyperNexusToolWindowFactory.kt
            add(JBLabel("hypernexus Hub: "))
========
            add(JBLabel("hypercode Hub: "))
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/HypercodeToolWindowFactory.kt
            add(statusLabel)
            add(Box.createHorizontalGlue())
            add(JButton("Connect").apply {
                addActionListener { connect() }
            })
            add(JButton("Refresh").apply {
                addActionListener { refreshAnalytics() }
            })
        }
        
        add(topPanel, BorderLayout.NORTH)
        add(JBScrollPane(outputArea), BorderLayout.CENTER)
        
        val buttonPanel = JPanel().apply {
            layout = BoxLayout(this, BoxLayout.Y_AXIS)
            add(JButton("View Analytics").apply {
                addActionListener { refreshAnalytics() }
            })
            add(JButton("List Templates").apply {
                addActionListener { listTemplates() }
            })
        }
        add(buttonPanel, BorderLayout.EAST)
    }
    
    private fun connect() {
        if (service.connect()) {
            statusLabel.text = "Connected"
<<<<<<<< HEAD:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/HyperNexusToolWindowFactory.kt
            appendOutput("Connected to hypernexus Hub")
            refreshAnalytics()
        } else {
            statusLabel.text = "Connection Failed"
            appendOutput("Failed to connect to hypernexus Hub")
========
            appendOutput("Connected to hypercode Hub")
            refreshAnalytics()
        } else {
            statusLabel.text = "Connection Failed"
            appendOutput("Failed to connect to hypercode Hub")
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/HypercodeToolWindowFactory.kt
        }
    }
    
    private fun refreshAnalytics() {
        val summary = service.getAnalyticsSummary()
        if (summary != null) {
            appendOutput("""
                === Supervisor Analytics ===
                Total Supervisors: ${summary.totalSupervisors}
                Total Debates: ${summary.totalDebates}
                Approved: ${summary.totalApproved}
                Rejected: ${summary.totalRejected}
                Avg Consensus: ${summary.avgConsensus?.let { "%.1f%%".format(it) } ?: "N/A"}
                Avg Confidence: ${summary.avgConfidence?.let { "%.2f".format(it) } ?: "N/A"}
            """.trimIndent())
        } else {
            appendOutput("Failed to fetch analytics")
        }
    }
    
    private fun listTemplates() {
        val templates = service.getDebateTemplates()
        if (templates.isNotEmpty()) {
            appendOutput("\n=== Debate Templates ===")
            templates.forEach { t ->
                appendOutput("â€¢ ${t.name} (${t.id}): ${t.description ?: "No description"}")
            }
        } else {
            appendOutput("No templates available or failed to fetch")
        }
    }
    
    private fun appendOutput(text: String) {
        outputArea.append("$text\n\n")
        outputArea.caretPosition = outputArea.document.length
    }
}
