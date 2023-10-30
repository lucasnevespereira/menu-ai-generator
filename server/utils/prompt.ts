import {MenuSpecsData} from "@/server/utils/types";


// export function buildAIPrompt(data: MenuSpecsData) {
//     return `Je veux créer un menu pour la journée avec les précisions suivantes:
//
// Calories max par jour: ${data.maxCalories}
// Glucides max par jour: ${data.maxCarbs}%
// Protéines max par jour: ${data.maxProteins}%
// Lipides max par jour: ${data.maxFats}%
//
// Allergies: ${data.allergies}
//
// Préciser les quantités à utiliser (en grammes) pour chaque ingredient.
//
// Genere également une liste de courses pour le menu.
//
// Merci de separer le début du menu par START et la fin par END`;
// }

export function buildAIPrompt(data: MenuSpecsData) {
    return `
Je souhaite concevoir un plan nutritionnel pour une journée, en tenant compte des spécifications suivantes :

Limite de calories par jour : ${data.maxCalories} calories
Limite de glucides par jour : ${data.maxCarbs} grammes (${data.maxCarbs}% des calories)
Limite de protéines par jour : ${data.maxProteins} grammes (${data.maxProteins}% des calories)
Limite de lipides par jour : ${data.maxFats} grammes (${data.maxFats}% des calories)

Allergies : ${data.allergies}

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

Veuillez également générer une liste de courses basée sur ce menu pour faciliter la préparation des repas. 
Merci de séparer le début de la liste de courses par COURSESTART et à la fin par COURSEEND.
Merci de ne pas ajouter de titre dans la liste de courses.
Vous pouvez respecter le format suivant:
• [aliment] (quantité)

`;
}
