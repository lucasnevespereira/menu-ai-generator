
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

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to save menu'
        });
    }
});
