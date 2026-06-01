<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
package com.HyperNexus.plugin.actions

import com.HyperNexus.plugin.HyperNexusService
========
package com.hypernexus.plugin.actions

import com.hypernexus.plugin.HyperNexusService
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
import com.intellij.notification.NotificationGroupManager
import com.intellij.notification.NotificationType
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.actionSystem.CommonDataKeys
import com.intellij.openapi.ui.Messages

class ConnectAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        val service = project.getService(HyperNexusService::class.java)
        
        val url = Messages.showInputDialog(
            project,
            "Enter HyperNexus Hub URL:",
            "Connect to HyperNexus Hub",
=        val service = project.getService(HyperNexusService::class.java)
        
        val url = Messages.showInputDialog(
            project,
            "Enter hypernexus Hub URL:",
            "Connect to hypernexus Hub",
>            null,
            "http://localhost:3000",
            null
        ) ?: return
        
        service.setHubUrl(url)
        if (service.connect()) {
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            notify(project, "Connected to HyperNexus Hub", NotificationType.INFORMATION)
        } else {
            notify(project, "Failed to connect to HyperNexus Hub", NotificationType.ERROR)
========
            notify(project, "Connected to hypernexus Hub", NotificationType.INFORMATION)
        } else {
            notify(project, "Failed to connect to hypernexus Hub", NotificationType.ERROR)
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        }
    }
    
    private fun notify(project: com.intellij.openapi.project.Project, message: String, type: NotificationType) {
        NotificationGroupManager.getInstance()
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            .getNotificationGroup("HyperNexus Notifications")
========
            .getNotificationGroup("hypernexus Notifications")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            .createNotification(message, type)
            .notify(project)
    }
}

class DisconnectAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        val service = project.getService(HyperNexusService::class.java)
        service.disconnect()
        
        NotificationGroupManager.getInstance()
            .getNotificationGroup("HyperNexus Notifications")
            .createNotification("Disconnected from HyperNexus Hub", NotificationType.INFORMATION)
========
        val service = project.getService(HyperNexusService::class.java)
        service.disconnect()
        
        NotificationGroupManager.getInstance()
            .getNotificationGroup("hypernexus Notifications")
            .createNotification("Disconnected from hypernexus Hub", NotificationType.INFORMATION)
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            .notify(project)
    }
}

class StartDebateAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val editor = e.getData(CommonDataKeys.EDITOR) ?: return
        val file = e.getData(CommonDataKeys.VIRTUAL_FILE) ?: return
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        val service = project.getService(HyperNexusService::class.java)
        
        if (!service.isConnected()) {
            Messages.showErrorDialog(project, "Not connected to HyperNexus Hub", "HyperNexus")
========
        val service = project.getService(HyperNexusService::class.java)
        
        if (!service.isConnected()) {
            Messages.showErrorDialog(project, "Not connected to hypernexus Hub", "hypernexus")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            return
        }
        
        val description = Messages.showInputDialog(
            project,
            "Describe what to debate:",
            "Start Council Debate",
            null
        ) ?: return
        
        val selection = editor.selectionModel
        val context = if (selection.hasSelection()) {
            selection.selectedText ?: ""
        } else {
            editor.document.text
        }
        
        val result = service.startDebate(description, file.path, context)
        
        if (result != null) {
            Messages.showInfoMessage(
                project,
                "Decision: ${result.decision}\nConsensus: ${result.consensusLevel}%\n\n${result.reasoning}",
                "Council Debate Result"
            )
        } else {
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            Messages.showErrorDialog(project, "Debate failed", "HyperNexus")
========
            Messages.showErrorDialog(project, "Debate failed", "hypernexus")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
=======
class StartDebateAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val editor = e.getData(CommonDataKeys.EDITOR)
        val selectedText = editor?.selectionModel?.selectedText ?: ""
        
        val topic = Messages.showInputDialog(project, "Enter debate topic:", "Council Debate", null)
        if (topic != null) {
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            val service = project.getService(HyperNexusService::class.java)
========
            val service = project.getService(HyperNexusService::class.java)
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            service.startDebate(topic, selectedText) { result ->
                Messages.showInfoMessage(project, result, "Debate Result")
            }
>>>>>>> a3fab027fd172b66d6a0ec76e91f86354afa48e0
        }
    }
}

class ArchitectModeAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        val service = project.getService(HyperNexusService::class.java)
        
        if (!service.isConnected()) {
            Messages.showErrorDialog(project, "Not connected to HyperNexus Hub", "HyperNexus")
=        val service = project.getService(HyperNexusService::class.java)
        
        if (!service.isConnected()) {
            Messages.showErrorDialog(project, "Not connected to hypernexus Hub", "hypernexus")
>            return
        }
        
        val task = Messages.showInputDialog(
            project,
            "Describe the task for reasoning:",
            "Architect Mode",
            null
        ) ?: return
        
        val session = service.startArchitectSession(task)
        
        if (session != null) {
            val approve = Messages.showYesNoDialog(
                project,
                "Session: ${session.sessionId}\nStatus: ${session.status}\n\n${session.plan?.description ?: "No plan yet"}\n\nApprove this plan?",
                "Architect Session",
                Messages.getQuestionIcon()
            )
            
            if (approve == Messages.YES) {
                service.approveArchitectPlan(session.sessionId)
                NotificationGroupManager.getInstance()
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
                    .getNotificationGroup("HyperNexus Notifications")
========
                    .getNotificationGroup("hypernexus Notifications")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
                    .createNotification("Plan approved", NotificationType.INFORMATION)
                    .notify(project)
            }
        } else {
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            Messages.showErrorDialog(project, "Failed to start architect session", "HyperNexus")
========
            Messages.showErrorDialog(project, "Failed to start architect session", "hypernexus")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        }
    }
}

class ViewAnalyticsAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        val service = project.getService(HyperNexusService::class.java)
        
        if (!service.isConnected()) {
            Messages.showErrorDialog(project, "Not connected to HyperNexus Hub", "HyperNexus")
========
        val service = project.getService(HyperNexusService::class.java)
        
        if (!service.isConnected()) {
            Messages.showErrorDialog(project, "Not connected to hypernexus Hub", "hypernexus")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            return
        }
        
        val summary = service.getAnalyticsSummary()
        
        if (summary != null) {
            Messages.showInfoMessage(
                project,
                """
                Total Supervisors: ${summary.totalSupervisors}
                Total Debates: ${summary.totalDebates}
                Approved: ${summary.totalApproved}
                Rejected: ${summary.totalRejected}
                Avg Consensus: ${summary.avgConsensus?.let { "%.1f%%".format(it) } ?: "N/A"}
                Avg Confidence: ${summary.avgConfidence?.let { "%.2f".format(it) } ?: "N/A"}
                """.trimIndent(),
                "Supervisor Analytics"
            )
        } else {
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            Messages.showErrorDialog(project, "Failed to fetch analytics", "HyperNexus")
========
            Messages.showErrorDialog(project, "Failed to fetch analytics", "hypernexus")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        }
    }
}

class RunAgentAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        Messages.showInfoMessage(project, "Run Agent feature coming soon", "HyperNexus")
========
        Messages.showInfoMessage(project, "Run Agent feature coming soon", "hypernexus")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
    }
}

class SearchMemoryAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
        Messages.showInfoMessage(project, "Search Memory feature coming soon", "HyperNexus")
========
        Messages.showInfoMessage(project, "Search Memory feature coming soon", "hypernexus")
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
    }
}
=======
        val task = Messages.showInputDialog(project, "Enter task for Architect:", "Architect Mode", null)
        if (task != null) {
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            val service = project.getService(HyperNexusService::class.java)
========
            val service = project.getService(HyperNexusService::class.java)
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            service.startArchitectSession(task) { result ->
                Messages.showInfoMessage(project, result, "Architect Session Started")
            }
        }
    }
}
>>>>>>> a3fab027fd172b66d6a0ec76e91f86354afa48e0
