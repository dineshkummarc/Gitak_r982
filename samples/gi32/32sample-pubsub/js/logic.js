jsx3.lang.Package.definePackage(
  "eg.pubsub",                //the full package name
  function(pubsub) {          //short package name, good to use in this file only.

// create logger to log messages for this application
 pubsub.logger = jsx3.util.Logger.getLogger("samplepubsubNSLog");



/* Global to count number of subscriptions*/
  pubsub.subscriber_count = 0;

  /**
   * Returns the application server object which by default is the application
   * namespace as specified in Project->Deployment Options.
   *
   * @returns {jsx3.app.Server} the application server object.
   */
   pubsub.getServer = function() {
     return samplepubsubNS; 
   };

    //......here is yet another

  //create an object;
  var eg = new Object();
  //create a callback function and set as a field
  eg.myCallback = function(e) {
    var msg = e.code.escapeHTML();
    pubsub.getServer().alert("Event Received", msg, null, "OK", null);
  }
  //subscribe the function to the mr_subject topic
  //samplepubsub.subscribe("mr_subject",eg,"myCallback");



  //.....here is yet another way to subscribe....

  //create a callback function
  pubsub.myCallback = function(e) {
    var msg = e.code.escapeHTML();
    pubsub.getServer().alert("Event Received", msg, null, "OK", null);
  }
  //subscribe the function to the mr_subject topic
  //pubsub.getServer().subscribe("mr_subject",pubsub.myCallback);


  
});