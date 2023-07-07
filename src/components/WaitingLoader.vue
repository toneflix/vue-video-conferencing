<template>
  <div class="con-flex con-flex-column con-loader" v-if="show">
    <div class="con-ellipsis" :style="style">
      <div :class="`con-bg-${color}`"></div>
      <div :class="`con-bg-${color}`"></div>
      <div :class="`con-bg-${color}`"></div>
      <div :class="`con-bg-${color}`"></div>
    </div>
    <h3 v-if="text" :class="`con-text-${color}`">{{ text + dots }}</h3>
    <slot name="button"></slot>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
  },
  color: {
    type: String,
    default: "green",
  },
  width: {
    type: [String, Number],
    default: "80px",
  },
  height: {
    type: [String, Number],
    default: "100%",
  },
  text: {
    type: String,
  },
});

const style = computed(() => ({
  width: typeof props.width === "string" ? props.width : props.width + "px",
  height: typeof props.height === "string" ? props.height : props.height + "px",
}));

const dots = ref("");

let interval = setInterval(() => {
  if (dots.value.length === 3) {
    dots.value = "";
  } else {
    dots.value += ".";
  }
}, 600);

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
