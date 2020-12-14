import mapboxgl from "../utils/mapbox";

import QMarker from "./Marker";
import {
  controlsPositions,
  defaultMapboxConfig,
} from "../utils/mapbox/constants";

export default {
  name: "QMapBox",
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      mapbox: null,
      markers: [],
      mode: "mapbox",
    };
  },
  provide() {
    const self = this;
    return {
      // reactive mapbox instance
      get map() {
        return self.mapbox;
      },
      get mode() {
        return self.mode;
      },
    };
  },
  computed: {
    setup() {
      return {
        container: this.$refs.container, // HTMLElement or #id
        ...defaultMapboxConfig,
        ...this.config,
      };
    },
    staticClass() {
      return "q-map";
    },
  },
  methods: {
    _addControls(mapInstance, position = controlsPositions[0]) {
      position = position.toLowerCase();

      if (controlsPositions.indexOf(position) === -1)
        throw new Error(`Invalid position, [${position}]`);

      const controls = new mapboxgl.NavigationControl();
      mapInstance.addControl(controls, position);
      return mapInstance;
    },
    _hasMarkers(defaults) {
      const filteredSlots = defaults.filter((marker) =>
        marker.tag.includes(QMarker.name)
      );
      this.markers = filteredSlots;
    },
  },
  mounted() {
    // check if accessToken exists
    const accessToken = this.$config.accessToken || this.setup.accessToken;

    if (!accessToken) {
      throw new Error("Access token isn't defined");
    }

    mapboxgl.accessToken = accessToken;
    let map = new mapboxgl.Map({ ...this.setup });

    const { controls } = this.setup;
    if (controls) map = this._addControls(map, controls);

    // filter markers from slot
    if (this.$slots.default && this.$slots.default.length > 0)
      this._hasMarkers(this.$slots.default);

    // save instance
    this.mapbox = map;
  },
  render(h) {
    return h(
      "div",
      {
        staticClass: this.staticClass,
        ref: "container",
      },
      [this.mapbox && this.markers]
    );
  },
};
