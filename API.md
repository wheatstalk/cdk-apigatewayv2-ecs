# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### EcsServiceDiscoveryIntegrationOptions <a name="EcsServiceDiscoveryIntegrationOptions" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegrationOptions"></a>

#### Initializer <a name="Initializer" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegrationOptions.Initializer"></a>

```typescript
import { EcsServiceDiscoveryIntegrationOptions } from '@wheatstalk/cdk-apigatewayv2-ecs'

const ecsServiceDiscoveryIntegrationOptions: EcsServiceDiscoveryIntegrationOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegrationOptions.property.service">service</a></code> | <code>aws-cdk-lib.aws_ecs.Ec2Service \| aws-cdk-lib.aws_ecs.FargateService</code> | The ECS service to integrate with. |
| <code><a href="#@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegrationOptions.property.subnetSelection">subnetSelection</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | The subnet selection for placing the vpc link. |

---

##### `service`<sup>Required</sup> <a name="service" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegrationOptions.property.service"></a>

```typescript
public readonly service: Ec2Service | FargateService;
```

- *Type:* aws-cdk-lib.aws_ecs.Ec2Service | aws-cdk-lib.aws_ecs.FargateService

The ECS service to integrate with.

---

##### `subnetSelection`<sup>Optional</sup> <a name="subnetSelection" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegrationOptions.property.subnetSelection"></a>

```typescript
public readonly subnetSelection: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

The subnet selection for placing the vpc link.

---

## Classes <a name="Classes" id="Classes"></a>

### EcsServiceDiscoveryIntegration <a name="EcsServiceDiscoveryIntegration" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration"></a>

Integrates with an ECS service through a VPC link.

#### Initializers <a name="Initializers" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration.Initializer"></a>

```typescript
import { EcsServiceDiscoveryIntegration } from '@wheatstalk/cdk-apigatewayv2-ecs'

new EcsServiceDiscoveryIntegration(id: string, options: EcsServiceDiscoveryIntegrationOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration.Initializer.parameter.options">options</a></code> | <code><a href="#@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegrationOptions">EcsServiceDiscoveryIntegrationOptions</a></code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration.Initializer.parameter.id"></a>

- *Type:* string

---

##### `options`<sup>Required</sup> <a name="options" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration.Initializer.parameter.options"></a>

- *Type:* <a href="#@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegrationOptions">EcsServiceDiscoveryIntegrationOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration.bind">bind</a></code> | (experimental) Bind this integration to the route. |

---

##### `bind` <a name="bind" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration.bind"></a>

```typescript
public bind(options: HttpRouteIntegrationBindOptions): HttpRouteIntegrationConfig
```

(experimental) Bind this integration to the route.

###### `options`<sup>Required</sup> <a name="options" id="@wheatstalk/cdk-apigatewayv2-ecs.EcsServiceDiscoveryIntegration.bind.parameter.options"></a>

- *Type:* @aws-cdk/aws-apigatewayv2-alpha.HttpRouteIntegrationBindOptions

---





