<script setup>

defineProps({
    modelValue: {
        type: Number,
        required: true
    },
    label: String,
    placeholder: String,
    placeholderSymbol: String,
    size: {
        type: String,
        default: "md"
    },
})
</script>

<template>
    <div class="form-control mb-4">
        <label class="label">
            <span class="label-text font-light uppercase text-lg tracking-widest">{{ label }}</span>
        </label>
        <div :class="['input relative input-ghost flex justify-between items-center', `input-${size}`]">
            <input
                    type="number"
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    required
                    :class="['bg-base-100 mr-2' ]"
                    :placeholder="placeholder"
            />
            <div v-if="placeholderSymbol" class="input-icon ml-2 font-bold bg-white absolute right-2">{{placeholderSymbol}}</div>
        </div>
    </div>
</template>
