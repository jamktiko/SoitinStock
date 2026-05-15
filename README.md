# SoitinStock

SoitinStock is a web-based inventory and rental management system designed for a musical instrument rental shop. It enables employees to track instrument availability, rent instruments to customers, and monitor inventory through a centralized interface.

## Description

SoitinStock is a cloud-based inventory and rental management system designed to support the daily operations of a musical instrument rental shop. The application provides employees with a centralized interface for managing instrument stock, tracking availability, and handling customer rentals efficiently.

The system is primarily intended for use within a physical store environment, where employees need quick and reliable access to inventory and rental information. However, for demonstration and accessibility purposes, the application is deployed online using Amazon Web Services (AWS), allowing it to be accessed through a web browser.

SoitinStock follows a modern web application architecture, with a frontend built using Angular and a backend powered by a Node.js and Express REST API. Data is stored in a relational MySQL database hosted on Amazon RDS. Authentication is handled through AWS Cognito, providing secure user access via JWT-based authentication.

The goal of the project is to deliver a simple, functional, and cost-efficient system that demonstrates practical use of cloud services, full-stack development, and infrastructure as code. The design prioritizes ease of use, maintainability, and alignment with AWS Free Tier constraints, making it suitable for both learning purposes and small-scale real-world scenarios.

---

## Getting Started

### Dependencies

Prerequisites:

- Node.js, npm, TypeScript, MySQL, Angular CLI

Frameworks:

- Angular v21.0.0: Frontend framework
- Express v5.2.1: Backend framework for RESTful API server
- Node.js: runtime environment for backend.

Libraries and Dependencies:

- Frontend: Angular Material & CDK, NgRx Signals, RxJS, (dev: Angular In-Memory Web API)
- Backend: MySQL2, JWT & JWKS-RSA, CORS
- Shared: TypeScript, Rimraf, Vitest

### Cloud services - AWS

The application is deployed and hosted using Amazon Web Services (AWS), which provides the cloud infrastructure required to run the system. The following services are used:

- _S3 (Simple Storage Service)_: Hosts the Angular frontend as a static website

- _CloudFront_: Acts as a CDN and entry point for the application

- _Elastic Beanstalk_: Deploys and manages the Node.js Express backend on an EC2 instance

- _EC2_: Underlying compute instance running the backend server

- _RDS (MySQL)_: Relational database for storing application data

- _Cognito_: Handles user authentication and authorization using JWT tokens

- _IAM_: Manages permissions and access control between AWS services

- _CloudFormation_: Defines and provisions infrastructure as code

### Installing

The program is not distributed as a downloadable package. It is accessed through a deployed web application hosted on AWS.
For development purposes, the source code can be cloned from the repository.

### Executing program

To run locally:

Please be aware that login credenials are set up to work solely through AWS Cognito. This functionality will need to be removed if not integrated into the cloud.

- clone repository with `git clone https://github.com/jamktiko/SoitinStock`
- create and configure environment variables within frontend/backend
- install dependencies `npm install` in both frontend & backend
- start backend with `npm run dev` and frontend with `ng serve`
- open locally in `http://localhost:4200`

To integrate AWS please refer to the Arch-docs documentation guide provided in the /CF-templates directory.

---

## Help

#### API requests return 404

Ensure frontend API calls use the `/api/...` path format, for example:

```javascript
fetch('/api/test');
```

#### Frontend does not load correctly

Verify that the built frontend files from /dist are uploaded to the root of the S3 bucket.

#### Backend does not start in Elastic Beanstalk

Ensure the backend application listens on the environment port:

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT);
```

Also ensure that Elastic Beanstalk is using the correct environment variables.

#### CORS or mixed-content issues

Use the CloudFront distribution URL for both frontend and backend communication instead of directly calling the Elastic Beanstalk endpoint.

---

## Authors

#### Jun Fengari, Oskari Puranen, Minttu Räisänen, Thomas Vainikainen

## Version History

- 1.0
    - Initial full-stack cloud deployment
    - Angular frontend hosted through S3 and CloudFront
    - Node.js backend deployed with Elastic Beanstalk
    - MySQL database integration with RDS
    - API routing configured through CloudFront
    - Cognito authentication integration
    - Frontend UI and responsive styling improvements

- 0.5
    - Backend API and database connectivity implemented
    - CloudFormation infrastructure templates added
    - Initial frontend product views and navigation created

- 0.1
    - Initial project setup
    - Repository structure and development environment configured

## License

This project is licensed under the CC BY-SA 4.0 License - see the LICENSE.md file for details

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png

## Acknowledgments

- AWS documentation and service guides for CloudFront, S3, Elastic Beanstalk, RDS, and Cognito configuration
- JAMK course materials and cloud computing guidance
- IAM role template structure adapted from https://github.com/jamktiko/elastic-beanstalk-node-angular-boilerplate
- Angular and Node.js official documentation
