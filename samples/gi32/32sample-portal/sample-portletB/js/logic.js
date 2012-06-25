jsx3.lang.Package.definePackage(
  "eg.sampleportletB",                //the full package name
  function(portletB) {          //short package name, good to use in this file only.
  /**
   * Returns the application server object which by default is the application
   * namespace as specified in Project->Deployment Options.
   *
   * @returns {jsx3.app.Server} the application server object.
   */
   portletB.getServer = function() {
     return sampleportletB; 
   };

/**
 * Update pie chart with data from another portlet.
 * @param objPie - pie object(target for drag and drop)
 * @param objList - List object(source for Drag and drop)
 * @param strId - record id of the selected row in the list.
 */
 portletB.onPieDrop = function(objPie,objList,strId) {
  //get record node just dropped
  var objRecord = objList.getRecord(strId);
  //reset data in the pie chart and insert three new records (for the three regions)
  objPie.resetData();
  //
  objPie.insertRecord({jsxid:jsx3.CDF.getKey(),name:"West",value:objRecord.west},null,false);
  objPie.insertRecord({jsxid:jsx3.CDF.getKey(),name:"East",value:objRecord.east},null,false);
  objPie.insertRecord({jsxid:jsx3.CDF.getKey(),name:"Central",value:objRecord.central},null,false);

  //update chart title
  var objTitle = objPie.getDescendantOfName("lblChartTitle");
  objTitle.setText("Sales - " + objRecord.product);

  objPie.repaint();
}



/**  
 * Spyglass for pie chart mouseover. 
 * Displays percentage of sales contribution of a particular direction(East, West, Central) among the whole sales of a region.
 * @param objChart - pie chart object
 * @param strRecordId record of the currrent mouse position.
 */

portletB.pieSpy = function(objChart, strRecordId) {

         	var objNode = objChart.getRecordNode(strRecordId);
	var siblings = objNode.getParent().getChildNodes();	
	var sum = 0;
	var node = null;
//calculate the whole sales of East, Central, West of a selected region.
  while ((node = siblings.next()) != null) {
    sum += parseFloat(node.getAttribute('value'));
  }
	// calculate the percentage of the current direction of mouse over contributed towards whole sales.
	return "<b>" + objNode.getAttribute('name') + "</b>: " + 
			parseFloat(((100 * objNode.getAttribute('value') / sum).roundTo(0.1)).toString().substring(0,5)) + "%";
};

});