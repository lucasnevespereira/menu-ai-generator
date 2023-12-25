export default defineEventHandler(async event => {
    const domainUrl = process.env.NUXT_KINDE_AUTH_DOMAIN;
    const clientID = process.env.NITRO_KINDE_M2M_CLIENT_ID
    const clientSecret = process.env.NITRO_KINDE_M2M_CLIENT_SECRET
    try {
        const base64Credentials = Buffer.from(
            `${clientID}:${clientSecret}`
        ).toString("base64");
        const authorizationHeader = `Basic ${base64Credentials}`;
        const response = await fetch(`${domainUrl}/oauth2/token`, {
            method: "POST",
            headers: {
                Authorization: authorizationHeader,
                "content-type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                audience: `${domainUrl}/api`
            }),
        });
        return await response.json();
    } catch (e) {
        console.error(e);
        throw createError({
            status: 401,
            message: "failed to fetch auth token"
        })
    }
})