<template>
  <q-btn :label="label" :color="color" />
</template>

<script>
import { QBtn } from "quasar";

export default {
  name: "QCustomBtn",
  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "red-9",
    },
  },
  components: {
    QBtn,
  },
};
</script>

<style scoped></style>
