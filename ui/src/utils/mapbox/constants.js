const availableControls = {
  NavigationControl: "NavigationControl",
  GeolocateControl: "GeolocateControl",
  ScaleControl: "ScaleControl",
  FullscreenControl: "FullscreenControl",
};

const controlsPositions = {
  topLeft: "top-left",
  topRight: "top-right",
  bottomLeft: "bottom-left",
  bottomRight: "bottom-right",
};

const defaultMapboxConfig = {
  zoom: 4,
  center: [-95, 37], // [lng, lat]
  style: "mapbox://styles/mapbox/streets-v11",
};

const defaultMapboxMarkerConfig = {
  color: "#ff8282",
};

const defaultPopupConfig = {
  closeButton: false,
  maxWidth: "100px",
};

export {
  availableControls,
  controlsPositions,
  defaultMapboxConfig,
  defaultPopupConfig,
  defaultMapboxMarkerConfig,
};
