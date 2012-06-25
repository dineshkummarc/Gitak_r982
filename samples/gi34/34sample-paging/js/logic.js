jsx3.lang.Package.definePackage("eg.samplepaging", function(samplepaging) {
 // The number data records user can see at a time.
  var g_page_size = 500;
 //Maximum number of data records (large data). 
 var g_max = 25000;
/**
 * Increment value for slider scale. Slider scale ranges 0% - 100%.
 */
 var g_increment = 100 / (g_max / g_page_size);
 var g_label = "";
/**
 * Updates labels to show user the range during slider move. 
 * @param o {object} slider instance.
 * @param i {int} slider current position. Value ranges from 0 - 100. example: 20.34456
 */
 samplepaging.doIncrement = function(objJSX,i) {
  var iVal = parseInt(i / g_increment);
  if(iVal == 0) iVal = 1;
  var s = ((iVal-1)*g_page_size) + " - " + (iVal * g_page_size);
  if(g_label != s) {
    g_label = s;
    objJSX.getParent().getChild("lblRangeLabel").setText(s,true);
  }
 }
/**
  * Get url of paged file. Refer data files in xml folder. This helps
  * @param i {String) URL of the xml data file. example:xml/11.xml
  */
  samplepaging.getURLForIndex = function(i) {
    return "xml/" + (((i<10) ? "0" : "") + i) + ".xml";
  }
/**
 * Called after slide move; calls doLazyLoad() to display the paged subset.
 * @param o {object} slider instance.
 * @param i {int} slider current position. Value ranges from 0 - 100. example: 20.34456
 */
samplepaging.doMove = function (objJSX,i) {
  //move the slider to the fixed increment
  var iVal = parseInt(i / g_increment);
  if(iVal == 0) iVal = 1;
  objJSX.setValue(iVal * g_increment);
  //call function that will only query for given page when page isn't cached
  this.doLazyLoad(objJSX, samplepaging.getURLForIndex(iVal));
  //cancel the move event
  return false;
}
/**
  * Fetches the next range of documents if not already loaded. Called by doMove(); 
  * This mimics the large data server requests. 
  * @param i {String) URL of the xml data file. example:xml/11.xml.  
  */
  samplepaging.doLazyLoad = function(objJSX, strURL) {
jsx3.log("Loading: " + strURL);
    //get master XML doc used by the list
    var objDoc = objJSX.getServer().getJSXByName("mtxPagedList").getXML();
    //fetch paged subset and append to the master XML if not already loaded
    if(objDoc.selectSingleNode("//data[@jsxid='" + strURL + "']") == null) {
jsx3.log("Not in cache");
      var objSubset = new jsx3.xml.Document();
      var uri = objJSX.getServer().resolveURI(strURL);
      objSubset.load(uri); 
      var objRoot = objSubset.getRootNode();
      objRoot.setAttribute("jsxid",strURL);
      objDoc.getRootNode().appendChild(objRoot);
    }
    //reset the list to display the correct range of records
    samplepaging.renderSubset(objJSX, strURL);
jsx3.log("Done");
  }
/**
 * Update the list with latest data releated to slider movement (current Slider position - 500). This method is called by doLazyLoad();  
 * See the GI AJAX capabilities, update data on a list without refreshing the whole page.
 * @param strParentId - jsxid of XML node. example:xml/13.xml.
 *                      Open paged_list_xml in Local Data Cache.
 */
samplepaging.renderSubset=function(objJSX, strParentId) {
  var objList = objJSX.getServer().getJSXByName("mtxPagedList");
  objList.setXSLParam("jsxshallowfrom",strParentId);
  objList.repaint();
}
});