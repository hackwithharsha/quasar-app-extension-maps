import { QBtn } from 'quasar'

export default {
  name: 'QCustomBtn',

  render (h) {
    return h(QBtn, {
      staticClass: 'QMaps',
      props: {
        label: 'Custom Btn',
        color: 'primary'
      }
    })
  }
}
