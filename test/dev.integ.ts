import * as aws_apigatewayv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { App, aws_ec2, aws_ecs, aws_servicediscovery, CfnOutput, Duration, Stack } from 'aws-cdk-lib';
import { EcsServiceDiscoveryIntegration } from '../src';
import { SingleContainerService } from '../src/SingleContainerService';

const app = new App();
const stack = new Stack(app, 'integ-apigatewayv2-ecs');

const vpc = new aws_ec2.Vpc(stack, 'Vpc', {
  subnetConfiguration: [
    {
      name: 'public',
      subnetType: aws_ec2.SubnetType.PUBLIC,
      cidrMask: 21,
    },
  ],
});

const cluster = new aws_ecs.Cluster(stack, 'Cluster', {
  vpc,
  defaultCloudMapNamespace: {
    name: 'dev2.local',
  },
});

const nginx = new SingleContainerService(stack, 'Nginx', {
  cluster,
  image: aws_ecs.ContainerImage.fromRegistry('nginx'),
  assignPublicIp: true,
  portMappings: [
    { containerPort: 80 },
  ],
  cloudMapOptions: {
    name: 'nginx',
    dnsRecordType: aws_servicediscovery.DnsRecordType.SRV,
    dnsTtl: Duration.seconds(0),
  },
});

const name = new SingleContainerService(stack, 'Name', {
  cluster,
  image: aws_ecs.ContainerImage.fromRegistry('nathanpeck/name'),
  assignPublicIp: true,
  portMappings: [
    { containerPort: 3000 },
  ],
  cloudMapOptions: {
    name: 'name2',
    dnsRecordType: aws_servicediscovery.DnsRecordType.SRV,
    dnsTtl: Duration.seconds(0),
  },
});

const greeting = new SingleContainerService(stack, 'Greeting', {
  cluster,
  image: aws_ecs.ContainerImage.fromRegistry('nathanpeck/greeting'),
  assignPublicIp: true,
  portMappings: [
    { containerPort: 3000 },
  ],
  cloudMapOptions: {
    name: 'greeting',
    dnsRecordType: aws_servicediscovery.DnsRecordType.SRV,
    dnsTtl: Duration.seconds(0),
  },
});

const httpApi = new aws_apigatewayv2.HttpApi(stack, 'HttpApi', {
  defaultIntegration: new EcsServiceDiscoveryIntegration('Nginx', {
    service: nginx.service,
    subnetSelection: { subnetType: aws_ec2.SubnetType.PUBLIC },
  }),
});

httpApi.addRoutes({
  path: '/name',
  integration: new EcsServiceDiscoveryIntegration('Name', {
    service: name.service,
    subnetSelection: { subnetType: aws_ec2.SubnetType.PUBLIC },
  }),
});

httpApi.addRoutes({
  path: '/greeting',
  integration: new EcsServiceDiscoveryIntegration('Greeting', {
    service: greeting.service,
    subnetSelection: { subnetType: aws_ec2.SubnetType.PUBLIC },
  }),
});

new CfnOutput(stack, 'ApiUrl', {
  value: httpApi.url!,
});

app.synth();
