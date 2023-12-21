import {buildAIPrompt} from "@/server/utils/prompt";
import {extractMenu, extractShoppingList, formatMenuSpecs} from "@/server/utils/format";
import {getOpenAICompletion} from "@/server/connectors/openai";

export default defineEventHandler(async event => {
    try {
        const menuSpecs = await readBody(event)
        const prompt = buildAIPrompt(menuSpecs)
        const menuContent = await getOpenAICompletion(prompt)
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

