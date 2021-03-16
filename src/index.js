const core = require("@actions/core")
const {context} = require("@actions/github")
const {getOctokit} = require("@actions/github")
const k8s = require('@kubernetes/client-node');

try {
    if (context.payload.pull_request == null) {
        core.setFailed("No pull request found.")
        return
    }

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    console.log(core.getInput("loadbalancer"))
    console.log(core.getInput("namespace"))
    k8sApi.readNamespacedServiceStatus(core.getInput("loadbalancer"), core.getInput("namespace"))
        .then((serviceStatus) => console.log(serviceStatus))
        .catch((e) => console.log(e))

    const octokit = getOctokit(core.getInput("token"))

    const payload = {
        ...context.repo,
        issue_number: context.payload.pull_request.number,
        body: "Test"
    }

    octokit.issues.createComment(payload)
} catch (error) {
    core.setFailed(error.message)
}
