import { version } from "../package.json";
import init from './init/index'

import Component from "./components/Component";
import Directive from "./directives/Directive";

// Components
import CustomQBtn from "./components/CustomBtn.vue";
import MapBox from './components/MapBox.vue'

export { version, init, Component, Directive, CustomQBtn, MapBox };

export default {
  version,
  init,
  Component,
  Directive,

  install(Vue) {
    Vue.component(Component.name, Component);
    Vue.component(CustomQBtn.name, CustomQBtn);
    Vue.component(MapBox.name, MapBox);
    Vue.directive(Directive.name, Directive);
  },
};
