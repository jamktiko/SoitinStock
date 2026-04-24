## CloudFormation Template Guide

In order to set up our environment, the templates should be run in CloudFormation in the following order:

- roles.yaml -------- (always running, dependencies!!)
- cognito.yaml ------ (always running, dependencies!!)
- beanstalk.yaml
- s3cloudfront.yaml - (always running, cheap(?), contains files)
- placeholder
- placeholder

(missing RDS, other?)

### Steps

Template naming convention: SoitinStock-ServiceName

1. The roles template assures that beanstalk and EC2 have the appropriate roles for provisioning and communicating.
2. The beanstalk template will set up Elastic Beanstalk which provisions one EC2 instance. When setting up, make sure to choose the default VPC and subnet.
3. Once this has been provisioned, you may add your backend code with the Upload and Deploy button.
4. The s3 and cloudfront template creates a private S3 bucket, and CloudFront in front of it.
5. Once this has launched, you can upload your frontend code into the bucket. This code can be standalone for testing, or connected by APIs to your backend.
6. The website may be viewed through the CloudFront distribution domain name link.

### Termination Overnight

When terminating stacks, remember to terminate additional awseb stack which is automatically generated on Elastic Beanstalk stack creation.
Terminate following stacks:
