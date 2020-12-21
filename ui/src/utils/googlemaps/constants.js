const defaultGoogleMapConfig = {
  zoom: 5,
  center: { lng: -95, lat: 37 },
  disableDefaultUI: true,
};

const defaultGMapsMarkerConfig = {
  icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ddd'
};

export { defaultGoogleMapConfig, defaultGMapsMarkerConfig };

export default {
  defaultGoogleMapConfig,
  defaultGMapsMarkerConfig,
};
