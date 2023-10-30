import {buildAIPrompt} from "@/server/utils/prompt";
import {extractMenu, extractShoppingList, formatMenuSpecs} from "@/server/utils/format";
import {getOpenAICompletion} from "@/server/connectors/openai";

export default defineEventHandler(async event => {
    const menuSpecs = await readBody(event)
    const prompt = buildAIPrompt(menuSpecs)
    const menuContent = await getOpenAICompletion(prompt)
    const menu = extractMenu(menuContent)
    const shoppingList = extractShoppingList(menuContent)
    console.log("menu", menuContent)
    return {
        menu: menu,
        specs: menuSpecs,
        description: formatMenuSpecs(menuSpecs),
        shoppingList: shoppingList
    }
})

