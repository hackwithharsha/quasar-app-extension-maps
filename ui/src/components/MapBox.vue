<template>
  <div id="q-map" style="width: 100%; height: 500px"></div>
</template>

<script>
import MapBox from "../mixins/Mapbox";
export default {
  name: "QMapBox",
  mixins: [MapBox]
};
</script>
