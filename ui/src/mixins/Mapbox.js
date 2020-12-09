import Vue from "vue";

import { MAPBOX_ACCESS_TOKEN } from "../../.env";
import { log } from "../utils/debug";
import find from "../utils/find";

// utils
import { $bus } from "../index";
import addControl from "./Mapbox/controls";

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
      return {
        zoom: 9, // default zoom level
        center: [30.5, 50.5],
        style: "mapbox://styles/softraw/cki8h8ft60nkq19s73qmwby0o",
        ...this.settings,
      };
    },
  },
  created() {
    // check if mapboxgl exists
    const { mapboxgl, maps } = window;

    // TODO: loop till 1500ms, if still not available throw error
    find("mapboxgl", window);
    if (!mapboxgl || Number.parseFloat(mapboxgl.version) <= 1) {
      throw new Error("mapbox-gl loading failed!");
    }
    log(maps.mode, "Sucessfully loaded.");

    // setup accessToken for mapbox
    mapboxgl.accessToken = this.access_token;

    // checks untill #q-map exists
    const mapSearchInterval = setInterval(() => {
      const el = document.querySelector("#q-map");
      if (el) {
        // clear interval on finding the element
        clearInterval(mapSearchInterval);

        // destructure mapbox config
        const {
          defaultSetup,
          settings: { controls },
        } = this;
        // setup mapbox instance
        let map = new mapboxgl.Map({
          container: el.id,
          ...defaultSetup,
        });

        // TODO: add customizations for controls and other customization options separately
        if (controls && typeof controls === "string") {
          map = addControl(map, mapboxgl, controls);
        }

        this.mapbox = map;
      }
    });
  },
};
