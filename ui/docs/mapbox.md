# Mapbox

> Template

```html
<QMapBox :settings="config.map">
  <template v-for="marker in markers">
    <QMarker :key="marker.id" :marker="marker" :config="config.pointer" />
  </template>
</QMapBox>
```

> Script

```js
export default {
  data() {
    return {
      config: {
        map: {
          controls: "bottom-right",
        },
        pointer: {
          marker: {
            color: "#3FB1CE",
          },
          popup: {
            closeOnClick: true,
          },
        },
      },
      markers: [
        {
          id: Date.now(),
          position: [30.5, 50.5],
          text: "This is a test marker",
        },
        {
          id: Date.now() + 1,
          position: [30.5, 50.3],
          // this doesn't have a text to render
        },
      ],
    };
  },
};
```
