const { isLoadBalancer, hasExternalAddress, createComment } = require("../kubernetes")

test("internal service is not a load balancer", () => {
  const internalService = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "ci.werf.io/commit": "7885343b7e004d56e7fa06aad9f071247bdfe78e",
        "github.ci.werf.io/workflow-run-url":
          "https://github.com/SmartsquareGmbH/smartbot-framework/actions/runs/658136375",
        "meta.helm.sh/release-name": "smartbot-production",
        "meta.helm.sh/release-namespace": "smartbot-production",
        "project.werf.io/env": "production",
        "project.werf.io/git": "https://github.com/SmartsquareGmbH/smartbot-framework",
        "project.werf.io/name": "smartbot",
        "werf.io/version": "v1.2.10+fix4",
      },
      creationTimestamp: "2021-03-15T13:56:34Z",
      labels: {
        "app.kubernetes.io/instance": "smartbot-production",
        "app.kubernetes.io/managed-by": "Helm",
        "app.kubernetes.io/name": "emqx",
        "helm.sh/chart": "emqx-4.2.8",
      },
      managedFields: [
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                ".": {},
                "f:ci.werf.io/commit": {},
                "f:github.ci.werf.io/workflow-run-url": {},
                "f:meta.helm.sh/release-name": {},
                "f:meta.helm.sh/release-namespace": {},
                "f:project.werf.io/env": {},
                "f:project.werf.io/git": {},
                "f:project.werf.io/name": {},
                "f:werf.io/version": {},
              },
              "f:labels": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/managed-by": {},
                "f:app.kubernetes.io/name": {},
                "f:helm.sh/chart": {},
              },
            },
            "f:spec": {
              "f:clusterIP": {},
              "f:ports": {
                ".": {},
                'k:{"port":18083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":1883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":4370,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8081,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8084,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
              },
              "f:selector": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/name": {},
              },
              "f:sessionAffinity": {},
              "f:type": {},
            },
          },
          manager: "Go-http-client",
          operation: "Update",
          time: "2021-03-15T13:56:34Z",
        },
      ],
      name: "smartbot-production-emqx-headless",
      namespace: "smartbot-production",
      resourceVersion: "634804",
      selfLink: "/api/v1/namespaces/smartbot-production/services/smartbot-production-emqx-headless",
      uid: "5f1dbc43-11b7-4f51-9ae3-0b323310a8d2",
    },
    spec: {
      clusterIP: "None",
      ports: [
        {
          name: "mqtt",
          port: 1883,
          protocol: "TCP",
          targetPort: "mqtt",
        },
        {
          name: "mqttssl",
          port: 8883,
          protocol: "TCP",
          targetPort: "mqttssl",
        },
        {
          name: "mgmt",
          port: 8081,
          protocol: "TCP",
          targetPort: "mgmt",
        },
        {
          name: "ws",
          port: 8083,
          protocol: "TCP",
          targetPort: "ws",
        },
        {
          name: "wss",
          port: 8084,
          protocol: "TCP",
          targetPort: "wss",
        },
        {
          name: "dashboard",
          port: 18083,
          protocol: "TCP",
          targetPort: "dashboard",
        },
        {
          name: "ekka",
          port: 4370,
          protocol: "TCP",
          targetPort: "ekka",
        },
      ],
      selector: {
        "app.kubernetes.io/instance": "smartbot-production",
        "app.kubernetes.io/name": "emqx",
      },
      sessionAffinity: "None",
      type: "ClusterIP",
    },
    status: {
      loadBalancer: {},
    },
  }

  expect(isLoadBalancer(internalService)).toBeFalsy()
})

