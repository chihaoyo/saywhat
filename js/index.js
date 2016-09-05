// partially adapted from https://github.com/yutin1987/lyword/tree/gh-pages
var size = {w: 720, h: 300};
var fill = d3.scaleOrdinal(d3.schemeCategory20);
var layout = d3.layout.cloud()
  .size([size.w, size.h])
  .words(data.words)
  .padding(4)
  .rotate(function() { return ~~(Math.random()*2)*90; })
  .fontSize(function(d) { return d.size*2; });
var draw = function(words) {
  d3.select("#main-word-cloud").append("svg")
    .style('position', 'absolute')
    .style('width', '100%')
    .style('height', '100%')
    .append('g')
      .attr("transform", "translate(" + [layout.size()[0]/2, layout.size()[1]/2] + ")")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
};
$(function() {
  $('#main-word-cloud').width(size.w).height(size.h);
  layout.on('end', draw).start();

  var $issue_list = $('#issues > ul');
  var issues = data.issues.split('、');
  for(var issue of issues) {
    var $item = $('<li>').appendTo($issue_list);
    $('<a>').attr('href', 'issue/' + issue).text(issue).appendTo($item);
  }
})
