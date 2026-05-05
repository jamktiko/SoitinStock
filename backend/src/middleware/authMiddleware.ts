import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';

// Cognito config
const region = 'eu-north-1';
const userPoolId = 'eu-north-1_LTfsGw15m';
const clientId = '1b08n5k49r4pnqegckcoodloje';

const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

const client = jwksClient({
    jwksUri: `${issuer}/.well-known/jwks.json`,
});

// Get signing key from Cognito
function getKey(header: any, callback: any) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) return callback(err);
        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
    });
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: 'Missing Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Malformed Authorization header' });
    }

    jwt.verify(
        token,
        getKey,
        {
            issuer,
        },
        (err, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token',
                    error: err.message,
                });
            }

            // Optional but important: validate Cognito token usage
            if (decoded.token_use !== 'access') {
                return res.status(401).json({
                    message: 'Invalid token type (expected access token)',
                });
            }

            if (decoded.client_id !== clientId) {
                return res.status(401).json({
                    message: 'Invalid audience (client_id mismatch)',
                });
            }

            (req as any).user = decoded;
            next();
        },
    );
}
