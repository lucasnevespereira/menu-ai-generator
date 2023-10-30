import {MenuSpecsData} from "~/server/utils/types";

// export function extractMenu(menuContent: String) {
//     const startIdx = menuContent.indexOf('MENUSTART');
//     const endIdx = menuContent.indexOf('MENUEND');
//
//     if (startIdx !== -1 && endIdx !== -1) {
//         const contentBetweenStartAndEnd = menuContent.slice(startIdx + 6, endIdx).trim();
//         // Convert remaining single newline to HTML line break;
//         return contentBetweenStartAndEnd
//             .replace(/-\s+/g, '• ') // Replace bullet points
//             .replace(/:\n/g, ':\n\n') // Add extra newline after colons
//             .replace(/\n\n/g, '<br>') // Convert double newline to HTML line break
//             .replace(/\n/g, '<br>');
//     }
//
//     return '';
// }

export function extractMenu(menuContent: string) {
    const startIdx = menuContent.indexOf('MENUSTART');
    const endIdx = menuContent.indexOf('MENUEND');

    if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
        const contentBetweenStartAndEnd = menuContent.slice(startIdx + 9, endIdx).trim();
        // Convert remaining single newline to HTML line break;
        return contentBetweenStartAndEnd
            .replace(/-\s+/g, '• ') // Replace bullet points
            .replace(/:\n/g, ':\n\n') // Add an extra newline after colons
            .replace(/\n\n/g, '<br>') // Convert double newline to HTML line break
            .replace(/\n/g, '<br>');
    }

    return '';
}

export function extractShoppingList(menuContent: String) {
    const startIdx = menuContent.indexOf('COURSESTART');
    const endIdx = menuContent.indexOf('COURSEEND');

    if (startIdx !== -1 && endIdx !== -1) {
        const contentBetweenStartAndEnd = menuContent.slice(startIdx + 11, endIdx).trim();
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