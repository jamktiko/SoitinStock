## CloudFormation Template Guide

In order to set up our environment, the templates should be run in CloudFormation in the following order:
Template naming convention: SoitinStock-ServiceName
Order these!

- roles.yaml -------- (always running, dependencies!!)
- cognito.yaml ------ (always running, dependencies!!)
- network.yaml
- s3cloudfront2.yaml - (always running, cheap, contains files)
- rdsdatabase.yaml --- (must be run before compute, dependencies)
- beanstalk.yaml

---

### About

Roles

- The roles template assures that beanstalk and EC2 have the appropriate roles for provisioning and communicating.

Beanstalk

- The beanstalk template will set up Elastic Beanstalk which provisions one EC2 instance.
- When setting up, make sure to choose the default VPC and subnet.
- Further in development, the beanstalk yaml will also use an Application Load Balancer, and will be properly placed into a private subnet.
- Once this has been provisioned, you may add your backend code with the Upload and Deploy button.

S3 and CloudFront

- The s3 and cloudfront template creates a private S3 bucket, and a CloudFront distribution in front of it.
- The cloudfront distribution we launch includes the required behaviour /api/\* in order to connect to the front and backend properly. The viewer protocol is HTTP and HTTPS. This combination of settings avoids browser conflicts concerning http/https communication.
- Once this has launched, you can upload your frontend code into the bucket.
- The frontend code (index.html in development, /dist in production) must have fetch('/api/test') or similar to work.
- The backend code (minimum server.js, package.json, package-lock.json) must have the environment port set up, as well as an app.get('/api/test'...). The combination ensures correct communication between frontend and backend.
- The website may be viewed through the CloudFront distribution domain name link. Remember to add /api to the link to see the frontend, and /api/test to see the backend.

RDS and MySQL Database

- add info here

---

### Cognito Installation Steps:

1. Create test user in cognito
2. FRONTEND : Add Amplify to Angular with: `npm install aws-amplify`

    Create a file like:  
     // src/aws-config.ts

    ```
    export const awsConfig = {
    Auth: {
    region: 'eu-north-1', // IMPORTANT: your region
    userPoolId: 'YOUR_USER_POOL_ID',
    userPoolWebClientId: 'YOUR_CLIENT_ID',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
    };
    ```

3. Then in main.ts or app.module.ts:
    ```
    import { Amplify } from 'aws-amplify';
    import { awsConfig } from './aws-config';
    Amplify.configure(awsConfig);
    ```

Login example:

```
import { signIn } from 'aws-amplify/auth';

async function login(email: string, password: string) {
try {
const user = await signIn({ username: email, password });
console.log('Logged in:', user);
} catch (err) {
console.error(err);
}
}
```

Get JWT token:

```
import { fetchAuthSession } from 'aws-amplify/auth';

async function getToken() {
const session = await fetchAuthSession();
return session.tokens?.idToken?.toString();
}
```

Attach token to API calls

```
const token = await getToken();

fetch('https://your-api-url', {
headers: {
Authorization: `Bearer ${token}`
}
});
```

4. BACKEND install dependencies with
   `npm install jsonwebtoken jwks-rsa`

    Cognito JWT verification setup

    ```
    const jwt = require('jsonwebtoken');
    const jwksClient = require('jwks-rsa');


    const client = jwksClient({
    jwksUri: `https://cognito-idp.eu-north-1.amazonaws.com/YOUR_USER_POOL_ID/.well-known/jwks.json`
    });
    ```

5. Helper to get signing key

```
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}
```

Middleware to protect routes

```
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, getKey, {
    audience: 'YOUR_CLIENT_ID',
    issuer: `https://cognito-idp.eu-north-1.amazonaws.com/YOUR_USER_POOL_ID`
  }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}
```

Use it in routes

```
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'Secure data', user: req.user });
});
```

## Others:

Network

- security groups and subnet group (with two private subnets as required for RDS to run properly)

### Termination Overnight

When terminating stacks, remember to terminate additional awseb stack which is automatically generated on Elastic Beanstalk stack creation.
Terminate following stacks to save costs:

- SoitinStock-BeanstalkEnv
- SoitinStock-RDS
