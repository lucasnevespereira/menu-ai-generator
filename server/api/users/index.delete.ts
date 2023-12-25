export default defineEventHandler(async event => {
    try {
        const query = getQuery(event);
        const userID = query.id
        const accessToken = query.token
        const apiUrl = process.env.NUXT_KINDE_AUTH_DOMAIN;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const response = await fetch(`${apiUrl}/api/v1/user?id=${userID}`, {
            method: 'DELETE',
            headers: headers
        })
        if (response.status === 200) {
            console.log("deleting user menus...")
            //TODO: call backend to delete all menus of user
        }
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to delete user'
        });
    }
});