## AWS Architecture Documentation

The SoitinStock platform is built on a modular AWS infrastructure and follows a traditional three-tier model.

Content Delivery & Routing: A CloudFront distribution serves as the primary entry point, providing a single unified domain for both the frontend and backend. It leverages S3 for secure, private static web hosting and implements a path-based routing strategy (/api/\*) to proxy requests to the application layer. This eliminates Cross-Origin Resource Sharing (CORS) complexities and ensures encrypted communication via HTTPS.

Application Logic: The backend is powered by AWS Elastic Beanstalk, orchestrating a Node.js environment on Amazon Linux 2023. This layer is hardened using IMDSv2 and isolated through Security Group chaining, ensuring that the application remains shielded from direct public internet exposure while maintaining a communication bridge to the database.

Data & Identity: Persistance is managed by a private RDS MySQL instance, deployed in a required multi-AZ subnet group. User authentication and authorization are handled by Amazon Cognito, which is integrated into the backend via a secure JWT-based middleware, providing a secure identity provider (IdP) for the platform.

This "Infrastructure-as-Code" (IaC) approach ensures that the environment is reproducible with appropriate modification, version-controlled, and ready for future transitions into production projects.

<p align="center">
  <img src="https://github.com/jamktiko/SoitinStock/blob/main/CF-templates/Arch-Diagram.drawio.png?raw=true\testing\Arch-Diagram.drawio.png" alt="AWS Serverless Architecture Diagram" width="600">
</p>

---

### About CloudFormation Templates

_Roles_

- The roles template assures that beanstalk has the appropriate roles for provisioning infrastructure and allowing communication between the application and services.

_Network_

- The Network template provisions the RDS-required database subnet group including two "private" subnets. Due to usage of the default VPC, these subnets are still connected to the routing table that leads to an IGW. However, the subnets do not allow public access.
- It additionally defines Elastic Beanstalk security groups enabling SSH access into the EC2 instance and therefore further into RDS for development purposes.
- For production purposes, a new custom VPC network should be defined, containing the required private subnets for moving EC2 instance(s) behind an ALB, additional configurations for RDS subnets, relevant routing tables, and a NAT gateway.

_RDS and MySQL Database_

- The RDS template defines the environment variables required for RDS, which Elastic Beanstalk imports for backend setup.
- The template also creates the project database.
- Please be sure to choose the two private subnets provisioned in the earlier Network template.
- Currently, the private subnets are only private based on access rules, but in a production networking environment, would be set up with a custom routing table.
- The application backend is integrated with RDS, and has been coded to deploy updates automatically. SSH access can be achieved through the EC2 instance into RDS for development purposes. This will require appropriate key.pem and IP configuration.
- Secret management (database password) is currently handled directly with `NoEcho: true` but should be migrated to AWS Secrets Manager in production.

_Beanstalk_

- The beanstalk template will set up Elastic Beanstalk which provisions one EC2 instance.
- This stack centralizes dependencies from the IAM, Network, and Database stacks. It injects RDS credentials and Cognito IDs directly into the Node.js process.env
- To maintain compatibility with the existing VPC structure and project timeline, the environment uses a simplified networking model where instances reside in the public tier.
- An Application Load Balancer and fully private subnets have not been fully integrated. Production level networking was not in the scope of this educational project, and could not be implemented at later stages due to infrastructural drift and bidirectional interdependencies between stacks.
- Current security measures are as follows: IMDSv2 for enhanced instance metadata security. Restricted EC2 traffic via Security Group rules.

_S3 and CloudFront_

- The s3 and cloudfront template creates a private S3 bucket, and a CloudFront distribution in front of it.
- The cloudfront distribution we launch includes the required behaviour /api/ in order to connect to the front and backend properly. The viewer protocol is HTTP and HTTPS. This combination of settings avoids browser conflicts concerning http/https communication.
- Cloudfront will need to be relaunched if the EC2 environment is re-initialized, as CloudFront does not automatically update backend addresses. In our templates, the backend address has been hardcoded to avoid the aforementioned problems.
- The Cloudfront template also includes important caching settings allowing authorization headers to reach the backend, for Cognito integration.
- Once this has launched, you can upload your frontend code into the bucket.
- The frontend code (index.html in development, /dist in production) must have `fetch('/api/test')` or similar to work. In this configuration, web files must be in the root of the s3 bucket to function properly.
- The backend code must have the environment port set up, as well as an `app.get('/api/test'...)`. This combination ensures correct communication between frontend and backend, api's and routing can be further developed as needed.
- The website may be viewed through the CloudFront distribution domain name link.

_Cognito_

- The Cognito template provisions all required resources for Cognito setup, including the User Pool, Client, and Domain.
- Notable settings here include the CallbackURL and LogoutURL, which define routing. In addition to these, the authMiddleware.ts within /backend/src/middleware defines important functionality for token exchange and so on.
- The relevant frontend configurations can be found in auth.services, auth.guard and the loginform component.
- The relevant backend configurations can be found in authMiddleware.ts and server.ts. The jsonwebtoken jwks-rsa is a dependency needed for functionality.
- Once Cognito is fully configured, you may create users in the Cognito management console to test and use your login feature on the launched application.

---

### Setting up the environment

The AWS environment can be set up differently depending on usage.
The provided templates in this project can be used as learning material. Due to the interdependencies built in development, this infrastructure cannot be implemented as is.

Template naming convention during development: SoitinStock-ServiceName
