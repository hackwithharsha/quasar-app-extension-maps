const mapboxgl = require("mapbox-gl");
import {
  defaultPopupConfig,
  defaultMapboxMarkerConfig,
} from "../utils/mapbox/constants";

import { defaultGMapsMarkerConfig } from "../utils/googlemaps/constants";

export default {
  name: "QMarker",
  props: {
    position: {
      type: [Array, Object],
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    config: {
      type: Object,
      required: false,
    },
  },
  computed: {
    markerSetup() {
      return this.config && this.config.marker
        ? {
            ...defaultMapboxMarkerConfig,
            ...this.config.marker,
          }
        : { ...defaultMapboxMarkerConfig };
    },
    popupSetup() {
      return this.config && this.config.popup
        ? {
            ...defaultPopupConfig,
            ...this.config.popup,
          }
        : { ...defaultPopupConfig };
    },
    getPositions() {
      let positions = this.position;
      if (this.mode === "mapbox") {
        // [lng, lat]
        positions = [this.position["lng"], this.position["lat"]];
      }

      return positions;
    },
  },
  data() {
    return {
      marker: undefined,
    };
  },
  inject: ["map", "mode"],
  mounted() {
    if (this.mode === "mapbox") {
      const marker = new mapboxgl.Marker({
        ...this.markerSetup,
      })
        .setLngLat(this.getPositions)
        .addTo(this.map);

      if (this.text) {
        const popup = new mapboxgl.Popup({ ...this.popupSetup }).setText(
          this.text
        );
        marker.setPopup(popup);
      }

      this.marker = marker;
    } else if (this.mode === "gmaps") {
      const marker = new google.maps.Marker({
        position: { ...this.getPositions },
        title: this.text,
        ...defaultGMapsMarkerConfig,
      });

      marker.setMap(this.map);

      if (this.text) {
        const infoWindow = new google.maps.InfoWindow({
          content: this.text,
        });

        marker.addListener("click", () => {
          infoWindow.open(this.map, marker);
        });
      }

      this.marker = marker;
    }
  },

  render(h) {
    return h("div");
  },
};
