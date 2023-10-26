import {MenuSpecsData} from "@/server/utils/types";


export function buildAIPrompt(data: MenuSpecsData) {
    return `Je veux créer un menu avec les précisions suivantes:
    
Calories max par jour: ${data.maxCalories}
Glucides max par jour: ${data.maxCarbs}%
Protéines max par jour: ${data.maxProteins}%
Lipides max par jour: ${data.maxFats}%

Allergies: ${data.allergies}

Préciser les quantités à utiliser (en grammes) pour chaque ingredient

Merci de separer le début du menu par START et la fin par END`;
}