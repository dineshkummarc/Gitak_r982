jsx3.lang.Package.definePackage(
  "eg.wsdl2",                //the full name of the package to create
  function(wsdl2) {          //name the argument of this function
   /**
    * Executes the service mapping and subscribes functions to events.
    * call this method to begin the service call (eg.wsdl2.callGetHistoricalQuotes();)
    */
    wsdl2.callGetHistoricalQuotes = function() {
      // Executes the service mapping 
      var objService = sampleWSDL2Mapping.loadResource("sampleGetHistoricalQuotes_xml");
      objService.setOperation("GetHistoricalQuotes");
      objService.setEndpointURL(eg.wsdl2.proxy.convertURI(objService.getEndpointURL()));

      //subscribe and call
      objService.subscribe(jsx3.net.Service.ON_SUCCESS, wsdl2.onGetHistoricalQuotesSuccess);
      objService.subscribe(jsx3.net.Service.ON_ERROR, wsdl2.onGetHistoricalQuotesError);
      objService.subscribe(jsx3.net.Service.ON_INVALID, wsdl2.onGetHistoricalQuotesInvalid);
      objService.doCall();
    };
   /**
    * {String} stores the feedback from the web service.
    */
    wsdl2.wsOutcome = "Success";
   /**
    * {String} stores the message sent from the web service if an error occurs.
    */
    wsdl2.wsMessage = "Error";
   /**
    * Repaints the grid control after successful web service call.
    *
    * @param objEvent {String} static field event type for successful response.
    */
    wsdl2.onGetHistoricalQuotesSuccess = function(objEvent) {
       if ( wsdl2.wsOutcome == "Success") {
         sampleWSDL2Mapping.getJSXByName("mtxResultsTable").repaint();
         sampleWSDL2Mapping.alert("Success","The service call was successful.");
       }
       else {
         // An error was sent from the web service.
         sampleWSDL2Mapping.alert("Web Service Error: " + wsdl2.wsOutcome, "The web service sent the following error message: <br/><br/>" + wsdl2.wsMessage, null, "Close", {width:350, height:200});
       }
    };
   /**
    * Creates an alert box with HTTP status code on failed service call attempt.
    *
    * @param objEvent {String} static field event type for unsuccessful response.
    */
    wsdl2.onGetHistoricalQuotesError = function(objEvent) {
      var myStatus = objEvent.target.getRequest().getStatus();
      sampleWSDL2Mapping.alert("Error","The service call failed. The HTTP Status code is: " + myStatus);
    };
   /**
    * Creates an alert box if one or more restrictions fails during message generation.
    *
    * @param objEvent {String} static field event type for message generation.
    */
    wsdl2.onGetHistoricalQuotesInvalid = function(objEvent) {
      sampleWSDL2Mapping.alert("Invalid","The following message node just failed validation:\n\n" + objEvent.message);  
    };
  }
);