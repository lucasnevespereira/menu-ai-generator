import {MenuSpecsData} from "@/server/utils/types";


export function buildAIPrompt(data: MenuSpecsData) {
    let prompt = `Je souhaite concevoir un plan nutritionnel pour une journée, en tenant compte des spécifications suivantes :`;

    if (data.maxCalories > 0) {
        prompt += `Limite de calories par jour : ${data.maxCalories} calories\n`;
    }

    if (data.maxCarbs > 0) {
        prompt += `Limite de glucides par jour : ${data.maxCarbs} grammes (${data.maxCarbs}% des calories)\n`;
    }

    if (data.maxProteins > 0) {
        prompt += `Limite de protéines par jour : ${data.maxProteins} grammes (${data.maxProteins}% des calories)\n`;
    }

    if (data.maxFats > 0) {
        prompt += `Limite de lipides par jour : ${data.maxFats} grammes (${data.maxFats}% des calories)\n`;
    }

    if (data.regimes && data.regimes.length > 0) {
        const regimesList = data.regimes.map(regime => regime.label).join(', ');
        prompt += `Régimes : ${regimesList}\n`;
    }

    prompt += ` 
    Veuillez proposer des aliments typiques pour chaque repas:
    
    Petit-déjeuner (aliments typiques du petit-déjeuner)
    Déjeuner (aliments typiques du déjeuner)
    Dîner (aliments typiques du dîner)
    Collations (aliments typiques pour les collations) 
    
    Veuillez spécifier les quantités à utiliser (en grammes) pour chaque ingrédient dans le menu nutritionnel, de la manière suivante :
    

Petit-déjeuner :
• [quantité] de [aliment]
• [quantité] de [aliment]
...

Collation du matin :
• [quantité] de [aliment]

Déjeuner :
• [quantité] de [aliment]
• [quantité] de [aliment]
• [quantité] de [aliment]
• [quantité] de [aliment]

Collation de l'après-midi :
• [quantité] de [aliment]

Dîner :
• [quantité] de [aliment]
• [quantité] de [aliment]
• [quantité] de [aliment]
• [quantité] de [aliment]

Collation du soir :
• [quantité] de [aliment]

Merci de séparer le début du menu par MENUSTART et la fin par MENUEND.
`;

    if (data.wantShoppingList) {
        prompt += `Veuillez également générer une liste de courses basée sur ce menu pour faciliter la préparation des repas. 
Merci de séparer le début de la liste de courses par COURSESTART et à la fin par COURSEEND.
Merci de ne pas ajouter de titre dans la liste de courses.
Vous pouvez respecter le format suivant:
• [aliment] (quantité)`
    }

    return prompt
}
