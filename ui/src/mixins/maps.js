import QMarker from "../components/Marker";
export default {
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
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
    _hasMarkers(defaults) {
      const filteredSlots = defaults.filter((marker) =>
        marker.tag.includes(QMarker.name)
      );
      this.markers = filteredSlots;
    },
  },
  computed: {
    staticClass() {
      return "q-map";
    },
  },

  render(h) {
    return h(
      "div",
      {
        staticClass: this.staticClass,
        ref: "container",
      },
      [this.map && this.markers]
    );
  },
};
