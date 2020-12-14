import Vue from "vue";
import { Loader } from "../utils/googlemaps";

export default {
  name: "QGmaps",
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      gmaps: null,
      mode: "gmaps",
    };
  },
  provide() {
    const self = this;
    return {
      get map() {
        return self.gmaps;
      },
      get mode() {
        return self.mode;
      },
    };
  },
  computed: {
    staticClass() {
      return "q-map";
    },
    setup() {
      return {
        container: this.$refs.container,
        zoom: 9,
        center: { lat: 30.5, lng: 50.5 },
        disableDefaultUI: true,
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

    const loader = new Loader({
      apiKey: accessToken,
    });

    loader.load().then(() => {
      const maps = new google.maps.Map(this.setup.container, {
        ...this.setup,
      });
      this.gmaps = maps;
      Vue.prototype.$maps = this.gmaps;
    });
  },

  render(h) {
    return h(
      "div",
      {
        staticClass: this.staticClass,
        ref: "container",
      },
      [this.gmaps && this.$slots.default]
    );
  },
};
