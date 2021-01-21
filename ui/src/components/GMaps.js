const { Loader } = require("@googlemaps/js-api-loader");

import MapsMixin from "../mixins/maps";

import { defaultGoogleMapConfig } from "../utils/googlemaps/constants";

export default {
  name: "QGmaps",
  mixins: [MapsMixin],
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      mode: "gmaps",
    };
  },
  watch: {
    config(currentValue) {
      this.map = null;
      
      this.$nextTick(() => {
        const setup = { ...this.setup, ...currentValue };

        this.map = new google.maps.Map(setup.container, {
          ...setup,
        });
      });
    },
  },
  computed: {
    setup() {
      return {
        container: this.$refs.container,
        ...defaultGoogleMapConfig,
        ...this.config,
      };
    },
  },
  mounted() {
    // check if accessToken exists
    const accessToken = this.setup.accessToken || this.$qMapconfig.accessToken;

    if (!accessToken) {
      throw new Error("Access token isn't defined");
    }

    const loader = new Loader({
      apiKey: accessToken,
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(this.setup.container, {
        ...this.setup,
      });
    });
  },
};
