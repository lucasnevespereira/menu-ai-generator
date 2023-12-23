import jsPDF from "jspdf";
import 'jspdf-autotable';
import {Lang} from "@/types/enum";

export const SAVE_TO_PDF = (menu) => {
    const menuContent = menu.content;
    if (menuContent) {
        const plainText = menuContent
            .replace(/<br>/g, '\n')
            .replace(/<\/?[^>]+(>|$)/g, ''); // remove any remaining HTML tags

        const lines = plainText.split('\n');

        const pdf = new jsPDF();
        const headers = menu.specs.lang === Lang.FR ? ['Repas', 'Contenu'] : ['Meal', 'Content']
        pdf.setFontSize(16);
        pdf.text(`${menu.specs.lang === Lang.FR ? 'Menu du Jour' : 'Daily Menu'} (${menu.specs.maxCalories} kcal)`, 15, 10)
        pdf.setFontSize(12);
        pdf.autoTable({
            startY: 20,
            head: [headers],
            headStyles: {fillColor: [26, 52, 71]},
            body: lines.map((line, index) => {
                if (line.startsWith('•')) {
                    // content lines with bullet points
                    return ['', line];
                } else {
                    // lines without bullet points as headers
                    return [line, ''];
                }
            }),
        });

        const shoppingListContent = menu.shoppingList
        if (shoppingListContent) {
            const plainText = shoppingListContent
                .replace(/<br>/g, '\n')
                .replace(/<\/?[^>]+(>|$)/g, ''); // remove any remaining HTML tags

            const lines = plainText.split('\n');
            pdf.addPage(); // Add a new page for the shopping list

            pdf.setFontSize(16);
            const shoppingListTitle = menu.specs.lang === Lang.FR ? 'Liste des courses' : 'Shopping List'
            pdf.text(shoppingListTitle, 15, 10);

            // Create a table for the shopping list using the extracted shoppingListContent
            const shoppingListTableHead = menu.specs.lang === Lang.FR ? 'Produit' : 'Product'
            pdf.autoTable({
                startY: 20,
                head: [[shoppingListTableHead]],
                headStyles: {fillColor: [26, 52, 71]},
                body: lines.map(item => [item]),
            });
        }

        pdf.save('menu-ai.pdf');
    }
};