<script setup>

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: String,
  placeholder: String,
  options: Array,
  size: {
    type: String,
    default: "md"
  },
  maxWidth: {
    type: String,
    default: "full"
  }

})
</script>


<template>
  <div :class="['form-control', `max-w-${size}`]">
    <label class="label">
      <span class="label-text font-light uppercase text-lg tracking-widest">{{ label }}</span>
    </label>
    <select class="select select-bordered"
            :class="['input relative flex items-center', `input-${size} max-w-${maxWidth}`]" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">
      <option disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>