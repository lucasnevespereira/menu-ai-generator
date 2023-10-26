<script setup lang="ts">
defineProps({
    size: {
        type: String,
        default: 'lg',
    },
    additionalClasses: String,
});
</script>

<template>
    <div class="h-full w-full flex justify-center items-center flex-col">
        <span :class="[
        'loading loading-bars',
        `loading-${size}`,
        additionalClasses
      ]"></span>
        <p class="font-semibold mt-2">Géneration du menu en cours</p>
    </div>
</template>