jsx3.lang.Package.definePackage("eg.sample_paging", function(sample_paging) {

/**
 * The number data records user can see at a time.
 */
 var g_page_size = 500;

/**
 * Maximum number of data records (large data). 
 */
 var g_max = 25000;

/**
 * Increment value for slider scale. Slider scale ranges 0% - 100%.
 */
 var g_increment = 100 / (g_max / g_page_size);

 var g_label = "";


/**
 * Returns the application server object which by default is the application
 * namespace as specified in Project->Deployment Options.
 * @returns {jsx3.app.Server} the application server object.
 */
  sample_paging.getServer = function() {
    return samplepaging32; 
  };


/**
 * Updates labels to show user the range during slider move. 
 * @p//aram o {object} slider instance.
 * @param i {int} slider current position. Value ranges from 0 - 100. example: 20.34456
 */
 sample_paging.doIncrement = function(o,i) {

  var iVal = parseInt(i / g_increment);
  if(iVal == 0) iVal = 1;

  var s = ((iVal-1)*g_page_size) + " - " + (iVal * g_page_size);
  if(g_label != s) {
    g_label = s;
    o.getParent().getChild("lblRangeLabel").setText(s,true);
  }
 }


/**
  * Get url of paged file. Refer data files in xml folder. This helps
  * @param i {String) URL of the xml data file. example:xml/11.xml
  */
  sample_paging.getURLForIndex = function(i) {
    return "xml/" + (((i<10) ? "0" : "") + i) + ".xml";
  }


/**
 * Called after slide move; calls doLazyLoad() to display the paged subset.
 * @param o {object} slider instance.
 * @param i {int} slider current position. Value ranges from 0 - 100. example: 20.34456
 */
sample_paging.doMove = function (o,i) {
  //move the slider to the fixed increment
  var iVal = parseInt(i / g_increment);
  if(iVal == 0) iVal = 1;
  o.setValue(iVal * g_increment);

  //call function that will only query for given page when page isn't cached
  sample_paging.doLazyLoad(sample_paging.getURLForIndex(iVal));

  //cancel the move event
  return false;
}

/**
  * Fetches the next range of documents if not already loaded. Called by doMove(); 
  * This mimics the large data server requests. 
  * @param i {String) URL of the xml data file. example:xml/11.xml.  
  */
  sample_paging.doLazyLoad = function(strURL) {
jsx3.log("Loading: " + strURL);
    //get master XML doc used by the list
    var objDoc = sample_paging.getServer().getJSXByName("mtxPagedList").getXML();

    //fetch paged subset and append to the master XML if not already loaded
    if(objDoc.selectSingleNode("//data[@jsxid='" + strURL + "']") == null) {
jsx3.log("Not in cache");
      var objSubset = new jsx3.xml.Document();

      var uri = sample_paging.getServer().resolveURI(strURL);

      objSubset.load(uri); 

      var objRoot = objSubset.getRootNode();
      objRoot.setAttribute("jsxid",strURL);
      objDoc.getRootNode().appendChild(objRoot);
    }

    //reset the list to display the correct range of records
    sample_paging.renderSubset(strURL);
jsx3.log("Done");
  }


/**
 * Update the list with latest data releated to slider movement (current Slider position - 500). This method is called by doLazyLoad();  
 * See the GI AJAX capabilities, update data on a list without refreshing the whole page.
 * @param strParentId - jsxid of XML node. example:xml/13.xml.
 *                      Open paged_list_xml in Local Data Cache.
 */
sample_paging.renderSubset=function(strParentId) {
  var objList = sample_paging.getServer().getJSXByName("mtxPagedList");
  objList.setXSLParam("jsxshallowfrom",strParentId);
  objList.repaint();
}


});