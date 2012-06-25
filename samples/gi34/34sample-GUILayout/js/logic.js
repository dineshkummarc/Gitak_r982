jsx3.lang.Package.definePackage(
  "eg.guilayout",                //the full name of the package to create
  function(guilayout) {          //name the argument of this function
  
    guilayout.APP;
    
    /**
     * Load componets at runtime on to a pane.
     * @param componentURL {String} relative path of canvas/component URL.
     */    
     guilayout.loadCanvas = function (objJSX, componentURL){
         var contentPane = objJSX.getServer().getJSXByName('blkContentPane');
         //unload the existing canvas
         contentPane.removeChildren();
         contentPane.load(componentURL, true);   
     }
});