<script setup>
import {watch} from "vue";

const props = defineProps({
    duration: {
        type: Number,
        default: 2000,
    },
})

const visible = ref(false)
const toastMessage = ref('');


const show = (message) => {
    toastMessage.value = message;
    visible.value = true;
};
const hide = () => {
    visible.value = false;
}

watch(visible, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            hide();
        }, props.duration);
    }
});

const start = (message, duration = props.duration) => {
    show(message);
    setTimeout(() => {
        hide();
    }, duration);
};

defineExpose({
    start
});
</script>

<template>
    <div v-if="visible" class="toast">
        <div class="alert">
            <span>{{ toastMessage }}</span>
        </div>
    </div>
</template>

<style scoped>

</style>