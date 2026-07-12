const verifyGoogleAccessToken = async (accessToken) => {
    const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Invalid Google Access Token");
    }

    const payload = await response.json();

    return {
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        emailVerified: payload.email_verified,
    };
};

module.exports = {
    verifyGoogleAccessToken,
};