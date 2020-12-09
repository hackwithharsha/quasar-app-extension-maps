import Vue from "vue";
import find from "../../utils/find";
export default {
  name: "controls",
  inserted(el) {
    const maps = find("maps", window);
    const { mode, loaded, instance } = maps;
    // const mapbox = find("$mapbox", window);

    // console.log(mapbox);
    const { mapboxgl } = window;

    console.log(mode, loaded, instance);
    if (!loaded) return false;
    // console.log(mode, loaded);
    if (mode === "mapbox") {
      const controls = new mapboxgl.NavigationControl();
      instance.addControl(controls, "top-right");
    }
  },
};
