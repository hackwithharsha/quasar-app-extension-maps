import Vue from "vue";
import VuePlugin, { init } from "ui"; // "ui" is aliased in quasar.conf.js

Vue.use(VuePlugin);

const options = {
  mode: "mapbox"
};

init(options, true);
