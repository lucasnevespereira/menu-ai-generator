export interface Menu {
    content: string,
    specs: MenuSpecs ,
    description: string,
    shoppingList: string
}

export interface MenuSpecs {
    maxCalories: number,
    maxCarbs: number,
    maxProteins: number,
    maxFats: number,
    regimes: string[],
}