<template>
  <q-page>
    <div class="map">
      <QMapBox :config="config.map" :markers="markers">
        <QMarker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :text="marker.text"
        />
      </QMapBox>
    </div>
  </q-page>
</template>
<script>
export default {
  name: "test1",
  data() {
    return {
      config: {
        map: {
          accessToken:
            "pk.eyJ1Ijoic29mdHJhdyIsImEiOiJjazZzdTR4OW4wajF4M29udnZxMGxseXozIn0.YoK-b6rkj9Nw0zkWzvD0Xg",
          controls: "top-right",
          style: "mapbox://styles/softraw/cki8h8ft60nkq19s73qmwby0o"
        }
      },
      markers: [
        {
          id: Date.now(),
          position: [30.5, 50.5],
          text: "This is a test marker"
        },
        {
          id: Date.now() + 1,
          position: [30.5, 50.3]
          // this doesn't have a text to render
        }
      ]
    };
  }
};
</script>
<style>
.map {
  height: 100vh;
  width: 100vw;
}
</style>
