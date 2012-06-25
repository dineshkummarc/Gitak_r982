jsx3.Package.definePackage("eg.windowswap", function(pkg) {

  pkg.swap = function() {
    // get the pane to be swapped,and its parent
    var swapPane = pkg.APP.getJSXByName("blkSwappablePane");
    var currentParent = swapPane.getParent();

    if (currentParent.getName() == "blkWindowSwapApp") {
      // if the parent is part of the main application, get or create the window
      var w = pkg.APP.getAppWindow("swapWin");
      if (w == null) {
        w = pkg.APP.createAppWindow("swapWin");
        w.setHeight(400);
        w.setWidth(500);
        w.setTitle("Swap Window");
      }

      // subscribe to the window closing event to return the content
      // to the application when the windowisclosed
      w.subscribe(jsx3.gui.Window.WILL_CLOSE, this, this.swap);

      // now move the pane to the window
      w.getRootBlock().adoptChild(swapPane);

      //and show the window if it isn'talready visible
      if (!w.isOpen()) {
        w.open();
      }
      w.focus();
    } else {
      // else if the parent is the root block of the window
      var w = pkg.APP.getAppWindow("swapWin");
      if(w) {
        // unsubscribe fromthe windowclosing event
        w.unsubscribe(jsx3.gui.Window.WILL_CLOSE, this, this.swap);
      }

      // move the content backto the application
      pkg.APP.getJSXByName("blkWindowSwapApp").adoptChild(swapPane);

      // and close the window
      w.close();
    }
  };

});