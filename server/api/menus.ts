
export default defineEventHandler(async event => {
    try {
        const query = getQuery(event);
        const userID = query.userID
        
        const apiUrl = process.env.NITRO_MENU_AI_SERVICE_URL;
        const response = await fetch(`${apiUrl}/menus/${userID}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch menus'
        });
    }
});
