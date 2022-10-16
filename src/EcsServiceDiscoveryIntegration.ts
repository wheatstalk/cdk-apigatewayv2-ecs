import * as aws_apigatewayv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { aws_ecs, aws_ec2, aws_servicediscovery } from 'aws-cdk-lib';
import { Construct } from 'constructs';


export interface EcsServiceDiscoveryIntegrationOptions {
  /**
   * The ECS service to integrate with.
   */
  readonly service: aws_ecs.FargateService | aws_ecs.Ec2Service;

  /**
   * The subnet selection for placing the vpc link.
   */
  readonly subnetSelection?: aws_ec2.SubnetSelection;
}

/**
 * Integrates with an ECS service through a VPC link.
 */
export class EcsServiceDiscoveryIntegration extends aws_apigatewayv2.HttpRouteIntegration {
  private readonly httpIntegrationId: string;
  private readonly service: aws_ecs.FargateService | aws_ecs.Ec2Service;
  private readonly subnetSelection: aws_ec2.SubnetSelection | undefined;

  constructor(id: string, options: EcsServiceDiscoveryIntegrationOptions) {
    super(id);

    this.httpIntegrationId = id;
    this.service = options.service;
    this.subnetSelection = options.subnetSelection;
  }

  bind(
    options: aws_apigatewayv2.HttpRouteIntegrationBindOptions,
  ): aws_apigatewayv2.HttpRouteIntegrationConfig {
    const { scope } = options;

    const cloudMapService = this.service.cloudMapService;
    if (!cloudMapService) {
      throw new Error('The provided service requires cloudmap');
    }

    if (cloudMapService.dnsRecordType !== aws_servicediscovery.DnsRecordType.SRV) {
      throw new Error('The provided service requires a SRV-based service discovery');
    }

    const resources = new IntegrationResources(
      scope,
      `${this.httpIntegrationId}Resources`,
      {
        service: this.service,
        subnetSelection: this.subnetSelection,
      },
    );

    return {
      type: aws_apigatewayv2.HttpIntegrationType.HTTP_PROXY,
      connectionId: resources.vpcLink.vpcLinkId,
      connectionType: aws_apigatewayv2.HttpConnectionType.VPC_LINK,
      method: aws_apigatewayv2.HttpMethod.ANY,
      uri: cloudMapService.serviceArn,
      payloadFormatVersion: aws_apigatewayv2.PayloadFormatVersion.VERSION_1_0,
    };
  }
}

interface IntegrationResourcesProps {
  readonly service: aws_ecs.FargateService | aws_ecs.Ec2Service;
  readonly subnetSelection?: aws_ec2.SubnetSelection;
}

class IntegrationResources extends Construct {
  public readonly vpcLink: aws_apigatewayv2.VpcLink;

  constructor(
    scope: Construct,
    id: string,
    props: IntegrationResourcesProps,
  ) {
    super(scope, id);

    const { service } = props;

    const vpc = service.cluster.vpc;

    const vpcLinkSecurityGroup = new aws_ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc: vpc,
    });

    const vpcLink = new aws_apigatewayv2.VpcLink(this, 'VpcLink', {
      vpc,
      subnets: props.subnetSelection,
      securityGroups: [vpcLinkSecurityGroup],
    });

    service.connections.allowFrom(vpcLinkSecurityGroup, aws_ec2.Port.allTraffic());

    this.vpcLink = vpcLink;
  }
}
