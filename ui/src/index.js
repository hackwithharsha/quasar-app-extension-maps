import Vue from "vue";
import { version } from "../package.json";
import init from "./init/index";

import Component from "./components/Component";
import Directive from "./directives/Directive";

// Components
import MapBox from "./components/MapBox.vue";
import Marker from "./components/Marker.vue";

const $bus = new Vue();

export { version, init, Component, Directive, MapBox, Marker, $bus };

export default {
  version,
  init,
  Component,
  Directive,

  install(Vue) {
    Vue.component(Component.name, Component);
    Vue.component(MapBox.name, MapBox);
    Vue.component(Marker.name, Marker);

    Vue.directive(Directive.name, Directive);
  },
};
