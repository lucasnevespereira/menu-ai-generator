import {MenuFormData} from "@/server/utils/types";
import {Lang} from "@/types/enum";


export function buildAIPrompt(data: MenuFormData) {
    if (data.lang == Lang.FR) {
        return getFrenchPrompt(data)
    } else {
       return getEnglishPrompt(data)
    }
}


function getFrenchPrompt(data: MenuFormData) {
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
        // @ts-ignore
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

function getEnglishPrompt(data: MenuFormData) {
    let prompt = `I want to create a nutritional plan for a day, taking into account the following specifications:`;

    if (data.maxCalories > 0) {
        prompt += `Daily calorie limit: ${data.maxCalories} calories\n`;
    }

    if (data.maxCarbs > 0) {
        prompt += `Daily carbohydrate limit: ${data.maxCarbs} grams (${data.maxCarbs}% of calories)\n`;
    }

    if (data.maxProteins > 0) {
        prompt += `Daily protein limit: ${data.maxProteins} grams (${data.maxProteins}% of calories)\n`;
    }

    if (data.maxFats > 0) {
        prompt += `Daily fat limit: ${data.maxFats} grams (${data.maxFats}% of calories)\n`;
    }

    if (data.regimes && data.regimes.length > 0) {
        // @ts-ignore
        const regimesList = data.regimes.map(regime => regime.label).join(', ');
        prompt += `Dietary preferences: ${regimesList}\n`;
    }

    prompt += ` 
    Please suggest typical foods for each meal:
    
    Breakfast (typical breakfast foods)
    Lunch (typical lunch foods)
    Dinner (typical dinner foods)
    Snacks (typical snacks) 
    
    Please specify the quantities to use (in grams) for each ingredient in the nutritional menu, in the following format:
    

Breakfast :
• [quantity] of [food]
• [quantity] of [food]
...

Morning Snack :
• [quantity] of [food]

Lunch :
• [quantity] of [food]
• [quantity] of [food]
• [quantity] of [food]
• [quantity] of [food]

Afternoon Snack :
• [quantity] of [food]

Dinner :
• [quantity] of [food]
• [quantity] of [food]
• [quantity] of [food]
• [quantity] of [food]

Evening Snack :
• [quantity] of [food]

Please separate the beginning of the menu with MENUSTART and the end with MENUEND.
`;

    if (data.wantShoppingList) {
        prompt += `Please also generate a shopping list based on this menu to facilitate meal preparation. 
Please separate the beginning of the shopping list with COURSESTART and the end with COURSEEND.
Please do not add a title to the shopping list.
You can follow the format:
• [food] (quantity)`
    }

    return prompt
}
