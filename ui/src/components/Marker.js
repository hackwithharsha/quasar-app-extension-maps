import mapboxgl from "../utils/mapbox";

import {
  defaultPopupConfig,
  defaultMarkerConfig,
} from "../utils/mapbox/constants";

export default {
  name: "QMarker",
  props: {
    position: {
      type: Array,
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
  },
  data() {
    return {
      marker: undefined,
    };
  },
  inject: ["mapbox"],
  mounted() {
    const marker = new mapboxgl.Marker({
      ...this.marker_setup,
    })
      .setLngLat(this.position)
      .addTo(this.mapbox);

    if (this.text) {
      const popup = new mapboxgl.Popup({ ...this.popup_setup }).setText(
        this.text
      );
      marker.setPopup(popup);
    }
    this.marker = marker;
  },

  render(h) {
    return h("div");
  },
};
