import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client;

export async function verifyCredentials(credential: string) {
    const ticket = await client.verifyIdToken({
        idToken: credential,
    });
    const payload = ticket.getPayload();
    return payload;
}

