<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const confirmModal = ref(null)

const emit = defineEmits(['onConfirm', 'onCancel'])

const open = () => {
  confirmModal.value.showModal()
}

const confirm = () => {
  emit('onConfirm')
};

const onCancel = () => {
  emit('onCancel')
}

defineExpose({
  open
});

</script>

<template>
  <dialog ref="confirmModal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="py-4">{{ message }}</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-ghost">Cancel</button>
          <button class="btn btn-error btn-outline ml-2" @click="confirm">Confirm</button>
        </form>
      </div>
    </div>
  </dialog>
</template>


<style scoped></style>
