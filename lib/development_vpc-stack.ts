import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class DevelopmentVpcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

		const vpc = new ec2.Vpc(this, "Vpc", {
			cidr: "10.16.0.0/16",
			natGateways: 0,
			maxAzs: 3,
			subnetConfiguration: [
				{
					name: "IT",
					subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
				},
				{
					name: "DB",
					subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
				}, 
				{
					name: "APP",
					subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
				}, 
				{
					name: "WEB",
					subnetType: ec2.SubnetType.PUBLIC,
				}
			]
		});
  }
}
