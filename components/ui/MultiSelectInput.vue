<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'

defineProps({
  modelValue: {
    type: Array,
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

const emit = defineEmits(['update:modelValue'])

const selected = ref(null)

watch(selected, (newSelected) => {
  emit('update:modelValue', newSelected);
});

</script>

<template>
  <div :class="['form-control', `max-w-${maxWidth}`]">
    <label class="label">
      <span class="label-text font-light uppercase text-lg tracking-widest">{{ label }}</span>
    </label>
    <VueMultiselect
        class="custom-multi-select"
        v-model="selected"
        :options="options"
        :multiple="true"
        :close-on-select="true"
        :show-labels="false"
        :placeholder="placeholder"
        label="label"
        track-by="value"
    />
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.custom-multi-select .multiselect__tag {
  background: #252549;
}

.custom-multi-select .multiselect__option--highlight {
  background: #252549;
  outline: none;
  color: white;
}

.custom-multi-select .multiselect__option--highlight::after {
  content: attr(data-select);
  background: #252549;
  color: white;
}

.custom-multi-select .multiselect__placeholder {
  color: #252549;
}
</style>