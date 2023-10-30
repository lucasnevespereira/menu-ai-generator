<template>
    <div class="container w-full mx-auto bg-base-100 p-10 rounded-lg">
        <div class="flex flex-wrap">
            <!--Form container-->
            <div class="form-container w-full md:w-1/2 mb-4 mx-auto">
                <h2 class="text-primary font-bold text-2xl mb-4">Tes Options</h2>
                <div class="w-full">
                    <NumberInput size="md" label="Calories" v-model="formData.maxCalories"
                                 placeholder="0" placeholder-symbol="kcal"/>
                </div>
                <div class="flex flex-wrap max-w-full">
                    <NumberInput size="sm" label="Glucides" v-model="formData.maxCarbs"
                                 placeholder="0" placeholder-symbol="%"/>
                    <NumberInput size="sm" label="Proteines" v-model="formData.maxProteins"
                                 placeholder="0" placeholder-symbol="%"/>
                    <NumberInput size="sm" label="Lipides" v-model="formData.maxFats"
                                 placeholder="0" placeholder-symbol="%"/>
                </div>
                <div class="w-full">
                    <SelectInput size="md" label="Régimes" v-model="formData.allergies" placeholder="Allergenes"
                                 :options="allergyOptions"/>
                </div>
                <div class="form-control w-full max-w-xs mt-4">
                    <button @click="generateMenu" class="btn btn-primary">Générer</button>
                </div>
            </div>
            <!--Menu container-->
            <div class="menu-container md:w-1/2 sm:max-w-full">
                <div class="flex justify-between items-center">
                    <h2 class="text-primary font-bold text-2xl">Ton Menu</h2>
                    <div class="actions relative flex flex-row items-center justify-around">
                        <div class="tooltip" data-tip="copier menu">
                            <PhosphorIconCopy class="hover:cursor-pointer" size="24" @click="copyToClipboard"/>
                        </div>
                        <div class="tooltip ml-2" data-tip="télecharger en pdf">
                            <PhosphorIconDownloadSimple class="hover:cursor-pointer" size="24" @click="saveToPDF"/>
                        </div>
                    </div>
                </div>
                <div class="card menu-card p-4 shadow-xl w-full no-scrollbar">
                    <Loader v-if="isLoading"/>
                    <div v-else-if="menu.content" class="">
                        <div class="title flex flex-col">
                            <h2 class="text-xl font-semibold mb-2">Menu {{ menu.specs.maxCalories }}kcal</h2>
                            <p class="text-sm mb-2 font-semibold">
                                {{ menu.specs.maxCalories }} calories,
                                lipides {{ menu.specs.maxFats }}%,
                                glucides{{ menu.specs.maxCarbs }}%,
                                proteines {{ menu.specs.maxProteins }}%
                            </p>
                        </div>
                        <div class="menu-content p-4">
                            <div class="menu-text">
                                <div v-html="menu.content"></div>
                                <hr class="m-2">
                                <div class="flex flex-col">
                                    <h2 class="text-xl font-semibold mb-2">Liste de Courses</h2>
                                    <div v-html="menu.shoppingList"></div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div v-else>
                        <div class="h-full w-full flex flex-col justify-center items-center text-center">

                        </div>
                    </div>
                </div>
            </div>

        </div>
        <Toast ref="toastRef"/>
    </div>
</template>

<script setup>
import NumberInput from '@/components/ui/NumberInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import Loader from "@/components/ui/Loader.vue";
import Toast from "@/components/ui/Toast.vue";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const formData = ref({
    maxCalories: 0,
    maxCarbs: 0,
    maxProteins: 0,
    maxFats: 0,
    allergies: [],
});

const allergyOptions = [
    {label: 'Lactose', value: 'lactose'},
    {label: 'Gluten', value: 'gluten'},
];

const isLoading = ref(false);

const menu = ref({
    content: null,
    specs: {},
    description: "",
    shoppingList: null
})

const toastRef = ref(null);

const copyToClipboard = () => {
    const menuContent = menu.value.content;
    if (menuContent) {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = menuContent;
        const plainText = tempElement.textContent;

        const textArea = document.createElement('textarea');
        textArea.value = plainText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    toastRef.value.start('Contenu du menu copié');
}

const saveToPDF = () => {
    const menuContent = menu.value.content;
    if (menuContent) {
        const plainText = menuContent
            .replace(/<br>/g, '\n')
            .replace(/<\/?[^>]+(>|$)/g, ''); // remove any remaining HTML tags

        const lines = plainText.split('\n');

        const pdf = new jsPDF();

        pdf.setFontSize(16);
        pdf.text(`Menu du Jour (${menu.value.specs.maxCalories} kcal)`, 15, 10)
        pdf.setFontSize(12);
        pdf.autoTable({
            startY: 20,
            head: [['Repas', 'Contenu']],
            headStyles: {fillColor: [76, 184, 189]},
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

        const shoppingListContent = menu.value.shoppingList
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
                headStyles: {fillColor: [76, 184, 189]},
                body: lines.map(item => [item]),
            });
        }

        pdf.save('menu-ai.pdf');
    }
};


const generateMenu = async () => {
    isLoading.value = true;
    const {data} = await useFetch('/api/generate/menutmp', {
        method: 'POST', body: formData.value
    })
    console.log(data.value)
    menu.value.content = data.value.menu
    menu.value.specs = data.value.specs
    menu.value.description = data.value.description
    menu.value.shoppingList = data.value.shoppingList
    isLoading.value = false
};
</script>

<style scoped>

.menu-container {
    max-height: 70vh;
}

.menu-text {
    font-size: 16px;
    line-height: 1.5;
}

.menu-card {
    max-height: 90%;
    overflow-y: scroll;
}

</style>
