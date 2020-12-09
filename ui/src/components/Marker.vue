<template>
  <div style="height: 1px; width: 1px" />
</template>

<script>
import { $bus } from "../index";
import find from "../utils/find";
export default {
  name: "QMarker",
  props: ["config", "marker"],
  mounted() {
    find("loaded", window.maps).then((loaded) => {
      if (loaded) {
        $bus.$emit("set-marker", {
          config: this.config,
          marker: this.marker,
        });
      }
    });
  },
};
</script>
