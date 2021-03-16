const core = require("@actions/core")
const {context} = require("@actions/github")
const {getOctokit} = require("@actions/github")

try {
    const github_token = core.getInput("token")

    if (context.payload.pull_request == null) {
        core.setFailed("No pull request found.")
        return
    }

    const octokit = getOctokit(github_token)

    const payload = {
        ...context.repo,
        issue_number: context.payload.pull_request.number,
        body: "Test"
    }

    octokit.issues.createComment(payload)
} catch (error) {
    core.setFailed(error.message)
}
