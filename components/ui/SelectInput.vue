<script setup>

defineProps({
    modelValue: {
        type: Array,
        required: true
    },
    label: String,
    placeholder: String,
    options: Array,
})
</script>


<template>
    <div class="form-control w-full max-w-xs">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <select class="select select-bordered" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)">
            <option disabled selected>{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>