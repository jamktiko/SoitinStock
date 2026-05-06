## CloudFormation Template Guide

In order to set up our environment, the templates should be run in CloudFormation in the following order (required by interdependencies):

1. roles.yaml ----------- no dependencies
2. network.yaml --------- no dependencies
3. rdsdatabase.yaml ----- depends on network yaml for private subnets
4. cognito.yaml --------- depends
5. beanstalk.yaml ------- depends on roles, rds environment variables
6. s3cloudfront2.yaml --- depends on beanstalk

FIX THIS!!

Template naming convention: SoitinStock-ServiceName

---

### About

_Roles_

- The roles template assures that beanstalk and EC2 have the appropriate roles for provisioning and communicating.

_Cognito_

- The Cognito template provisions all required resources for Cognito setup, including the User Pool, Client, and Domain.
- Notable settings here include the CallbackURL and LogoutURL, which define routing. In addition to these, the authMiddleware.ts within /backend/src/middleware defines important functionality, in addition to code within frontend and backend files for token exchange.
- Once Cognito is fully configured, you may create users in the Cognito management console to test and use your login feature.

_Network_

- The Network template provisions the RDS-required database subnet group including two "private" subnets.
- It additionally defines Elastic Beanstalk security groups enabling SSH access into the EC2 instance and therefore RDS for development purposes.

_RDS and MySQL Database_

- The RDS template defines the environment variables required for RDS, which Elastic Beanstalk imports for backend setup.
- The template also creates the project database.
- Please be sure to choose the two private subnets provisioned in the earlier Network template.
- Currently, the private subnets are only private based on access rules, but in a production networking environment, would be set up with a custom routing table.
- The application backend is integrated with RDS, and all updates are automatically available in the cloud. However, SSH access can be achieved through the EC2 instance into RDS for development purposes. This will require appropriate pem keys.

_Beanstalk_

- The beanstalk template will set up Elastic Beanstalk which provisions one EC2 instance.
- This template also includes environment variables for RDS and Cognito.
- When setting up, make sure to choose the default VPC and subnet.
- Once this has been provisioned, you may add your backend code zip file with the Upload and Deploy button.
- Due to development and budget constraints, an Application Load Balancer and fully private subnets have not been integrated. Production level networking was not in the scope of this educational project.

_S3 and CloudFront_

- The s3 and cloudfront template creates a private S3 bucket, and a CloudFront distribution in front of it.
- The cloudfront distribution we launch includes the required behaviour /api/ in order to connect to the front and backend properly. The viewer protocol is HTTP and HTTPS. This combination of settings avoids browser conflicts concerning http/https communication.
- Cloudfront will need to be relaunched if the EC2 environment is re-initialized, as CloudFront does not automatically update backend addresses. In our templates, the backend address has been hardcoded to avoid problems.
- The Cloudfront template also includes important caching settings allowing authorization headers to reach the backend, for Cognito integration.
- Once this has launched, you can upload your frontend code into the bucket.
- The frontend code (index.html in development, /dist in production) must have fetch('/api/test') or similar to work.
- The backend code (minimum server.js, package.json, package-lock.json) must have the environment port set up, as well as an app.get('/api/test'...). The combination ensures correct communication between frontend and backend.
- The website may be viewed through the CloudFront distribution domain name link.
