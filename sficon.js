function SFIcon(svgId, x, y, size) {
  var g = d3.select(svgId).append("g")
    .attr("visibility", "inherit")
    .attr("stroke-width", 0)
    .attr("fill", "#aaccdd")
    .attr("stroke", "#3377bb");
  this.g = g;

  this.rect = g.append("rect");

  var path = g.append("path").attr("fill", "none");
  this.path = path;

  this.moveTo(x, y, size);

  g.on("click", function () {
    var totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", 0);

    path.transition()
      .duration(500)
      .ease("linear")
      .attr("stroke-dashoffset", totalLength)
      .each("end", function () {
        path.transition()
          .duration(500)
          .ease("linear")
          .attr("stroke-dashoffset", 0);
      });
  });
}

SFIcon.prototype.moveTo = function (x, y, size) {
  this.x = x;
  this.y = y;
  this.rect
    .attr("x", x)
    .attr("y", y);
  this.resize('undefined' === typeof size ? this.size : size);
};

SFIcon.prototype.resize = function (size) {
  this.size = size;
  var scale = size / 64;

  // Strokes to write SF
  var sf = [[48, 0], [48, 16], [12, 16], [12, 32],
            [40, 32], [40, 48], [18, 48], [18, 64]];

  // Place and scale SF stroke
  for (var i=0; i < sf.length; i++) {
    sf[i][0] = this.x + sf[i][0] * scale;
    sf[i][1] = this.y + sf[i][1] * scale;
  }

  this.rect
    .attr("height", size)
    .attr("width", size)
    .attr("rx", 2 * scale)
    .attr("ry", 2 * scale);

  var line = d3.svg.line()
    .x(function(d, i) {
      return d[0];
    })
    .y(function(d) {
      return d[1];
    });

  this.path
    .attr("d", line(sf))
    .attr("stroke-width", 4 * scale);
};

SFIcon.prototype.show = function () {
  this.g.attr("visibility", "visible");
};

SFIcon.prototype.hide = function () {
  this.g.attr("visibility", "hidden");
};
