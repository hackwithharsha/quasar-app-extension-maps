import { MAPBOX_ACCESS_TOKEN } from "../../.env";
import { log } from "../utils/debug";

export default {
  name: "MapBoxMixin",
  data() {
    return {
      access_token: MAPBOX_ACCESS_TOKEN,
      mapbox: null,
    };
  },
  props: {
    settings: {
      type: Object,
      required: false,
    },
  },
  computed: {
    defaultSetup() {
      let config = {
        zoom: 9, // default zoom level
        center: [-74.5, 40],
        style: "mapbox://styles/mapbox/streets-v11",
        ...this.settings,
      };
      // check if props.settings exists
      return config;
    },
  },
  created() {
    // check if mapboxgl exists
    const { mapboxgl } = window;

    if (!mapboxgl || Number.parseFloat(mapboxgl.version) <= 1) {
      throw new Error("mapbox-gl loading failed!");
    }

    log("Mapbox-gl", "Sucessfully loaded.");

    // setup accessToken for mapbox
    mapboxgl.accessToken = this.access_token;

    // checks untill #q-map exists
    const mapSearchInterval = setInterval(() => {
      const el = document.querySelector("#q-map");
      if (el) {
        // clear interval on finding the element
        clearInterval(mapSearchInterval);

        // setup mapbox instance
        const map = new mapboxgl.Map({
          container: el.id,
          ...this.defaultSetup,
        });

        // TODO: add customizations for controls and other customization options separately 
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, "top-right");
        this.mapbox = map;
      }
    });
  },
};
