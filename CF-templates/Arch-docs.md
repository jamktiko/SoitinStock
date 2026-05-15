## AWS Architecture Documentation

The SoitinStock platform is built on a modular AWS infrastructure and follows a traditional three-tier model.

Content Delivery & Routing: A CloudFront distribution serves as the primary entry point, providing a single unified domain for both the frontend and backend. It leverages S3 for secure, private static web hosting and implements a path-based routing strategy (/api/\*) to proxy requests to the application layer. This eliminates Cross-Origin Resource Sharing (CORS) complexities and ensures encrypted communication via HTTPS.

Application Logic: The backend is powered by AWS Elastic Beanstalk, orchestrating a Node.js environment on Amazon Linux 2023. This layer is hardened using IMDSv2 and isolated through Security Group chaining, ensuring that the application remains shielded from direct public internet exposure while maintaining a communication bridge to the database.

Data & Identity: Persistance is managed by a private RDS MySQL instance, deployed in a required multi-AZ subnet group. User authentication and authorization are handled by Amazon Cognito, which is integrated into the backend via a secure JWT-based middleware, providing an identity provider (IdP) for the platform.

This "Infrastructure-as-Code" (IaC) approach ensures that the environment is reproducible with appropriate modification, version-controlled, and ready for future transitions into production projects.

<p align="center">
  <img src="https://raw.githubusercontent.com/jamktiko/SoitinStock/main/CF-templates/related/Arch-Diagram.drawio.png" alt="SoitinStock AWS Architecture Diagram" width="700">
</p>

---

### About CloudFormation Templates

_Roles_

- The roles template assures that beanstalk has the appropriate roles for provisioning infrastructure and allowing communication between the application and services.

_Network_

- The Network template provisions the RDS-required database subnet group including two "private" subnets. These subnets do not allow public access.
- It additionally defines Elastic Beanstalk security groups enabling SSH access into the EC2 instance and therefore further into RDS for development purposes.
- For production purposes, a new custom VPC network should be defined, containing the required private subnets for moving EC2 instance(s) behind an ALB, additional configurations for RDS subnets, relevant routing tables, and a NAT gateway.

_RDS and MySQL Database_

- The RDS template defines the environment variables required for RDS, which Elastic Beanstalk imports for backend setup.
- The template also creates the project database.
- The application backend is integrated with RDS, and has been coded to deploy updates automatically. Within the backend application /backend/src/model/setup.ts runs the schema.sql and seed.sql into the database, and further updates concerning customer rentals are added with a POST endpoint createRental function within /backend/src/controllers/rentalController.ts.
- SSH access can be achieved through the EC2 instance into RDS for development purposes. This will require appropriate key.pem and IP configuration.
- Secret management (database password) is currently handled directly with `NoEcho: true` but should be migrated to AWS Secrets Manager in production.
- Please be sure to choose the two private subnets provisioned in the earlier Network template when launching this stack.

_Beanstalk_

- The beanstalk template will set up Elastic Beanstalk which provisions one EC2 instance.
- This stack centralizes dependencies from the IAM, Network, and Database stacks. It injects RDS credentials and Cognito IDs directly into the Node.js process.env
- To maintain compatibility with the existing VPC structure and project timeline, the environment uses a simplified networking model where one instance resides in the public tier.
- An Application Load Balancer and fully private subnets have not been fully integrated. Production level networking was not in the scope of this educational project, and could not be implemented at later stages due to infrastructural drift and bidirectional interdependencies between stacks.
- Current security measures are as follows: IMDSv2 for enhanced instance metadata security. Restricted EC2 traffic via Security Group rules.

_S3 and CloudFront_

- The s3 and cloudfront template creates a private S3 bucket, and a CloudFront distribution in front of it.
- The CloudFront distribution we launch includes the cache behaviour /api/\* in order to route requests from the frontend to the backend properly. The viewer protocol policy is allow-all, which enables both HTTP and HTTPS. This combination of settings avoids browser mixed-content and routing conflicts.
- CloudFront will need to be relaunched if the EC2 environment is re-initialized, as CloudFront does not automatically update backend addresses. In our templates, the backend address has been hardcoded to avoid the aforementioned problems.
- The CloudFront template also includes important caching settings allowing authorization headers to reach the backend, for Cognito integration.
- Once this has launched, you can upload your frontend code into the S3 bucket.
- The frontend application must send API requests using the /api/\* path format, for example `fetch('/api/test')`, so that CloudFront can route backend requests. In this configuration, web files from the built /dist directory must be placed directly in the root of the s3 bucket to function and be served properly.
- The backend application must listen on the environment-defined port and expose API routes such as `app.get('/api/test'...)`. This combination ensures correct communication between frontend and backend through the CloudFront distribution.
- The website may be viewed through the CloudFront distribution domain name link.

_Cognito_

- The Cognito template provisions all required resources for Cognito setup, including the User Pool, Client, and Domain.
- Notable settings here include the CallbackURL and LogoutURL, which define routing. In addition to these, the authMiddleware.ts within /backend/src/middleware defines important functionality for token exchange.
- The relevant frontend configurations can be found in /client/src/app/auth.service.ts, /client/src/app/auth.guard.ts and the /client/src/app/login-form component.
- The relevant backend configurations can be found in /backend/middleware/authMiddleware.ts and /backend/server.ts. The jsonwebtoken jwks-rsa is a dependency needed for functionality.
- Once Cognito is fully configured, you may create users in the Cognito management console to test and use your login feature on the launched application.

---

### Setting up the environment

The AWS environment can be set up differently depending on usage.
The provided templates in this project can be used as learning material. Due to the interdependencies built in development, this infrastructure cannot be implemented as is.

Template naming convention during development: SoitinStock-ServiceName
