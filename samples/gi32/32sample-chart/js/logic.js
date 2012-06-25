/**
 * Package defining the logic of sample application "32sample-chart".
 */
jsx3.Package.definePackage("eg.chart", function(chart) {
  
  /**
   * {Array<String>} the first letters of the days of the week, Sunday to Saturday.
   */
  chart.DAYS = ['S','M','T','W','R','F','S'];

  chart.getServer = function() {
    return eg.chart.APP;
  };

  /**
   * Returns the first letter of the day of week of a date in May 2005.
   * @param x {int} a day (0-31) in May 2005.
   * @returns {String} 
   */
  chart.dayOfWeek = function(x) {
    var date = new Date(2005,4,x);
    var day = date.getUTCDay();
    return chart.DAYS[day];
  };
  
  /**
   * Formats a number as a dollar amount.
   * @param x {Number} the floating point dollar amount.
   * @returns {String} the formatted dollar, <code>$d.dd</code>.
   */
  chart.dollarAmount = function(x) {
    if (x == 0) return "";
    var nudge = (x + 0.0001).toString();
    var index = nudge.indexOf(".");
    return "$" + nudge.substring(0, index+3);
  };

  /**
   * A series coloring function that uses the color attribute of a CDF record to create an RGB color.
   * @param record {jsx3.xml.Entity} the CDF record.
   * @param intIndex {int}
   * @returns {jsx3.vector.Fill}
   */
  chart.pieColoring = function(record, intIndex) { 
    return new jsx3.vector.Fill(record.getAttribute('color'));
  };
  
  /**
   * Model event handler, fills in the data in the minorCategory chart depending on what was clicked in the
   * majorCategory chart.
   * @param objChart {jsx3.chart.Chart} the majorCategory chart (target of the model event).
   * @param strRecordId {String} the record id of the clicked record.
   */
  chart.doDrillDown = function(objChart, strRecordId) {
    if (strRecordId == null) return;
    
    var objMinorChart = objChart.getServer().getJSXByName('chrtMinorCategories');
    objMinorChart.resetData();
  
    var objNode = objChart.getRecordNode(strRecordId);
    var childNodes = objNode.getChildNodes();
    var node = null;
    while ((node = childNodes.next()) != null) {
      objMinorChart.insertRecordNode(node.cloneNode(), 'jsxroot', false);
    }
  
    objMinorChart.repaint();
  };
  
  /**
   * Model event handler, creates a spy glass span for a pie slice in either the majorCategory or
   * minorCategory charts.
   * @param objChart {jsx3.chart.Chart} the chart that was spied.
   * @param strRecordId {String} the record id of the spied record.
   */
  chart.pieSpy = function(objChart, strRecordId) {
    var objNode = objChart.getRecordNode(strRecordId);
    var siblings = objNode.getParent().getChildNodes();
    
    var sum = 0;
    var node = null;
    while ((node = siblings.next()) != null) {
      sum += parseFloat(node.getAttribute('jsxvalue'));
    }
    
    return "<b>" + objNode.getAttribute('jsxtext') + "</b>: " + 
        parseFloat(((100 * objNode.getAttribute('jsxvalue') / sum).roundTo(0.1)).toString().substring(0,5)) + "%";
  };
  
  /**
   * Model event handler, creates a spy glass span for a legend entry in either the majorCategory or
   * minorCategory charts.
   * @param objChart {jsx3.chart.Chart} the chart containing the legend that was spied.
   * @param strRecordId {String} the record id of the spied record.
   */
  chart.legendSpy = function(objChart, strRecordId) {
    if (strRecordId == null) return;
    
    var objNode = objChart.getRecordNode(strRecordId);
    var strHTML = "Including: ";
    
    var childNodes = objNode.getChildNodes();
    for (var i = 0; i < childNodes.getLength(); i++) {
      var child = childNodes.getItem(i);
      if (i > 0) strHTML += ", ";
      strHTML += "<b><span style='color:" + child.getAttribute('color') + ";'>" + child.getAttribute('jsxtext') + "</span></b>";
    }
    
    return strHTML;
  };

  /**
   * A series coloring function that creates a color between yellow and red and a opacity between 0 and 100 
   * based on the x and y attributes.
   * @param record {jsx3.xml.Entity} the CDF record.
   * @param intIndex {int}
   * @returns {jsx3.vector.Fill}
   */
  chart.pointColoring = function(record, intIndex) {
    var parentRecord = record.getParent();
    var xratio = record.getAttribute('x') / parentRecord.getAttribute('xmax');
    var yratio = record.getAttribute('y') / parentRecord.getAttribute('ymax');
    var rgb = (255 << 16) + (Math.round(255 * (1 - yratio)) << 8);
    var opacity = xratio;
    // the undocumented signature of the constructor of jsx3.vector.Fill is:
    //   init( rgb : {int|String}, opacity : Number[0.0-1.0] )
    return new jsx3.vector.Fill(rgb, opacity);
  };
  
  /**
   * Model event handler, changes the point renderer of the target data series when the point renderer selection
   * menu executes.
   * @param objChart {jsx3.gui.Menu} the point renderer selection menu.
   * @param strRecordId {String} the record id of the executed record, the name of the static field of PointRenderer
   *    to use as a point renderer.
   */
  chart.pointTypeSelect = function(objMenu, strRecordId) {
    var objSeries = objMenu.getContextParent();
    var objChart = objSeries.getChart();
    objSeries.setRenderer("jsx3.chart.PointRenderer." + strRecordId);
    objSeries.repaint();
    objChart.getLegend().repaint(); // repaint legend because legend uses the point renderer
    objMenu.selectItem(strRecordId, true); // so the executed record will show up as selected next time the menu shows
  };

  /**
   * Clear work area
   *
   * @param workArea {jsx3.app.Model} � the JSX object to be cleared.
   * @param objJSX {jsx3.app.Server}  (target of the model event).
   */
  chart.clearWorkArea = function() {
       chart.getServer().getJSXByName("blkWorkPane").removeChildren();
  }

 /**                                       
  * Launches stock price chart. 
  * @param objJSX {jsx3.app.Model} target of the model event.
  */
  chart.launchStockPrice = function() {
    chart.clearWorkArea();
    chart.getServer().getJSXByName("blkWorkPane").load("components/stockPrice.xml");  
  }

 /**                                       
  * Launches a event chart.
  * @param objJSX {jsx3.app.Model} target of the model event.
  */
 chart.launchChartEvent = function() {
    chart.clearWorkArea();
    chart.getServer().getJSXByName("blkWorkPane").load("components/chartEvents.xml");  
  }

 /**                                       
  * Launches bubble chart.
  * @param objJSX {jsx3.app.Model} target of the model event.
  */
  chart.launchBubble = function() {
    chart.clearWorkArea();
    chart.getServer().getJSXByName("blkWorkPane").load("components/pointColoring.xml");  
  }
  
});
