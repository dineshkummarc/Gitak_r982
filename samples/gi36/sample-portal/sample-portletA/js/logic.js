jsx3.lang.Package.definePackage(
  "eg.portletA",                //the full package name
  function(portletA) {          //short package name, good to use in this file only.
    portletA.APP; 
    portletA.PSUBJECT = "eg.sample.portletA";
 /**
  * This method calls onPieDrop method on another portlet(sampleportletB), which causes
  * pie chart on other portlet repainted with the selected region in the list.
  * See usage of packages. Reusing the javascript methods defined in other packages.
  */
 portletA.showPie = function(productSelected) {
  
  var sourceGridSales = eg.portletA.APP.getServer().getJSXByName("listWidgetList");
  if (!productSelected)
      productSelected = sourceGridSales.getValue();
  var objRecord = sourceGridSales.getRecord(productSelected);
  if (window.PageBus) {
    window.PageBus.publish(this.PSUBJECT , objRecord);
    jsx3.log("published on "+ this.PSUBJECT +" record="+ objRecord);
  }
}
});