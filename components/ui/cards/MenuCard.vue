<script setup lang="ts">

import Loader from "~/components/ui/Loader.vue";

defineProps({
    menu: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="card p-4 shadow-xl w-full">
        <div v-if="menu.content" class="tooltip  absolute top-2 right-2" data-tip="copier menu">
            <PhosphorIconCopy class="hover:cursor-pointer" size="32" @click="$emit('copy')"/>
        </div>

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
        <div v-if="menu.content" class="tooltip absolute bottom-2 right-3" data-tip="télecharger en pdf">
            <PhosphorIconDownloadSimple class="hover:cursor-pointer" size="24" @click="$emit('download')"/>
        </div>
    </div>
</template>

<style scoped>

</style>