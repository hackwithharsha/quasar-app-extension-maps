import Vue from "vue";

// testing purposes only
import { GMAPS_API, MAPBOX_API } from "../env";

import QMaps from "@sourcesync/quasar-ui-maps"; // "@sourcesync/quasar-ui-maps" is aliased in quasar.conf.js

// Vue.use(QMaps, {
//   mode: "mapbox",
//   accessToken: MAPBOX_API
// });

Vue.use(QMaps, {
  mode: "gmaps",
  accessToken: GMAPS_API
});
