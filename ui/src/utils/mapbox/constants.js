const controlsPositions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const defaultMapboxConfig = {
  zoom: 5,
  center: [78.9629, 20.5937], // [lng, lat]
  style: "mapbox://styles/softraw/cki8h8ft60nkq19s73qmwby0o",
};

const defaultMarkerConfig = {
  color: "#ff8282",
};

const defaultPopupConfig = {
  closeButton: false,
  maxWidth: "100px",
};

export {
  controlsPositions,
  defaultMapboxConfig,
  defaultPopupConfig,
  defaultMarkerConfig,
};
