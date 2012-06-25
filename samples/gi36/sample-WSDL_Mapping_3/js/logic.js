jsx3.lang.Package.definePackage(
  "eg.wsdl3",                //the full name of the package to create
  function(wsdl3) {          //name the argument of this function

  wsdl3.qService;

   
   /**
    * Executes the first service mapping and subscribes functions to events.
    * Call this method to begin the service call (eg.wsdl3.callGetHistoricalQuotes();)
    */  
    //call this method to begin the service call (eg.service.callGetHistoricalQuotes();)

    wsdl3.callGetHistoricalQuotes = function() {
      wsdl3.qService.setMode(eg.wsdl3.APP.getJSXByName("radLive").getSelected());

      wsdl3.qService.doCall();
    };

    /**
     * {String} stores the feedback from the web service.
     */
     wsdl3.wsOutcome = "Success";

    /**
     * {String} stores the message sent from the web service if an error occurs.
     */
     wsdl3.wsMessage = "Error";

    /**
     * Repaints the list control after successful web service call.
     *
     * @param objEvent {String} static field event type for successful response.
     */
    wsdl3.onGetHistoricalQuotesSuccess = function(objEvent) {
      //var responseXML = objEvent.target.getInboundDocument();
 
       if (wsdl3.wsOutcome == "Success") {
          wsdl3.APP.getJSXByName("mtxResultsList").repaint();
          wsdl3.APP.alert("Success","The service call was successful.");
       }
        else {
         // An error was sent from the web service.
          wsdl3.APP.alert("Web Service Error: " + wsdl3.wsOutcome, "The web service sent the following error message: <br/><br/>" + wsdl3.wsMessage, null, "Close", {width:350, height:200});

       }

    };

    /**
    * Calls an alert with HTTP status code on failed service call attempt.
    *
    * @param objEvent {String} static field event type for unsuccessful response.
    */

    wsdl3.onGetHistoricalQuotesError = function(objEvent) {
      var myStatus = objEvent.target.getRequest().getStatus();
      objEvent.target.getServer().alert("Error","The service call failed. The HTTP Status code is: " + myStatus);
    };

   /**
    * Creates an alert box if one or more restrictions fails during message generation.
    *
    * @param objEvent {String} static field event type for message generation.
    */
    wsdl3.onGetHistoricalQuotesInvalid = function(objEvent) {
      objEvent.target.getServer().alert("Invalid","The following message node just failed validation:\n\n" + objEvent.message);
    };

    wsdl3.dlgTop=100;
    wsdl3.dlgLeft=0;
   /**
    * Executes the second service mapping and subscribes functions to events.
    */
    wsdl3.callGetLastClosingPrice = function() {

      // Support for Static mode
      wsdl3.lService.setMode(eg.wsdl3.APP.getJSXByName("radLive").getSelected());

      // moved out from onBeforeSend -- modified for 34sample
      var caption = "Today's closing price for: ";
      var root = eg.wsdl3.APP.getBodyBlock();

      var dialog = root.loadXML(wsdl3.APP.getCache().getDocument("dialogClosingPrice_xml"),false);
      wsdl3.dlgTop+=10;
      wsdl3.dlgLeft+=10;
      dialog.setTop(wsdl3.dlgTop).setLeft(wsdl3.dlgLeft);
      dialog.getCaptionBar().setText(caption + eg.wsdl3.getComplexValue(),true);
      root.paintChild(dialog);

      wsdl3.lService.doCall();
    };
    
  /**
   * Does nothing after successful web service call.
   *
   * @param objEvent {String} static field event type for successful response.
   */
     wsdl3.onGetLastClosingPriceSuccess = function(objEvent) {
       // Nothing interesting happens in this code, the interesting bits are in the
       // onBeforeSend of the Input operation of the sampleGetLastClosingPrice mapping rule.
    };

  /**
   * Calls an alert with HTTP status code on failed service call attempt.
   *
   * @param objEvent {String} static field event type for unsuccessful response.
   */
    wsdl3.onGetLastClosingPriceError = function(objEvent) {
      var myStatus = objEvent.target.getRequest().getStatus();
      wsdl3.APP.alert("Error","The service call failed. The HTTP Status code is: " + myStatus);
    };

   /**
    * Creates an alert box if one or more restrictions fails during message generation.
    *
    * @param objEvent {String} static field event type for message generation.
    */   
    wsdl3.onGetLastClosingPriceInvalid = function(objEvent) {
     wsdl3.APP.alert("Invalid","The following message node just failed validation:\n\n" + objEvent.message);
    };

  /**
   * Returns the ticker symbol of the selected security from the list object.
   *
   * @returns {String} the selected stock symbol.
   */
  wsdl3.getComplexValue = function() {

    var objList = wsdl3.APP.getJSXByName("mtxResultsList");
    var objRecord = objList.getRecord(objList.getValue());
    var securityNode;
    if (objRecord.Security)
        securityNode = objRecord.Security;
    return  securityNode;
  };

   wsdl3.init = function () {
      wsdl3.dlgDoc = eg.wsdl3.APP.getCache().getOrOpenAsync(eg.wsdl3.APP.resolveURI("components/dialogClosingPrice.xml"), "dialogClosingPrice_xml");
      var objService = eg.wsdl3.APP.loadResource("sampleGetHistoricalQuotes_xml");

      // set run mode with live data or static reponse      
      objService.setInboundURL('messages/sampleResponse.xml');
      objService.setOperationName("GetHistoricalQuotes");
      objService.setEndpointURL(eg.wsdl3.proxy.convertURI(objService.getEndpointURL()));

      objService.compile();
      //subscribe and call
      objService.subscribe(jsx3.net.Service.ON_SUCCESS, eg.wsdl3.onGetHistoricalQuotesSuccess);
      objService.subscribe(jsx3.net.Service.ON_ERROR, eg.wsdl3.onGetHistoricalQuotesError);
      objService.subscribe(jsx3.net.Service.ON_INVALID, eg.wsdl3.onGetHistoricalQuotesInvalid);
       wsdl3.qService = objService;
       
      var objService2 = eg.wsdl3.APP.loadResource("sampleGetLastClosingPrice_xml");
      objService2.setOperation("GetLastClosingPrice");
      objService2.setEndpointURL(eg.wsdl3.proxy.convertURI(objService.getEndpointURL()));

      //subscribe and call
      objService2.subscribe(jsx3.net.Service.ON_SUCCESS, wsdl3.onGetLastClosingPriceSuccess);
      objService2.subscribe(jsx3.net.Service.ON_ERROR, wsdl3.onGetLastClosingPriceError);
      objService2.subscribe(jsx3.net.Service.ON_INVALID, wsdl3.onGetLastClosingPriceInvalid);
      wsdl3.lService = objService2;
   };

  }
);

