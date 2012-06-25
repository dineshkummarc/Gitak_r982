jsx3.lang.Package.definePackage(
  "eg.wsdl3",                //the full name of the package to create
  function(wsdl3) {          //name the argument of this function


   /**
    * Executes the first service mapping and subscribes functions to events.
    * Call this method to begin the service call (eg.wsdl3.callGetHistoricalQuotes();)
    */  
    //call this method to begin the service call (eg.service.callGetHistoricalQuotes();)
    wsdl3.callGetHistoricalQuotes = function() {
      var objService = eg.wsdl3.APP.loadResource("sampleGetHistoricalQuotes_xml");

      // set run mode with live data or static reponse      
      objService.setMode(eg.wsdl3.APP.getJSXByName("radLive").getSelected());
      objService.setInboundURL('messages/sampleResponse.xml');
      
      objService.setOperation("GetHistoricalQuotes");
      objService.setEndpointURL(eg.wsdl3.proxy.convertURI(objService.getEndpointURL()));

      //subscribe and call
      objService.subscribe(jsx3.net.Service.ON_SUCCESS, wsdl3.onGetHistoricalQuotesSuccess);
      objService.subscribe(jsx3.net.Service.ON_ERROR, wsdl3.onGetHistoricalQuotesError);
      objService.subscribe(jsx3.net.Service.ON_INVALID, wsdl3.onGetHistoricalQuotesInvalid);

      objService.doCall();
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

   /**
    * Executes the second service mapping and subscribes functions to events.
    */
    wsdl3.callGetLastClosingPrice = function() {
      var objService = eg.wsdl3.APP.loadResource("sampleGetLastClosingPrice_xml");
      objService.setOperation("GetLastClosingPrice");
      objService.setEndpointURL(eg.wsdl3.proxy.convertURI(objService.getEndpointURL()));

      // Support for Static mode
      objService.setMode(eg.wsdl3.APP.getJSXByName("radLive").getSelected());

      // moved out from onBeforeSend -- modified for 34sample
var dialog = eg.wsdl3.APP.getBodyBlock().load("components/dialogClosingPrice.xml",true); 
dialog.setWidth(300,false);
dialog.setHeight(100,true);
dialog.getCaptionBar().setText(eg.wsdl3.getComplexValue(),true);

      //subscribe and call
      objService.subscribe(jsx3.net.Service.ON_SUCCESS, wsdl3.onGetLastClosingPriceSuccess);
      objService.subscribe(jsx3.net.Service.ON_ERROR, wsdl3.onGetLastClosingPriceError);
      objService.subscribe(jsx3.net.Service.ON_INVALID, wsdl3.onGetLastClosingPriceInvalid);
      objService.doCall();
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
    var caption = "Today's closing price for: ";
    var objList = wsdl3.APP.getJSXByName("mtxResultsList");
    var objRecord = objList.getRecord(objList.getValue());
    var securityNode;
    if (objRecord.Security)
        securityNode = objRecord.Security;
    return  caption + securityNode;
  };


  }
);