test("is load balancer", () => {
  const loadBalancer = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "kubernetes.digitalocean.com/load-balancer-id": "68504feb-3a4a-4ba7-a6d9-8e3812120f9a",
        "meta.helm.sh/release-name": "smartbot",
        "meta.helm.sh/release-namespace": "smartbot",
        "project.werf.io/env": "",
        "project.werf.io/name": "smartbot",
        "werf.io/version": "v1.2.9+fix9",
      },
      creationTimestamp: "2021-03-16T08:04:20Z",
      finalizers: ["service.kubernetes.io/load-balancer-cleanup"],
      labels: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/managed-by": "Helm",
        "app.kubernetes.io/name": "emqx",
        "helm.sh/chart": "emqx-4.2.8",
      },
      managedFields: [
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                ".": {},
                "f:meta.helm.sh/release-name": {},
                "f:meta.helm.sh/release-namespace": {},
                "f:project.werf.io/env": {},
                "f:project.werf.io/name": {},
                "f:werf.io/version": {},
              },
              "f:labels": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/managed-by": {},
                "f:app.kubernetes.io/name": {},
                "f:helm.sh/chart": {},
              },
            },
            "f:spec": {
              "f:externalTrafficPolicy": {},
              "f:ports": {
                ".": {},
                'k:{"port":18083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":1883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8081,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8084,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
              },
              "f:selector": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/name": {},
              },
              "f:sessionAffinity": {},
              "f:type": {},
            },
          },
          manager: "Go-http-client",
          operation: "Update",
          time: "2021-03-16T08:04:20Z",
        },
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                "f:kubernetes.digitalocean.com/load-balancer-id": {},
              },
              "f:finalizers": {
                ".": {},
                'v:"service.kubernetes.io/load-balancer-cleanup"': {},
              },
            },
            "f:status": {
              "f:loadBalancer": {
                "f:ingress": {},
              },
            },
          },
          manager: "digitalocean-cloud-controller-manager",
          operation: "Update",
          time: "2021-03-16T08:06:49Z",
        },
      ],
      name: "smartbot-emqx",
      namespace: "smartbot",
      resourceVersion: "585838",
      selfLink: "/api/v1/namespaces/smartbot/services/smartbot-emqx",
      uid: "0cc414f8-a4d2-49ce-986f-3e6f7b96ce3e",
    },
    spec: {
      clusterIP: "10.245.141.106",
      externalTrafficPolicy: "Cluster",
      ports: [
        {
          name: "mqtt",
          nodePort: 30092,
          port: 1883,
          protocol: "TCP",
          targetPort: "mqtt",
        },
        {
          name: "mqttssl",
          nodePort: 30959,
          port: 8883,
          protocol: "TCP",
          targetPort: "mqttssl",
        },
        {
          name: "mgmt",
          nodePort: 30109,
          port: 8081,
          protocol: "TCP",
          targetPort: "mgmt",
        },
        {
          name: "ws",
          nodePort: 31746,
          port: 8083,
          protocol: "TCP",
          targetPort: "ws",
        },
        {
          name: "wss",
          nodePort: 32098,
          port: 8084,
          protocol: "TCP",
          targetPort: "wss",
        },
        {
          name: "dashboard",
          nodePort: 30344,
          port: 18083,
          protocol: "TCP",
          targetPort: "dashboard",
        },
      ],
      selector: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/name": "emqx",
      },
      sessionAffinity: "None",
      type: "LoadBalancer",
    },
    status: {
      loadBalancer: {
        ingress: [
          {
            ip: "157.230.78.23",
          },
        ],
      },
    },
  }

  expect(isLoadBalancer(loadBalancer)).toBeTruthy()
})

