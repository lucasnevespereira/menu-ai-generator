<template>
    <div class="container p-4 w-full mx-auto">
        <h1 class="text-3xl font-bold mb-4">Menu AI</h1>
        <div class="flex flex-wrap">
            <div class="form-container w-full md:w-1/2 mb-4 mx-auto">
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
            <div class="card p-4 shadow-xl w-full md:w-1/2 sm:max-w-full">
                <Loader v-if="isLoading"/>
                <div v-else-if="menu.content" class="max-h-fit overflow-y-scroll">
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
                        <div v-html="menu.content" class="menu-text"></div>
                    </div>
                </div>
                <div v-else>
                    <div class="h-full w-full flex flex-col justify-center items-center text-center">
                        <p class="text-lg">Cliquez sur "Générer" pour créer votre menu</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import NumberInput from '@/components/ui/NumberInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import Loader from "@/components/ui/Loader.vue";

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
    specs: {}
})

const generateMenu = async () => {
    isLoading.value = true;
    const {data} = await useFetch('/api/generate/menu', {
        method: 'POST', body: formData.value
    })
    menu.value.content = data.value.menu
    menu.value.specs = {
        maxCalories: formData.value.maxCalories,
        maxCarbs: formData.value.maxCarbs,
        maxProteins: formData.value.maxProteins,
        maxFats: formData.value.maxFats,
        allergies: formData.value.allergies,
    }
    isLoading.value = false
};
</script>

<style scoped>
.menu-content {
    max-height: 100%;
}

.menu-text {
    font-size: 16px;
    line-height: 1.5;
    max-height: 60vh;
    overflow-y: auto;
}

</style>
