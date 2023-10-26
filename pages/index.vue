<template>
    <div class="container p-4">
        <h1 class="text-3xl font-bold mb-4">Menu AI Generator</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="form-container">
                <NumberInput label="Calories max par jour (kcal):" v-model="formData.maxCalories"
                             placeholder="Calories"/>
                <NumberInput label="Glucides max par jour (%)" v-model="formData.maxCarbs" placeholder="Glucides"/>
                <NumberInput label="Proteines max par jour (%)" v-model="formData.maxProteins" placeholder="Proteines"/>
                <NumberInput label="Lipides max par jour (%)" v-model="formData.maxFats" placeholder="Lipides"/>
                <SelectInput label="Allergenes" v-model="formData.allergies" placeholder="Allergenes"
                             :options="allergyOptions"/>

                <div class="form-control w-full max-w-xs mt-4">
                    <button @click="generateMenu" class="btn btn-primary">Générer</button>
                </div>
            </div>
            <div class="card p-4 shadow-xl">
                <h2 class="text-xl font-semibold mb-2">Generated Menu Data:</h2>
                <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup>
import NumberInput from '@/components/ui/NumberInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';

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

const generateMenu = () => {
    isLoading.value = true;
    // Call your API or function to generate the menu
    // When the menu is ready, update the "menu-content" div
    // and set isLoading.value = false
};
</script>
