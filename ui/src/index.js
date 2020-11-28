import { version } from '../package.json'

import Component from './components/Component'
import Directive from './directives/Directive'

// Components
import CustomQBtn from './components/CustomBtn.js'

export {
  version,

  Component,
  Directive,

  CustomQBtn
}

export default {
  version,

  Component,
  Directive,

  install (Vue) {
    Vue.component(Component.name, Component)
    Vue.component(CustomQBtn.name, CustomQBtn)
    Vue.directive(Directive.name, Directive)

  }
}
