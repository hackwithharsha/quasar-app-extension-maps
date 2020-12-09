export default (instance, mapboxgl, position = "top-left") => {
  // valid values for positions
  const validPositions = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];

  position = position.toLowerCase();

  // validate
  if (validPositions.includes(position)) {
    const controls = new mapboxgl.NavigationControl();
    instance.addControl(controls, position);
    return instance;
  } else {
    throw new Error("Invalid position provided to controls");
  }
};
