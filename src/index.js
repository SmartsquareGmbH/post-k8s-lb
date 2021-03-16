const core = require("@actions/core")
const { context } = require("@actions/github")
const { getOctokit } = require("@actions/github")
const k8s = require("@kubernetes/client-node")

const createComment = (response) => {
  const externalIp = response.body.status.loadBalancer.ingress[0].ip
  const name = response.body.metadata.name

  return `${name} is now available at ${externalIp} :sunglasses:`
}

if (context.payload.pull_request == null) {
  core.setFailed("No pull request found.")
  return
}

const octokit = getOctokit(core.getInput("token"))

const kc = new k8s.KubeConfig()
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

k8sApi
  .readNamespacedServiceStatus(core.getInput("loadbalancer"), core.getInput("namespace"))
  .then((serviceStatus) => createComment(serviceStatus))
  .then((body) => ({ ...context.repo, issue_number: context.payload.pull_request.number, body: body }))
  .then((payload) => octokit.issues.createComment(payload))
  .catch((e) => core.setFailed(e))