test("address of load balancer is pending", () => {
  const loadBalancer = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "kubernetes.digitalocean.com/load-balancer-id": "68504feb-3a4a-4ba7-a6d9-8e3812120f9a",
        "meta.helm.sh/release-name": "smartbot",
        "meta.helm.sh/release-namespace": "smartbot",
        "project.werf.io/env": "",
        "project.werf.io/name": "smartbot",
        "werf.io/version": "v1.2.9+fix9",
      },
      creationTimestamp: "2021-03-16T08:04:20Z",
      finalizers: ["service.kubernetes.io/load-balancer-cleanup"],
      labels: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/managed-by": "Helm",
        "app.kubernetes.io/name": "emqx",
        "helm.sh/chart": "emqx-4.2.8",
      },
      managedFields: [
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                ".": {},
                "f:meta.helm.sh/release-name": {},
                "f:meta.helm.sh/release-namespace": {},
                "f:project.werf.io/env": {},
                "f:project.werf.io/name": {},
                "f:werf.io/version": {},
              },
              "f:labels": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/managed-by": {},
                "f:app.kubernetes.io/name": {},
                "f:helm.sh/chart": {},
              },
            },
            "f:spec": {
              "f:externalTrafficPolicy": {},
              "f:ports": {
                ".": {},
                'k:{"port":18083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":1883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8081,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8084,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
              },
              "f:selector": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/name": {},
              },
              "f:sessionAffinity": {},
              "f:type": {},
            },
          },
          manager: "Go-http-client",
          operation: "Update",
          time: "2021-03-16T08:04:20Z",
        },
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                "f:kubernetes.digitalocean.com/load-balancer-id": {},
              },
              "f:finalizers": {
                ".": {},
                'v:"service.kubernetes.io/load-balancer-cleanup"': {},
              },
            },
            "f:status": {
              "f:loadBalancer": {
                "f:ingress": {},
              },
            },
          },
          manager: "digitalocean-cloud-controller-manager",
          operation: "Update",
          time: "2021-03-16T08:06:49Z",
        },
      ],
      name: "smartbot-emqx",
      namespace: "smartbot",
      resourceVersion: "585838",
      selfLink: "/api/v1/namespaces/smartbot/services/smartbot-emqx",
      uid: "0cc414f8-a4d2-49ce-986f-3e6f7b96ce3e",
    },
    spec: {
      clusterIP: "10.245.141.106",
      externalTrafficPolicy: "Cluster",
      ports: [
        {
          name: "mqtt",
          nodePort: 30092,
          port: 1883,
          protocol: "TCP",
          targetPort: "mqtt",
        },
        {
          name: "mqttssl",
          nodePort: 30959,
          port: 8883,
          protocol: "TCP",
          targetPort: "mqttssl",
        },
        {
          name: "mgmt",
          nodePort: 30109,
          port: 8081,
          protocol: "TCP",
          targetPort: "mgmt",
        },
        {
          name: "ws",
          nodePort: 31746,
          port: 8083,
          protocol: "TCP",
          targetPort: "ws",
        },
        {
          name: "wss",
          nodePort: 32098,
          port: 8084,
          protocol: "TCP",
          targetPort: "wss",
        },
        {
          name: "dashboard",
          nodePort: 30344,
          port: 18083,
          protocol: "TCP",
          targetPort: "dashboard",
        },
      ],
      selector: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/name": "emqx",
      },
      sessionAffinity: "None",
      type: "LoadBalancer",
    },
    status: {
      loadBalancer: {},
    },
  }

  expect(hasExternalAddress(loadBalancer)).toBeFalsy()
})

test("address of load balancer is pending (empty array)", () => {
  const loadBalancer = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "kubernetes.digitalocean.com/load-balancer-id": "68504feb-3a4a-4ba7-a6d9-8e3812120f9a",
        "meta.helm.sh/release-name": "smartbot",
        "meta.helm.sh/release-namespace": "smartbot",
        "project.werf.io/env": "",
        "project.werf.io/name": "smartbot",
        "werf.io/version": "v1.2.9+fix9",
      },
      creationTimestamp: "2021-03-16T08:04:20Z",
      finalizers: ["service.kubernetes.io/load-balancer-cleanup"],
      labels: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/managed-by": "Helm",
        "app.kubernetes.io/name": "emqx",
        "helm.sh/chart": "emqx-4.2.8",
      },
      managedFields: [
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                ".": {},
                "f:meta.helm.sh/release-name": {},
                "f:meta.helm.sh/release-namespace": {},
                "f:project.werf.io/env": {},
                "f:project.werf.io/name": {},
                "f:werf.io/version": {},
              },
              "f:labels": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/managed-by": {},
                "f:app.kubernetes.io/name": {},
                "f:helm.sh/chart": {},
              },
            },
            "f:spec": {
              "f:externalTrafficPolicy": {},
              "f:ports": {
                ".": {},
                'k:{"port":18083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":1883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8081,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8084,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
              },
              "f:selector": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/name": {},
              },
              "f:sessionAffinity": {},
              "f:type": {},
            },
          },
          manager: "Go-http-client",
          operation: "Update",
          time: "2021-03-16T08:04:20Z",
        },
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                "f:kubernetes.digitalocean.com/load-balancer-id": {},
              },
              "f:finalizers": {
                ".": {},
                'v:"service.kubernetes.io/load-balancer-cleanup"': {},
              },
            },
            "f:status": {
              "f:loadBalancer": {
                "f:ingress": {},
              },
            },
          },
          manager: "digitalocean-cloud-controller-manager",
          operation: "Update",
          time: "2021-03-16T08:06:49Z",
        },
      ],
      name: "smartbot-emqx",
      namespace: "smartbot",
      resourceVersion: "585838",
      selfLink: "/api/v1/namespaces/smartbot/services/smartbot-emqx",
      uid: "0cc414f8-a4d2-49ce-986f-3e6f7b96ce3e",
    },
    spec: {
      clusterIP: "10.245.141.106",
      externalTrafficPolicy: "Cluster",
      ports: [
        {
          name: "mqtt",
          nodePort: 30092,
          port: 1883,
          protocol: "TCP",
          targetPort: "mqtt",
        },
        {
          name: "mqttssl",
          nodePort: 30959,
          port: 8883,
          protocol: "TCP",
          targetPort: "mqttssl",
        },
        {
          name: "mgmt",
          nodePort: 30109,
          port: 8081,
          protocol: "TCP",
          targetPort: "mgmt",
        },
        {
          name: "ws",
          nodePort: 31746,
          port: 8083,
          protocol: "TCP",
          targetPort: "ws",
        },
        {
          name: "wss",
          nodePort: 32098,
          port: 8084,
          protocol: "TCP",
          targetPort: "wss",
        },
        {
          name: "dashboard",
          nodePort: 30344,
          port: 18083,
          protocol: "TCP",
          targetPort: "dashboard",
        },
      ],
      selector: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/name": "emqx",
      },
      sessionAffinity: "None",
      type: "LoadBalancer",
    },
    status: {
      loadBalancer: {
        ingress: [],
      },
    },
  }

  expect(hasExternalAddress(loadBalancer)).toBeFalsy()
})

