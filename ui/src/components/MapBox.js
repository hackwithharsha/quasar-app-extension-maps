const mapboxgl = require("mapbox-gl");

import MapsMixin from "../mixins/maps";

import {
  controlsPositions,
  defaultMapboxConfig,
} from "../utils/mapbox/constants";

const $_ControlPositions = Object.values(controlsPositions);

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
      this.map = null;

      // rebuild map on config change
      this.$nextTick(() => {
        const setup = { ...this.setup, ...currentValue };
        this.map = new mapboxgl.Map(setup);

        this.$_addControls(this.map);
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
    $_checkposition(position = controlsPositions.topRight) {
      if ($_ControlPositions.indexOf(position.toLowerCase()) == -1)
        throw new Error(`Invalid position ${position}`);

      return position.toLowerCase();
    },
    $_addControls(map) {
      const {
        scaleControl = {},
        geolocateControl = {},
        navigationControl = {},
        fullscreenControl = {},
      } = this.setup;

      if (navigationControl.show) {
        let { options, position } = navigationControl;
        position = this.$_checkposition(position);

        const navControls = new mapboxgl.NavigationControl(options);
        map.addControl(navControls, position);
      }

      if (geolocateControl.show) {
        let { options, position } = geolocateControl;
        position = this.$_checkposition(position);

        const geolocate = new mapboxgl.GeolocateControl(options);
        map.addControl(geolocate, position);
      }

      if (scaleControl.show) {
        let { options, position } = scaleControl;
        position = this.$_checkposition(position);

        const scale = new mapboxgl.ScaleControl(options);
        map.addControl(scale, position);
      }

      if (fullscreenControl.show) {
        let { options, position } = fullscreenControl;
        position = this.$_checkposition(position);

        options = {
          container: document.querySelector("body"),
          ...options,
        };
        const fullscreen = new mapboxgl.FullscreenControl(options);
        map.addControl(fullscreen, position);
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

    this.$_addControls(map);

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
