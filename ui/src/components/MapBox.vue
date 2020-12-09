<template>
  <div id="q-map" style="width: 100vw; height: 100vh">
    <slot />
  </div>
</template>

<script>
import MapBox from "../mixins/Mapbox";
import { $bus } from "../index";
export default {
  name: "QMapBox",
  mixins: [MapBox],
  data() {
    return {
      markers: [],
    };
  },
  created() {
    const { mapboxgl } = window;
    // marker events (setup marker if 'set-marker' is fired)
    $bus.$on("set-marker", (settings) => {
      // setup default config
      const { config, marker } = settings;
      let _config;
      if (!config) {
        _config = {
          marker: {
            color: "#3FB1CE",
          },
          popup: {
            closeOnClick: true,
          },
        };
      } else {
        _config = {
          marker: {
            color: "#3FB1CE",
            ...config.marker,
          },
          popup: {
            closeOnClick: true,
            ...config.popup,
          },
        };
      }
      let markerInstance;
      if (marker.text) {
        // function htmlEntities(str) {
        //   return String(str)
        //     .replace(/&/g, "&amp;")
        //     .replace(/</g, "&lt;")
        //     .replace(/>/g, "&gt;")
        //     .replace(/"/g, "&quot;");
        // }
        let popupInstance = new mapboxgl.Popup({ ..._config.popup })
          .setText(marker.text)
          .setMaxWidth("6.5rem");

        markerInstance = new mapboxgl.Marker({ ..._config.marker })
          .setLngLat(marker.position)
          .setPopup(popupInstance)
          .addTo(this.mapbox);
      } else {
        markerInstance = new mapboxgl.Marker({
          ..._config.marker,
        })
          .setLngLat(marker.position)
          .addTo(this.mapbox);
      }

      // push all markers to data (easy to remove if required)
      this.markers.push({ ...marker, instance: markerInstance });
    });

    window.maps.loaded = true;
  },
};
</script>
