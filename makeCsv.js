var data = require("./src/js/blocks2.geo.json");

var columns = Object.keys(data.features[0].properties);

var mapped = data.features.map(function(row) {
  return columns.map(function(col) {
    return row.properties[col];
  }).join(",");
});

var csv = columns.join(",") + "\n" + mapped.join("\n");

var fs = require("fs");

fs.writeFileSync("blocks.csv", csv);