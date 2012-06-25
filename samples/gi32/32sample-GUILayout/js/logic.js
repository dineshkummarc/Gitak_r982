jsx3.lang.Package.definePackage(
  "eg.guilayout",                //the full name of the package to create
  function(guilayout) {          //name the argument of this function

     /**
      * Returns the application server object which by default is the application
      * namespace as specified in Project->Deployment Options.
      *
      * @returns {jsx3.app.Server} the application server object.
      */
     guilayout.getServer = function() {
       // should be the same as namespace in Project -> Deployment Options
       return sampleGUILayoutNS; 
     };

    /**
     * Load componets at runtime on to a pane.
     * @param componentURL {String} relative path of canvas/component URL.
     */    
     guilayout.loadCanvas = function (componentURL){
         var contentPane = guilayout.getServer().getJSXByName('blkContentPane');
         //unload the existing canvas
         contentPane.removeChildren();
         contentPane.load(componentURL, true);   
     }

});