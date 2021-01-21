const mapboxgl = require("mapbox-gl");

import MapsMixin from "../mixins/maps";

import {
  controlsPositions,
  defaultMapboxConfig,
  availableControls,
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
    config(currentValue) {
      this.map = null;

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
      Object.keys(availableControls).forEach((control) => {
        if (this.setup.hasOwnProperty(control) && this.setup[control].show) {
          let { options, position } = this.setup[control];
          position = this.$_checkposition(position);

          // specific to fullscreen controls
          if (control === availableControls.FullscreenControl) {
            options = {
              container: document.querySelector("body"),
              ...options,
            };
          }

          const $_controls = new mapboxgl[control](options);
          map.addControl($_controls, position);
        }
      });
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
};
