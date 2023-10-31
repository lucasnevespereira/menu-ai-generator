<script setup>
defineProps({
    modelValue: {
        type: Number,
        required: true
    },
    label: String,
    placeholder: String,
    placeholderSymbol: String,
    inputSize: {
        type: String,
        default: "sm"
    },
    maxWidth: {
        type: String,
        default: "sm"
    }
})
</script>

<template>
    <div class="form-control mb-4">
        <label class="label">
            <span class="label-text font-light uppercase text-lg tracking-widest">{{ label }}</span>
        </label>
        <div :class="['input relative input-ghost flex items-center', `input-${inputSize} max-w-${maxWidth}`]">
            <input
                type="number"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                required
                :class="['bg-base-100', 'w-full']"
                :placeholder="placeholder"
            />
            <div class="input-icon ml-2 text-primary">{{ placeholderSymbol }}</div>
        </div>
    </div>
</template>
