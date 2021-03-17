const isLoadBalancer = (service) => service.spec.type === "LoadBalancer"

const hasExternalAddress = (service) => {
  return service.status.loadBalancer.ingress && service.status.loadBalancer.ingress.length === 1
}

const createComment = (service) => {
  const externalIp = service.status.loadBalancer.ingress[0].ip
  const name = service.metadata.name

  return `${name} is now available at ${externalIp}. :sunglasses:`
}

module.exports = { isLoadBalancer, hasExternalAddress, createComment }
