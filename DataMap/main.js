var data = {};

let map;

let _projection;

function InitNewDatamap(elementID) {
  map = new Datamap({
    scope: "world",
    element: document.getElementById(elementID),
    projection: "orthographic",

    geographyConfig: {
      popupOnHover: true,
      highlightOnHover: true,
      borderColor: "default",
      borderWidth: 0.5,
      popupTemplate: function (geo, data) {
        return (
          "<div class='hoverinfo'>" +
          "<div class hoverinfo-item>" +
          "<span>Hello</span>" +
          "</div>" +
          "<div class hoverinfo-item>" +
          "<span>Hello</span>" +
          "</div>" +
          "<div class hoverinfo-item>" +
          "<span>Hello</span>" +
          "</div>" +
          "</div>"
        );
      },
    },
    fills: {
      defaultFill: "rgb(42,42,42)",
    },

    responsive: true,
    data: data,

    setProjection: function (element) {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const scale = Math.min(window.innerWidth, window.innerHeight) / 4;
      const projection = d3.geo
        .orthographic()
        .scale(scale)
        .translate([width / 2, height / 2])
        .clipAngle(90)
        .precision(0.6)
        .rotate([10, -35]);

      const path = d3.geo.path().projection(projection);
      _projection = path;
      const dragBehavior = d3.behavior.drag().on("drag", function () {
        const dx = d3.event.dx;
        const dy = d3.event.dy;
        const rotation = projection.rotate();
        const radius = projection.scale();
        const scale = d3.scale
          .linear()
          .domain([-1 * radius, radius])
          .range([-90, 90]);
        const lambda = scale(dx);
        const phi = scale(dy);
        projection.rotate([rotation[0] + lambda, rotation[1] - phi]);

        map.svg.selectAll("path").attr("d", path);
      });

      d3.select(element).call(dragBehavior);

      d3.timer(function () {
        const rotation = projection.rotate();
        projection.rotate([rotation[0] + 0.11, rotation[1]]);
        map.svg.selectAll("path").attr("d", path);
      });
      return { path: path, projection: projection };
    },
  });

  window.addEventListener("resize", function () {
    map.resize();
  });

  return map;
}
