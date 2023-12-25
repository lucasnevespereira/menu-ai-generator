export default defineEventHandler(async event => {
    try {
        const query = getQuery(event);
        const userID = query.id
        const accessToken = query.token
        const authApiUrl = process.env.NUXT_KINDE_AUTH_DOMAIN;
        const apiUrl = process.env.NITRO_MENU_AI_SERVICE_URL
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const response = await fetch(`${authApiUrl}/api/v1/user?id=${userID}`, {
            method: 'DELETE',
            headers: headers
        })
        if (response.status === 200) {
            const deleteUserMenusResponse = await fetch(`${apiUrl}/menus/user/${userID}`, {
                method: 'DELETE',
            })
            if (!deleteUserMenusResponse.ok) {
                console.error('could not delete menus for user with id', userID)
            }
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