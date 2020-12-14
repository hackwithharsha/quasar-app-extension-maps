import Vue from "vue";
import QMaps from "@sourcesync/quasar-ui-maps"; // "@sourcesync/quasar-ui-maps" is aliased in quasar.conf.js

// Vue.use(QMaps, {
//   mode: "gmaps",
//   accessToken: "pk.eyJ1Ijoic29mdHJhdyIsImEiOiJjazZzdTR4OW4wajF4M29udnZxMGxseXozIn0.YoK-b6rkj9Nw0zkWzvD0Xg"
// });

Vue.use(QMaps, {
  mode: "gmaps",
  accessToken: "AIzaSyBSSY_LeMoxxG0Re23ZRw7vd3PdwCSt4qI"
});
