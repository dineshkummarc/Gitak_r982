jsx3.lang.Package.definePackage(
  "eg.service",                //the full name of the package to create
  function(service) {          //name the argument of this function
    // declare global variable
   // service.count;
  /**
     * Call this method to split the CDF by Mapper. Added parameter objServer passed in
     * by the button Execute event with (this.getServer())
     */
     service.splitViaMap = function(objServer) {
        var objService = objServer.loadResource("split_rule1_xml");
	var doc = objServer.loadResource("source_xml"); 
	objService.setInboundDocument(doc);
	objService.doInboundMap();
	var objService2 = objServer.loadResource("split_rule2_xml");
	objService2.setInboundDocument(doc);
	objService2.doInboundMap();
	service.paintResults(objServer);
     }; 
    /**
     * call this method to split the CDF by JavaScript
     */
    service.splitViaScript = function(objServer) {
      //get source doc from cache
      var objXML =  objServer.getCache().getDocument("source_xml");
      //create two new documents to hold the contents
      var objD1 = jsx3.xml.CDF.newDocument();
      var objR1 = objD1.getRootNode();
      var objD2 = jsx3.xml.CDF.newDocument();
      var objR2 = objD2.getRootNode();
      
   //query for all nodes; loop to split
       
      var objNodes = objXML.selectNodes("//record");
      for(var i=0;i<objNodes.getLength();i++) {
        //get node for the iteration
        var objNode = objNodes.getItem(i);
        //clone the node
        var objClone = objNode.cloneNode(true);
        //append the cloned node
        if(objNode.getAttribute("size") == "Large") {
          objR1.appendChild(objClone);
        } else {
          objR2.appendChild(objClone);
        }
      }
      //add the documents to the cache
      objServer.getCache().setDocument("result1_xml",objD1);
      objServer.getCache().setDocument("result2_xml",objD2);
      service.paintResults(objServer);
    };
    /**
     * call this method to split the CDF by XSLT
     */
    service.splitViaXSLT = function(objServer) {
      //open source documents
      var objXML =  objServer.getCache().openDocument(objServer.resolveURI("xml/source.xml"));
      var objXSL =  objServer.getCache().openDocument(objServer.resolveURI("xsl/split.xsl"));
    /* Deprecated "Processor" class
     *      //create the processor and convert using two different parameter sets
     *	      var objProcessor = new jsx3.xml.Processor(objXML, objXSL);
     *      objProcessor.setParams({size:"Large"});
     *      var strD1 = objProcessor.transform();
     *      var objProcessor2 = new jsx3.xml.Processor(objXML, objXSL);
     *   objProcessor2.setParams({size:"Medium"});
     *    var strD2 = objProcessor2.transform();
     */
	  
    // create template and convert using different parameter sets
	var objTemplate1 = new jsx3.xml.Template(objXSL);
        objTemplate1.setParams({size:"Large"});
        var strD1 = objTemplate1.transform(objXML);
 
	  
	var objTemplate2 = new jsx3.xml.Template(objXSL);
        var strD2 = objTemplate2.transform(objXML);  //no need to set param, since split.xsl already uses size "Medium"
	  
      //convert the result strings to parsed documents
      var objD1 = new jsx3.xml.Document();
      objD1.loadXML(strD1);
      var objD2 = new jsx3.xml.Document();
      objD2.loadXML(strD2);
      //add the documents to the cache
      objServer.getCache().setDocument("result1_xml",objD1);
      objServer.getCache().setDocument("result2_xml",objD2);
      service.paintResults(objServer);
    };
    /**
     * empty the results displayed on screen and remove the results documents from cache
     */
    service.clearResults = function(objServer) {
      // empty the two cache documents
      objServer.getJSXByName("xblkOutput1Pane").clearXmlData()
      objServer.getJSXByName("xblkOutput2Pane").clearXmlData()
      //repaint the onscreen view
      objServer.getJSXByName("xblkOutput1Pane").repaint();
      objServer.getJSXByName("xblkOutput2Pane").repaint();
      //remove the 2 (empty) cache documents from the Local Data cache
      //this is just for appearance
      objServer.Cache.clearById("result1_xml");
      objServer.Cache.clearById("result2_xml");
      service.paintResults(objServer);
    };
    /**
     * paint the two resulting CDF documents in the relevant blockX components
     */
    service.paintResults = function(objServer) {
      //repaint the onscreen view
      objServer.getJSXByName("xblkOutput1Pane").repaint();
      objServer.getJSXByName("xblkOutput2Pane").repaint();
    };
  }
);