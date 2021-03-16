const core = require("@actions/core")
const {context} = require("@actions/github")
const {getOctokit} = require("@actions/github")

try {
    const github_token = core.getInput("GITHUB_TOKEN")

    if (context.payload.pull_request == null) {
        core.setFailed("No pull request found.")
        return
    }

    const octokit = getOctokit(github_token)

    await octokit.issues.createComment({
        ...context.repo,
        issue_number: context.payload.pull_request.number,
        body: "Test"
    });
} catch (error) {
    core.setFailed(error.message)
}
