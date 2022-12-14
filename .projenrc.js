const { awscdk } = require('projen');
const { NpmAccess, UpgradeDependenciesSchedule } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Josh Kellendonk',
  authorAddress: 'joshkellendonk@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: '@wheatstalk/cdk-apigatewayv2-ecs',
  repositoryUrl: 'https://github.com/wheatstalk/cdk-apigatewayv2-ecs.git',
  description: 'Integrates HTTP API Gateway to ECS by VPC Link',

  npmAccess: NpmAccess.PUBLIC,
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.MONTHLY,
    },
  },

  gitpod: true,

  peerDeps: [
    '@aws-cdk/aws-apigatewayv2-alpha@^2.1.0-alpha.0',
    '@aws-cdk/aws-apigatewayv2-integrations-alpha@^2.1.0-alpha.0',
  ],
});

const cdkConfig = new awscdk.CdkConfig(project, {
  app: '', // Required for types.
  watchIncludes: [
    `${project.srcdir}/**/*.ts`,
    `${project.testdir}/**/*.integ.ts`,
  ],
});
cdkConfig.json.addDeletionOverride('app');
cdkConfig.json.addDeletionOverride('context');
cdkConfig.json.addDeletionOverride('output');

project.synth();