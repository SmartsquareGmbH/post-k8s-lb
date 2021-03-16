const core = require("@actions/core")
const {context} = require("@actions/github")
const {getOctokit} = require("@actions/github")
const k8s = require('@kubernetes/client-node');

try {
    if (context.payload.pull_request == null) {
        core.setFailed("No pull request found.")
        return
    }

    const octokit = getOctokit(core.getInput("token"))

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

    k8sApi.readNamespacedServiceStatus(core.getInput("loadbalancer"), core.getInput("namespace"))
        .then((serviceStatus) => serviceStatus.body.status.loadBalancer.ingress[0].ip)
        .then((ip) => ({
            ...context.repo,
            issue_number: context.payload.pull_request.number,
            body: `Test: ${ip}`
        }))
        .then((payload) => octokit.issues.createComment(payload))
        .catch((e) => console.log(e))
} catch (error) {
    core.setFailed(error.message)
}