test("load balancer is ready", () => {
  const loadBalancer = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "kubernetes.digitalocean.com/load-balancer-id": "68504feb-3a4a-4ba7-a6d9-8e3812120f9a",
        "meta.helm.sh/release-name": "smartbot",
        "meta.helm.sh/release-namespace": "smartbot",
        "project.werf.io/env": "",
        "project.werf.io/name": "smartbot",
        "werf.io/version": "v1.2.9+fix9",
      },
      creationTimestamp: "2021-03-16T08:04:20Z",
      finalizers: ["service.kubernetes.io/load-balancer-cleanup"],
      labels: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/managed-by": "Helm",
        "app.kubernetes.io/name": "emqx",
        "helm.sh/chart": "emqx-4.2.8",
      },
      managedFields: [
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                ".": {},
                "f:meta.helm.sh/release-name": {},
                "f:meta.helm.sh/release-namespace": {},
                "f:project.werf.io/env": {},
                "f:project.werf.io/name": {},
                "f:werf.io/version": {},
              },
              "f:labels": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/managed-by": {},
                "f:app.kubernetes.io/name": {},
                "f:helm.sh/chart": {},
              },
            },
            "f:spec": {
              "f:externalTrafficPolicy": {},
              "f:ports": {
                ".": {},
                'k:{"port":18083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":1883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8081,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8084,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
              },
              "f:selector": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/name": {},
              },
              "f:sessionAffinity": {},
              "f:type": {},
            },
          },
          manager: "Go-http-client",
          operation: "Update",
          time: "2021-03-16T08:04:20Z",
        },
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                "f:kubernetes.digitalocean.com/load-balancer-id": {},
              },
              "f:finalizers": {
                ".": {},
                'v:"service.kubernetes.io/load-balancer-cleanup"': {},
              },
            },
            "f:status": {
              "f:loadBalancer": {
                "f:ingress": {},
              },
            },
          },
          manager: "digitalocean-cloud-controller-manager",
          operation: "Update",
          time: "2021-03-16T08:06:49Z",
        },
      ],
      name: "smartbot-emqx",
      namespace: "smartbot",
      resourceVersion: "585838",
      selfLink: "/api/v1/namespaces/smartbot/services/smartbot-emqx",
      uid: "0cc414f8-a4d2-49ce-986f-3e6f7b96ce3e",
    },
    spec: {
      clusterIP: "10.245.141.106",
      externalTrafficPolicy: "Cluster",
      ports: [
        {
          name: "mqtt",
          nodePort: 30092,
          port: 1883,
          protocol: "TCP",
          targetPort: "mqtt",
        },
        {
          name: "mqttssl",
          nodePort: 30959,
          port: 8883,
          protocol: "TCP",
          targetPort: "mqttssl",
        },
        {
          name: "mgmt",
          nodePort: 30109,
          port: 8081,
          protocol: "TCP",
          targetPort: "mgmt",
        },
        {
          name: "ws",
          nodePort: 31746,
          port: 8083,
          protocol: "TCP",
          targetPort: "ws",
        },
        {
          name: "wss",
          nodePort: 32098,
          port: 8084,
          protocol: "TCP",
          targetPort: "wss",
        },
        {
          name: "dashboard",
          nodePort: 30344,
          port: 18083,
          protocol: "TCP",
          targetPort: "dashboard",
        },
      ],
      selector: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/name": "emqx",
      },
      sessionAffinity: "None",
      type: "LoadBalancer",
    },
    status: {
      loadBalancer: {
        ingress: [
          {
            ip: "157.230.78.23",
          },
        ],
      },
    },
  }

  expect(hasExternalAddress(loadBalancer)).toBeTruthy()
})

