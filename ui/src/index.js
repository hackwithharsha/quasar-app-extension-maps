import { version } from "../package.json";

// Components
import { MapBox, Marker, GMaps } from "./components";
export { version, MapBox, GMaps, Marker };

export default {
  version,

  install(Vue, config) {
    Vue.prototype.$qMapconfig = config;

    Vue.component(MapBox.name, MapBox);
    Vue.component(GMaps.name, GMaps);
    Vue.component(Marker.name, Marker);
  },
};
