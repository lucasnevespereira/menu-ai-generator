import {buildAIPrompt} from "@/server/utils/prompt";
import {extractAndFormatMenuContent} from "@/server/utils/format";
import {getOpenAICompletion} from "@/server/connectors/openai";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const prompt = buildAIPrompt(body)
    const menuContent = await getOpenAICompletion(prompt)
    return {
        menu: extractAndFormatMenuContent(menuContent),
        specs: body
    }
})

