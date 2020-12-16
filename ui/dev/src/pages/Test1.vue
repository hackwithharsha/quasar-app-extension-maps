<template>
  <q-page>
    <div class="map">
      <!-- <QMapBox :config="config.mapbox">
        <QMarker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :text="marker.text"
        />
      </QMapBox> -->

      <QGmaps :config="config.gmap">
        <QMarker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :text="marker.text"
        />
      </QGmaps>
    </div>
  </q-page>
</template>
<script>
export default {
  name: "test1",
  data() {
    return {
      config: {
        mapbox: {
          controls: "top-right",
          style: "mapbox://styles/softraw/cki8h8ft60nkq19s73qmwby0o"
        },
        gmap: {
          disableDefaultUI: false
        }
      },
      markers: [
        {
          id: Date.now(),
          position: { lat: 28.7041, lng: 77.1025 },
          text: "This is a test marker"
        },
        {
          id: Date.now() + 1,
          position: { lng: 72.8777, lat: 19.076 }
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
