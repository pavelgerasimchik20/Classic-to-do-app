import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client;

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const token: string | undefined = req.headers["authorization"]?.toString()

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const ticket = await client.verifyIdToken({idToken: token});
        const payload = ticket.getPayload();

        if(!payload) {
            return res.status(400).json({ errorMessage: "Token error" });
        }

        req.body.email = payload.email;
    }
    catch(error) {
        return res.status(400).send("Invalid Token");
    }
    return next()
}


const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers["authorization"]?.toString()

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const ticket = await client.verifyIdToken({idToken: token});
        const payload = ticket.getPayload();

        if(!payload) {
            return res.status(400).json({ errorMessage: "Token error" });
        }

        return res.status(200).send({message: "Valid token"})
    }
    catch(error) {
        return res.status(400).send("Invalid Token");
    }
}

export default { verifyToken, checkToken }

