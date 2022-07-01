import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class DevelopmentVpcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
	
   	let subnetConfigValues = {
   		 "IT": ec2.SubnetType.PRIVATE_ISOLATED, "DB": ec2.SubnetType.PRIVATE_ISOLATED,
   		 "APP": ec2.SubnetType.PRIVATE_ISOLATED, "WEB": ec2.SubnetType.PUBLIC};
	let cidrMask = 20;
	let newSubnetConfiguration = [];
		
	for (let i = 0; i < Object.keys(subnetConfigValues).length; i++) {
		let subnetConfigValuesNames = Object.keys(subnetConfigValues);
		let subnetConfigValuesTypes = Object.values(subnetConfigValues);
		newSubnetConfiguration.push({name: subnetConfigValuesNames[i], 
			subnetType: subnetConfigValuesTypes[i],
			cidrMask: cidrMask});
	}
	
	const vpc = new ec2.Vpc(this, "Vpc", {
		cidr: "10.16.0.0/16",
		natGateways: 0,
		subnetConfiguration: newSubnetConfiguration,
	});
  }
}
