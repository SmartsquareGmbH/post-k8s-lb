const isLoadBalancer = (service) => service.spec.type === "LoadBalancer"

const hasExternalAddress = (service) => Object.prototype.hasOwnProperty.call(service.status.loadBalancer, "ingress")

const createComment = (service) => {
  const externalIp = service.status.loadBalancer.ingress[0].ip
  const name = service.metadata.name

  return `${name} is now available at ${externalIp} :sunglasses:`
}

module.exports = { isLoadBalancer, hasExternalAddress, createComment }
