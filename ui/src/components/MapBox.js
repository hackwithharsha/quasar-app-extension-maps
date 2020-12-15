import mapboxgl from "../utils/mapbox";

import MapsMixin from "../mixins/maps";

import {
  controlsPositions,
  defaultMapboxConfig,
} from "../utils/mapbox/constants";

export default {
  name: "QMapBox",
  mixins: [MapsMixin],
  data() {
    return {
      mode: "mapbox",
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
    this.map = map;
  },
};
