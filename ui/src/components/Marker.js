import mapboxgl from "../utils/mapbox";
import _ from "underscore";
import {
  defaultPopupConfig,
  defaultMarkerConfig,
} from "../utils/mapbox/constants";

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
    marker_setup() {
      return this.config && this.config.marker
        ? {
            ...defaultMarkerConfig,
            ...this.config.marker,
          }
        : { ...defaultMarkerConfig };
    },
    popup_setup() {
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
        positions = Object.keys(this.position).map((key) => this.position[key]);
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
        ...this.marker_setup,
      })
        .setLngLat(this.getPositions)
        .addTo(this.map);

      if (this.text) {
        const popup = new mapboxgl.Popup({ ...this.popup_setup }).setText(
          this.text
        );
        marker.setPopup(popup);
      }
      
      this.marker = marker;
    } else if (this.mode === "gmaps") {
      const { google } = window;
      const marker = new google.maps.Marker({
        position: { ...this.getPositions },
        title: this.text,
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
