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

    // filter markers from slot
    if (this.$slots.default && this.$slots.default.length > 0)
      this.hasMarkers(this.$slots.default);

    const loader = new Loader({
      apiKey: accessToken,
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(this.setup.container, {
        ...this.setup,
      });
    });
  },
  render(h) {
    return h(
      "div",
      {
        class: this.classes,
        ref: "container",
      },
      [this.map && this.markers]
    );
  },
};
