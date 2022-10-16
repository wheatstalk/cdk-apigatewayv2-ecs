import { aws_ecs } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface SingleContainerServiceProps extends aws_ecs.ContainerDefinitionOptions {
  readonly cluster: aws_ecs.ICluster;
  readonly assignPublicIp?: boolean;
  readonly cloudMapOptions?: aws_ecs.CloudMapOptions;
}

export class SingleContainerService extends Construct {
  readonly service: aws_ecs.FargateService;

  constructor(scope: Construct, id: string, props: SingleContainerServiceProps) {
    super(scope, id);

    const taskDefinition = new aws_ecs.FargateTaskDefinition(this, 'TaskDefinition');
    taskDefinition.addContainer('main', props);

    this.service = new aws_ecs.FargateService(this, 'Service', {
      cluster: props.cluster,
      taskDefinition,
      assignPublicIp: props.assignPublicIp,
      cloudMapOptions: props.cloudMapOptions,
    });
  }
}