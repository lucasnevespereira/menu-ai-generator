<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'accent'
  },
  additionalClasses: String,
});
</script>

<template>
  <div class="h-full w-full flex justify-center items-center flex-col p-10">
        <span :class="[
           `text-${color}`,
        `loading loading-spinner loading-lg`,
        additionalClasses
      ]">
        </span>
  </div>
</template>