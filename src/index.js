const core = require("@actions/core")
const {getInput, setFailed} = require("@actions/core")
const {context} = require("@actions/github")

try {
    const github_token = core.getInput('GITHUB_TOKEN');

    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }

    const pull_request_number = context.payload.pull_request.number;

    const octokit = new github.GitHub(github_token);

    octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request_number,
        body: "Testnachricht"
    });
} catch (error) {
    core.setFailed(error.message);
}
