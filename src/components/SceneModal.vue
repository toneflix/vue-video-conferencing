<template>
  <div
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDescription"
    id="deviceModal"
    class="con-modal"
    ref="dialog"
    :class="{ show }"
    :key="modalKey"
    @click="close"
  >
    <!-- Modal content -->
    <div class="con-modal-content">
      <div class="con-modal-header" id="modalTitle">
        <span aria-label="Close modal" class="con-modal-close" @click="close"
          >&times;</span
        >
        <h2>{{ title }}</h2>
      </div>
      <div class="con-modal-body con-pa-md" id="modalDescription">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  title: {
    Type: String,
  },
});

const modalKey = ref(0);
const dialog = ref(null);
const show = ref(props.modelValue);

onMounted(() => {
  document.body.appendChild(dialog.value);
});

onBeforeUnmount(() => {
  document.body.removeChild(dialog.value);
});

watch(
  () => show.value,
  (e) => {
    emit("update:modelValue", e);
  }
);

watch(
  () => props.modelValue,
  (e) => {
    show.value = e;
  }
);

const close = (e) => {
  if (
    e.target.classList.contains("con-modal") ||
    e.target.classList.contains("con-modal-close")
  ) {
    show.value = false;
  }
};
</script>
