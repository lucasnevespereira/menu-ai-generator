
export default defineEventHandler(async event => {
    try {
        const body = await readRawBody(event);
        const apiUrl = process.env.NITRO_MENU_AI_SERVICE_URL;
        const response = await fetch(`${apiUrl}/menus`, {
            method: "POST",
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    } catch (err) {
        console.error(err)
        throw createError({
            statusCode: 500,
            message: 'Failed to save menu'
        });
    }
});
