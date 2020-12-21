import QMarker from "../components/Marker";
export default {
  data() {
    return {
      markers: [],
      map: null,
    };
  },
  provide() {
    const self = this;
    return {
      get map() {
        return self.map;
      },

      get mode() {
        return self.mode;
      },
    };
  },
  methods: {
    filterMarkers(defaults) {
      const filteredSlots = defaults.filter((marker) =>
        marker.tag.includes(QMarker.name)
      );
      this.markers = filteredSlots;
      return filteredSlots;
    },
    $_renderMarkers() {
      if (this.$slots.default && this.$slots.default.length > 0) {
        return this.filterMarkers(this.$slots.default);
      }
    },
  },
  computed: {
    classes() {
      return "q-map";
    },
  },
  render(h) {
    return h(
      "div",
      {
        class: "q-map",
        ref: "container",
      },
      [this.map && this.$_renderMarkers()]
    );
  },
};
