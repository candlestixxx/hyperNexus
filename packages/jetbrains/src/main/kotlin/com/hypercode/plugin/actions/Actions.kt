class StartDebateAction : AnAction() {
    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val editor = e.getData(CommonDataKeys.EDITOR)
        val selectedText = editor?.selectionModel?.selectedText ?: ""

        val topic = Messages.showInputDialog(project, "Enter debate topic:", "Council Debate", null)
        if (topic != null) {
<<<<<<<< HEAD:packages/jetbrains/src/main/kotlin/com/hypernexus/hypernexus/plugin/actions/Actions.kt
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            val service = project.getService(HyperNexusService::class.java)
========
            val service = project.getService(HyperNexusService::class.java)
========
            val service = project.getService(HypercodeService::class.java)
========
            val service = project.getService(HypercodeService::class.java)
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/actions/Actions.kt
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/actions/Actions.kt
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
        val task = Messages.showInputDialog(project, "Enter task for Architect:", "Architect Mode", null)
        if (task != null) {
<<<<<<<< HEAD:packages/jetbrains/src/main/kotlin/com/hypernexus/hypernexus/plugin/actions/Actions.kt
<<<<<<<< HEAD:archive/ts-legacy/packages/jetbrains/src/main/kotlin/com/hypernexus/plugin/actions/Actions.kt
            val service = project.getService(HyperNexusService::class.java)
========
            val service = project.getService(HyperNexusService::class.java)
========
            val service = project.getService(HypercodeService::class.java)
========
            val service = project.getService(HypercodeService::class.java)
>>>>>>>> origin/dependabot/cargo/packages/zed-extension/cargo-64b2a50fd2:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/actions/Actions.kt
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/jetbrains/src/main/kotlin/com/hypercode/plugin/actions/Actions.kt
            service.startArchitectSession(task) { result ->
                Messages.showInfoMessage(project, result, "Architect Session Started")
            }
        }
    }
}
>>>>>>> a3fab027fd172b66d6a0ec76e91f86354afa48e0
