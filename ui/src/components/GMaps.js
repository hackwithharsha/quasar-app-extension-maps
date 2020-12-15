import { Loader } from "../utils/googlemaps";

import MapsMixin from "../mixins/maps";

import { defaultGoogleMapConfig } from "../utils/googlemaps/constants";
export default {
  name: "QGmaps",
  mixins: [MapsMixin],
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
    const accessToken = this.$config.accessToken || this.setup.accessToken;

    if (!accessToken) {
      throw new Error("Access token isn't defined");
    }

    // filter markers from slot
    if (this.$slots.default && this.$slots.default.length > 0)
      this._hasMarkers(this.$slots.default);

    const loader = new Loader({
      apiKey: accessToken,
    });

    loader.load().then(() => {
      const map = new google.maps.Map(this.setup.container, {
        ...this.setup,
      });
      this.map = map;
    });
  },
};
