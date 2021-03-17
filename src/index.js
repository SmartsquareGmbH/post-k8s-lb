const { isLoadBalancer, hasExternalAddress, createComment } = require("./kubernetes.js")

const promiseRetry = require("promise-retry")
const k8s = require("@kubernetes/client-node")

const core = require("@actions/core")
const { context } = require("@actions/github")
const { getOctokit } = require("@actions/github")

async function fetchServiceStatus() {
  const kc = new k8s.KubeConfig()
  kc.loadFromDefault()
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

  const response = await k8sApi.readNamespacedServiceStatus(core.getInput("loadbalancer"), core.getInput("namespace"))

  if (!isLoadBalancer(response.body)) {
    throw Error("Given service is not a load balancer.")
  }

  if (!hasExternalAddress(response.body)) {
    throw Error("Given load balancer has no external ip assigned yet.")
  }

  return response.body
}

const run = async () => {
  if (context.payload.pull_request == null) {
    throw Error("No pull request found.")
  }

  const service = await promiseRetry(function (retry, number) {
    if (number > 1) {
      console.log(`Retry Attempt: ${number}.`)
    }

    return fetchServiceStatus().catch(retry)
  })

  const body = createComment(service)

  const octokit = getOctokit(core.getInput("token"))
  octokit.issues.createComment({ ...context.repo, issue_number: context.payload.pull_request.number, body: body })
}

run()
  .then()
  .catch((error) => core.setFailed(error.message))
