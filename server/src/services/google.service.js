const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (idToken) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        emailVerified: payload.email_verified,
    };
};

module.exports = {
    verifyGoogleToken,
};