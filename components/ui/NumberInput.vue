<script setup>

defineProps({
    modelValue: {
        type: Number,
        required: true
    },
    label: String,
    placeholder: String,
    size: {
        type: String,
        default: "md"
    }
})
</script>

<template>
    <div class="form-control w-full mb-4">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <input
                type="number"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                required
                :class="['input input-bordered',`input-${size} max-w-${size}`]"
                :placeholder="placeholder"
        />
    </div>
</template>
