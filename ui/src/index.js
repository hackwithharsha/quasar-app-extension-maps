import { version } from "../package.json";

// Components
import { MapBox, Marker } from "./components";

export { version, MapBox, Marker };

export default {
  version,

  install(Vue) {
    Vue.component(MapBox.name, MapBox);
    Vue.component(Marker.name, Marker);
  },
};
