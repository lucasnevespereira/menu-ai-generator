export default defineEventHandler(async event => {
    try {
        const query = getQuery(event);
        const menuID = query.id

        const apiUrl = process.env.NITRO_MENU_AI_SERVICE_URL;
        const response = await fetch(`${apiUrl}/menus/${menuID}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to delete menu'
        });
    }
});