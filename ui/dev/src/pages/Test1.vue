<template>
  <q-page>
    <QMapBox :settings="config.map">
      <template v-for="marker in markers">
        <QMarker :key="marker.id" :marker="marker" />
      </template>
    </QMapBox>
  </q-page>
</template>
<script>
export default {
  name: "test1",
  data() {
    return {
      /*
        config = {
          map: {
            controls: "bottom-right"
          }
          marker: {
            color: "#3FB1CE",
          },
          popup: {
            closeOnClick: true,
          },
        };
      */
      config: {
        map: {
          controls: "bottom-right"
        }
      },
      markers: [
        {
          id: Date.now(),
          position: [30.5, 50.5],
          text: "This is a test marker"
        },
        {
          id: Date.now() + 1,
          position: [30.5, 50.3]
          // this doesn't have a text to render
        }
      ]
    };
  }
};
</script>