test("create comment", () => {
  const loadBalancer = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "kubernetes.digitalocean.com/load-balancer-id": "68504feb-3a4a-4ba7-a6d9-8e3812120f9a",
        "meta.helm.sh/release-name": "smartbot",
        "meta.helm.sh/release-namespace": "smartbot",
        "project.werf.io/env": "",
        "project.werf.io/name": "smartbot",
        "werf.io/version": "v1.2.9+fix9",
      },
      creationTimestamp: "2021-03-16T08:04:20Z",
      finalizers: ["service.kubernetes.io/load-balancer-cleanup"],
      labels: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/managed-by": "Helm",
        "app.kubernetes.io/name": "emqx",
        "helm.sh/chart": "emqx-4.2.8",
      },
      managedFields: [
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                ".": {},
                "f:meta.helm.sh/release-name": {},
                "f:meta.helm.sh/release-namespace": {},
                "f:project.werf.io/env": {},
                "f:project.werf.io/name": {},
                "f:werf.io/version": {},
              },
              "f:labels": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/managed-by": {},
                "f:app.kubernetes.io/name": {},
                "f:helm.sh/chart": {},
              },
            },
            "f:spec": {
              "f:externalTrafficPolicy": {},
              "f:ports": {
                ".": {},
                'k:{"port":18083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":1883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8081,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8083,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8084,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
                'k:{"port":8883,"protocol":"TCP"}': {
                  ".": {},
                  "f:name": {},
                  "f:port": {},
                  "f:protocol": {},
                  "f:targetPort": {},
                },
              },
              "f:selector": {
                ".": {},
                "f:app.kubernetes.io/instance": {},
                "f:app.kubernetes.io/name": {},
              },
              "f:sessionAffinity": {},
              "f:type": {},
            },
          },
          manager: "Go-http-client",
          operation: "Update",
          time: "2021-03-16T08:04:20Z",
        },
        {
          apiVersion: "v1",
          fieldsType: "FieldsV1",
          fieldsV1: {
            "f:metadata": {
              "f:annotations": {
                "f:kubernetes.digitalocean.com/load-balancer-id": {},
              },
              "f:finalizers": {
                ".": {},
                'v:"service.kubernetes.io/load-balancer-cleanup"': {},
              },
            },
            "f:status": {
              "f:loadBalancer": {
                "f:ingress": {},
              },
            },
          },
          manager: "digitalocean-cloud-controller-manager",
          operation: "Update",
          time: "2021-03-16T08:06:49Z",
        },
      ],
      name: "smartbot-emqx",
      namespace: "smartbot",
      resourceVersion: "585838",
      selfLink: "/api/v1/namespaces/smartbot/services/smartbot-emqx",
      uid: "0cc414f8-a4d2-49ce-986f-3e6f7b96ce3e",
    },
    spec: {
      clusterIP: "10.245.141.106",
      externalTrafficPolicy: "Cluster",
      ports: [
        {
          name: "mqtt",
          nodePort: 30092,
          port: 1883,
          protocol: "TCP",
          targetPort: "mqtt",
        },
        {
          name: "mqttssl",
          nodePort: 30959,
          port: 8883,
          protocol: "TCP",
          targetPort: "mqttssl",
        },
        {
          name: "mgmt",
          nodePort: 30109,
          port: 8081,
          protocol: "TCP",
          targetPort: "mgmt",
        },
        {
          name: "ws",
          nodePort: 31746,
          port: 8083,
          protocol: "TCP",
          targetPort: "ws",
        },
        {
          name: "wss",
          nodePort: 32098,
          port: 8084,
          protocol: "TCP",
          targetPort: "wss",
        },
        {
          name: "dashboard",
          nodePort: 30344,
          port: 18083,
          protocol: "TCP",
          targetPort: "dashboard",
        },
      ],
      selector: {
        "app.kubernetes.io/instance": "smartbot",
        "app.kubernetes.io/name": "emqx",
      },
      sessionAffinity: "None",
      type: "LoadBalancer",
    },
    status: {
      loadBalancer: {
        ingress: [
          {
            ip: "157.230.78.23",
          },
        ],
      },
    },
  }

  expect(createComment(loadBalancer)).toEqual("smartbot-emqx is now available at 157.230.78.23. :sunglasses:")
})
