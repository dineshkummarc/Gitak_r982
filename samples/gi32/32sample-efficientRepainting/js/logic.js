jsx3.lang.Package.definePackage(
  "eg.effRepainting",                //the full name of the package to create
  function(effRepainting) {          //name the argument of this function
  /**
    * Returns the application server object which by default is the application
    * namespace as specified in Project->Deployment Options.
    *
    * @returns {jsx3.app.Server} the application server object.
    */
  effRepainting.getServer = function() {
    // should be the same as namespace in Project -> Deployment Options
    return NSsampleefficientRepainting;
  }
//Package end
})