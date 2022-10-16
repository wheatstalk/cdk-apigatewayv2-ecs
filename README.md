# ECS Service Discovery Integration

This project provides an AWS HTTP API Gateway integration to your ECS service by VPC Link.

> See: [Cheap serverless containers using API Gateway][aidan]

[aidan]: https://awsteele.com/blog/2022/10/15/cheap-serverless-containers-using-api-gateway.html

## Usage

```ts
declare const cluster: aws_ecs.Cluster;
declare const taskDefinition: aws_ecs.FargateTaskDefinition;

// Create your ECS service
const service = new aws_ecs.FargateService(stack, 'Service', {
  cluster,
  taskDefinition,
  // Enable CloudMap service discovery
  cloudMapOptions: {
    name: 'some-service',
    // Ensure that you use SRV-based records
    dnsRecordType: aws_servicediscovery.DnsRecordType.SRV,
  },
})

new aws_apigatewayv2.HttpApi(stack, 'HttpApi', {
  // Connect the HTTP API to your ECS service
  defaultIntegration: new EcsServiceDiscoveryIntegration('Nginx', {
    service,
  }),
});
```