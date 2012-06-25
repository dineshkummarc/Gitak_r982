jsx3.lang.Package.definePackage(
  "eg.service",                //the full name of the package to create
  function(service) {          //name the argument of this function

    // declare global variable
    service.count;


    /**
     * call this method to split the CDF by Mapping Rules
     */
    service.splitViaMap = function() {
      service.count = 0;
      var objService = samplesplittingCDF.loadResource("split_rule1_xml");
      objService.setEndpointURL(samplesplittingCDF.resolveURI("xml/source.xml"));
      objService.setOperation("");

      //subscribe and call
      objService.subscribe(jsx3.net.Service.ON_SUCCESS, service.onSuccess);
      objService.doCall();
    };

    /**
     * call this method to make sure that both service calls are complete before painting
     */
    service.onSuccess = function(objEvent) {
      //only repaint when the second call is returned
      service.count = service.count + 1;
      if(service.count > 1) service.paintResults();
      if(service.count == 1) {
         var objService2 = samplesplittingCDF.loadResource("split_rule2_xml");
         objService2.setOperation("");
         objService2.setEndpointURL(samplesplittingCDF.resolveURI("xml/source.xml"));
         objService2.subscribe(jsx3.net.Service.ON_SUCCESS, service.onSuccess);
         objService2.doCall();
      }
    };




    /**
     * call this method to split the CDF by JavaScript
     */
    service.splitViaScript = function() {
      //get source doc from cache
      var objXML =  samplesplittingCDF.getCache().getDocument("source_xml");

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
      samplesplittingCDF.getCache().setDocument("result1_xml",objD1);
      samplesplittingCDF.getCache().setDocument("result2_xml",objD2);
    };


    /**
     * call this method to split the CDF by XSLT
     */
    service.splitViaXSLT = function() {
      //open source documents
      var objXML =  samplesplittingCDF.getCache().openDocument(samplesplittingCDF.resolveURI("xml/source.xml"));
      var objXSL =  samplesplittingCDF.getCache().openDocument(samplesplittingCDF.resolveURI("xsl/split.xsl"));

      //create the processor and convert using two different parameter sets
      var objProcessor = new jsx3.xml.Processor(objXML, objXSL);
      objProcessor.setParams({size:"Large"});
      var strD1 = objProcessor.transform();
      var objProcessor2 = new jsx3.xml.Processor(objXML, objXSL);
      objProcessor2.setParams({size:"Medium"});
      var strD2 = objProcessor2.transform();

      //convert the result strings to parsed documents
      var objD1 = new jsx3.xml.Document();
      objD1.loadXML(strD1);
      var objD2 = new jsx3.xml.Document();
      objD2.loadXML(strD2);

      //add the documents to the cache
      samplesplittingCDF.getCache().setDocument("result1_xml",objD1);
      samplesplittingCDF.getCache().setDocument("result2_xml",objD2);
    };


    /**
     * empty the results displayed on screen and remove the results documents from cache
     */
    service.clearResults = function() {
      // empty the two cache documents
      samplesplittingCDF.getJSXByName("xblkOutput1Pane").clearXmlData()
      samplesplittingCDF.getJSXByName("xblkOutput2Pane").clearXmlData()

      //repaint the onscreen view
      samplesplittingCDF.getJSXByName("xblkOutput1Pane").repaint();
      samplesplittingCDF.getJSXByName("xblkOutput2Pane").repaint();

      //remove the 2 (empty) cache documents from the Local Data cache
      //this is just for appearance
      samplesplittingCDF.Cache.clearById("result1_xml");
      samplesplittingCDF.Cache.clearById("result2_xml");
    };


    /**
     * paint the two resulting CDF documents in the relevant blockX components
     */
    service.paintResults = function() {
      //repaint the onscreen view
      samplesplittingCDF.getJSXByName("xblkOutput1Pane").repaint();
      samplesplittingCDF.getJSXByName("xblkOutput2Pane").repaint();
    };



  }
);