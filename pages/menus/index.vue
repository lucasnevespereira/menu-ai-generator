<script setup>
import jsPDF from "jspdf";
import 'jspdf-autotable';
definePageMeta({
  middleware: ['auth-logged-in'],
})
const nuxtApp = useNuxtApp()
const user = nuxtApp.$auth.user
const { data: api} = await useFetch(`/api/menus?userID=${user.id}`)
const menus = ref(api)

const downloadMenu = (menu) => {
    const menuContent = menu.content
    if (menuContent) {
        const plainText = menuContent
            .replace(/<br>/g, '\n')
            .replace(/<\/?[^>]+(>|$)/g, ''); // remove any remaining HTML tags

        const lines = plainText.split('\n');

        const pdf = new jsPDF();

        pdf.setFontSize(16);
        pdf.text(`Menu du Jour (${menu.specs.maxCalories} kcal)`, 15, 10)
        pdf.setFontSize(12);
        pdf.autoTable({
            startY: 20,
            head: [['Repas', 'Contenu']],
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
            pdf.text('Liste des courses', 15, 10);

            // Create a table for the shopping list using the extracted shoppingListContent
            pdf.autoTable({
                startY: 20,
                head: [['Produit']],
                headStyles: {fillColor: [26, 52, 71]},
                body: lines.map(item => [item]),
            });
        }

        pdf.save('menu-ai.pdf');
    }
}

const truncateContent = (content) => {
  // Replace <br> with spaces and truncate the content
  const replacedContent = content.replace(/<br>/g, ' ');
  const truncatedContent = replacedContent.slice(0, 100); // Adjust the number of characters to truncate

  return truncatedContent + (replacedContent.length > 100 ? '...' : ''); // Add ellipsis if content was truncated
}


</script>

<template>
    <div class="container w-full mx-auto bg-base-100 p-10 overflow-y-auto rounded-lg">
        <div class="flex justify-between">
            <h2 class="text-primary font-bold text-2xl mb-4">Mes Menus</h2>
        </div>
        <div v-for="(menu, index) in menus" :key="index" class="flex justify-between items-center border border-gray-200 p-4 mb-4">
            <div class="flex-1 pr-4"><b>Menu {{ menu.specs.maxCalories }}kcal</b> - {{ truncateContent(menu.content) }}</div>
            <PhosphorIconDownloadSimple class="hover:cursor-pointer" size="24" @click="downloadMenu(menu)"/>
        </div>
    </div>
</template>

<style scoped>

</style>