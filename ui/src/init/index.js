const config = require("./_config");

export default (() => {
  let isApiSetUp = false;
  return (options, loadCDN) => {
    if (typeof document === "undefined") {
      //   do nothing if run from server side
      return;
    }

    if (!isApiSetUp) {
      const mapScript = document.createElement("script");
      const mapStyle = document.createElement("link");

      // requires options to be an object to support more config options
      if (typeof options !== "object") {
        throw new Error("Options must be an Object");
      }

      if (!options.mode && typeof options.mode !== "string") {
        throw new Error("Options mode is not defined.");
      }

      // Supported modes
      const _supportedModes = ["mapbox", "gmaps"];

      if (_supportedModes.indexOf(options.mode.toLowerCase()) === -1) {
        throw new Error(
          `${
            options.mode
          } isn\'t supported. Supported modes: ${_supportedModes.join(", ")}`
        );
      }

      options.callback = "quasarMapsInit";
      const { mapbox } = config;

      switch (options.mode.toLowerCase()) {
        case _supportedModes[0]:
          mapScript.setAttribute("src", mapbox.script);
          mapStyle.setAttribute("href", mapbox.style);
          break;
      }

      // setup common scripts and css properties
      mapStyle.setAttribute("rel", "stylesheet");
      mapScript.setAttribute("defer", "");
      mapScript.setAttribute("async", "");

      // append to document
      document.head.appendChild(mapStyle);
      document.body.appendChild(mapScript);

      // setup global variable for easy access
      window.maps = {
        mode: options.mode.toLowerCase(),
      };

      // api has been setup
      isApiSetUp = true;
    }
  };
})();

// script for mapbox and google maps
