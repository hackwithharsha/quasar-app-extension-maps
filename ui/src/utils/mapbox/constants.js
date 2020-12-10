const controlsPositions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const defaultMapboxConfig = {
  zoom: 9,
  center: [30.5, 50.5],
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
