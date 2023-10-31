export default defineEventHandler(async event => {
    const tmpMenu = "Petit-déjeuner :<br>• 100g de blancs d'œufs<br>• 50g de tomates<br>• 30g de poivrons<br>• 20g d'épinards<br>Collation du matin :<br>• 30g d'amandes<br>Déjeuner :<br>• 150g de poulet grillé<br>• 100g de brocoli<br>• 100g de courgettes<br>• 50g de champignons<br>Collation de l'après-midi :<br>• 100g de saumon fumé<br>Dîner :<br>• 150g de steak haché maigre<br>• 100g de haricots verts<br>• 50g de poireau<br>• 20g de feuilles de salade<br>Collation du soir :<br>• 30g de graines de chia"
   const tmpShoppingList = "• Blancs d'œufs (100g)<br>• Tomates (50g)<br>• Poivrons (30g)<br>• Épinards (20g)<br>• Amandes (30g)<br>• Poulet grillé (150g)<br>• Brocoli (100g)<br>• Courgettes (100g)<br>• Champignons (50g)<br>• Saumon fumé (100g)<br>• Steak haché maigre (150g)<br>• Haricots verts (100g)<br>• Poireau (50g)<br>• Feuilles de salade (20g)<br>• Graines de chia (30g)"
   const tmpSpecs = {
       "maxCalories": "1900",
       "maxCarbs": "30",
       "maxProteins": "20",
       "maxFats": "20",
       "allergies": "lactose"
   }
   const tmpDescription = "1900 calories,lipides 20%,glucides 30%,proteines 20%"
    return {
        menu: tmpMenu,
        specs: tmpSpecs,
        description: tmpDescription,
        shoppingList: tmpShoppingList
    }
})

