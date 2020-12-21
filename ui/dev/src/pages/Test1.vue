<template>
  <q-page>
    <div class="map" ref="map">
      <QMapBox :config="config.mapbox">
        <QMarker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :text="marker.text"
        />
      </QMapBox>

      <!-- <QGmaps :config="config.gmap">
        <QMarker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :text="marker.text"
        />
      </QGmaps> -->
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
          NavigationControl: {
            show: true,
            position: "bottom-right"
          },
          GeolocateControl: {
            show: true,
            position: "top-right"
          },
          FullscreenControl: {
            show: true,
            position: "top-left"
          },

          style: "mapbox://styles/softraw/cki8h8ft60nkq19s73qmwby0o"
        },
        gmap: {
          disableDefaultUI: false
        }
      },
      markers: [
        {
          id: Date.now(),
          position: { lat: 44.427963, lng: -110.588455 },
          text: "This is a test marker"
        },
        {
          id: Date.now() + 1,
          position: { lng: -96.424721, lat: 45.305557 }
          // this doesn't have a text to render
        }
      ]
    };
  },
  mounted() {
    // mocking changes
    setTimeout(() => {
      this.markers.push({
        id: Date.now(),
        position: { lat: 41.2131788, lng: -124.0046276 },
        text: "This is a test marker"
      });

      this.config.mapbox = {
        ...this.config.mapbox,
        fullscreenControls: {
          show: false
        }
      };

      this.config.gmap = {
        ...this.config.gmap
      };
    }, 5000);
  }
};
</script>
<style>
.map {
  height: 100vh;
  width: 100vw;
}
</style>
