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
    hasMarkers(defaults) {
      const filteredSlots = defaults.filter((marker) =>
        marker.tag.includes(QMarker.name)
      );
      this.markers = filteredSlots;
    },
  },
  computed: {
    classes() {
      return "q-map";
    },
  },
};
