const mapboxgl = require("mapbox-gl");

import MapsMixin from "../mixins/maps";

import {
  controlsPositions,
  defaultMapboxConfig,
} from "../utils/mapbox/constants";

export default {
  name: "QMapBox",
  mixins: [MapsMixin],
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      mode: "mapbox",
      setupConfig: this.setup,
    };
  },
  watch: {
    config(currentValue, previousValue) {
      // remove map
      this.map.remove();
      this.map = null;

      // rebuild map on config change
      this.$nextTick(() => {
        const setup = { ...this.setup, ...currentValue };
        this.map = new mapboxgl.Map(setup);

        if (this.setup.controls && this.setup.controls !== previousValue.controls)
          this.addControls(this.map, this.setup.controls);
      });
    },
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
    addControls(mapInstance, position = controlsPositions[0]) {
      position = position.toLowerCase();

      if (controlsPositions.indexOf(position) === -1)
        throw new Error(`Invalid position, [${position}]`);

      const controls = new mapboxgl.NavigationControl();
      mapInstance.addControl(controls, position);
      return mapInstance;
    },
    $_renderMarkers() {
      if (this.$slots.default && this.$slots.default.length > 0) {
        return this.filterMarkers(this.$slots.default);
      }
    },
  },
  mounted() {
    // check if accessToken exists
    const accessToken = this.setup.accessToken || this.$qMapconfig.accessToken;

    if (!accessToken) {
      throw new Error("Access token isn't defined");
    }

    mapboxgl.accessToken = accessToken;
    let map = new mapboxgl.Map({ ...this.setup });

    const { controls } = this.setup;
    if (controls) this.addControls(map, controls);
    // save instance
    this.map = map;
  },
  render(h) {
    return h(
      "div",
      {
        class: this.classes,
        ref: "container",
      },
      [this.map && this.$_renderMarkers()]
    );
  },
};
