jsx3.lang.Package.definePackage(
  "eg.sampleportletA",                //the full package name
  function(portletA) {          //short package name, good to use in this file only.
  /**
   * Returns the application server object which by default is the application
   * namespace as specified in Project->Deployment Options.
   *
   * @returns {jsx3.app.Server} the application server object.
   */
   portletA.getServer = function() {
     // should be the same as namespace in Project -> Deployment Options
     return sampleportletA; 
   };


 /**
  * This method calls onPieDrop method on another portlet(sampleportletB), which causes
  * pie chart on other portlet repainted with the selected region in the list.
  * See usage of packages. Reusing the javascript methods defined in other packages.
  */
 portletA.showPie = function() {
  var targetPieChart = eg.sampleportletB.getServer().getJSXByName("chrtPieChart");
  var sourceGridSales = sampleportletA.getServer().getJSXByName("listWidgetList");
  var productSelected = sourceGridSales.getValue();
  // call onPieDrop method defined in eg.sampleportletB
  eg.sampleportletB.onPieDrop(targetPieChart, sourceGridSales, productSelected ); 
}

});