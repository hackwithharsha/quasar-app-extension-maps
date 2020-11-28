import { QBadge } from 'quasar'

export default {
  name: 'QMaps',

  render (h) {
    return h(QBadge, {
      staticClass: 'QMaps',
      props: {
        label: 'QMaps'
      }
    })
  }
}
