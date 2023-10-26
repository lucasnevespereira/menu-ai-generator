import {MenuSpecsData} from "~/server/utils/types";

export function extractAndFormatMenuContent(menuContent: String) {
    const startIdx = menuContent.indexOf('START');
    const endIdx = menuContent.indexOf('END');

    if (startIdx !== -1 && endIdx !== -1) {
        const contentBetweenStartAndEnd = menuContent.slice(startIdx + 6, endIdx).trim();
        // Convert remaining single newline to HTML line break;
        return contentBetweenStartAndEnd
            .replace(/-\s+/g, '• ') // Replace bullet points
            .replace(/:\n/g, ':\n\n') // Add extra newline after colons
            .replace(/\n\n/g, '<br>') // Convert double newline to HTML line break
            .replace(/\n/g, '<br>');
    }

    return '';
}

export function formatMenuSpecs(data: MenuSpecsData) {
    return `${data.maxCalories} calories,
                            lipides ${data.maxFats}%,
                            glucides ${data.maxCarbs}%,
                            proteines ${data.maxProteins}%`
}