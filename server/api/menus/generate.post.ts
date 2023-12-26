import { buildAIPrompt } from "@/server/utils/prompt";
import { extractMenu, extractShoppingList, formatMenuSpecs } from "@/server/utils/format";

export default defineEventHandler(async event => {
    try {
        const menuSpecs = await readBody(event)
        const prompt = buildAIPrompt(menuSpecs)
        const menuContent = await getOpenAIResponse(prompt)
        const menu = extractMenu(menuContent)
        const shoppingList = extractShoppingList(menuContent)
        return {
            menu: menu,
            specs: menuSpecs,
            description: formatMenuSpecs(menuSpecs),
            shoppingList: shoppingList
        }
    } catch (e) {
        console.error(e)
        throw createError({
            statusCode: 500,
            message: 'Failed to generate menu'
        });
    }
})

const getOpenAIResponse = async (prompt: string) => {
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
    };
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NITRO_OPENAI_API_KEY}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const chatCompletion = await response.json();

        if (chatCompletion.choices && chatCompletion.choices.length > 0) {
            return chatCompletion.choices[0].message.content;
        }
        throw new Error('No content in choices');
    } catch (error) {
        if (error) {
            throw new Error(`GetCompletion calling endpoint: ${error}`);
        }
    }
}

