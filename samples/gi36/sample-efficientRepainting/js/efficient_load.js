 jsx3.lang.Package.definePackage(
   "eg.effLoad",                   // the full name of the class to create
   function(effLoad) {
/**
  * global variable used for tiling the window. unimportant to this example
  */
effLoad.g_i;
/*
 * Loads 20 successive dialogs into the app: either inefficiently (repaint) or efficiently (paintChild in sleep queue)
 * @param objParent {jsx3.gui.Block} parent object to hold the dialog instances
 * @param bEfficient {boolean} if true, the dialogs will be loaded efficiently
 * @param intCount {int} the number of dialogs to load (currently 20)
 */
effLoad.loadDialogs = function(objParent,bEfficient,intCount) {
  //check if this is efficient or inefficient
  if(bEfficient) {
    effLoad.g_i = 0;  //used for tiling. unimportant
    for(var i=0;i<intCount;i++) {
      //PERFORMANCE GAIN 1): load the new dialog using the load queue.
	  jsx3.sleep( function() {
        effLoad.loadOneDialogEfficient(objParent,true);
      });
    }
  } else {
    for(var i=0;i<intCount;i++) {
      //load the dialog immediately
      effLoad.loadOneDialogInefficient(objParent,(i+1)*10);
    }
  }
}
/*
 * Loads a single dialog into the application using 'painChild'
 * @param objParent {jsx3.gui.Block} parent object to hold the dialog instance
 * @param bTile {boolean} if true, the dialogs should be tiled
 */
effLoad.loadOneDialogEfficient = function (objParent,bTile) {
  //PERFORMANCE GAIN 2): load the new dialog using painChild + loadAndCache
  var objDlg = objParent.loadAndCache("components/containers/dialog.xml",false);
  //this is only used for tiling the dialogs, so you can see them all. unimportant to this sample app
  if(bTile) objDlg.setLeft(effLoad.g_i+=10).setTop(effLoad.g_i);
  //use painChild
  objParent.paintChild(objDlg);
}
/*
 * Loads a single dialog into the application using 'repaint()'
 * !param objParent {jsx3.gui.Block} parent object to hold the dialog instance
 * !param inc {int} the distance in pixels from the left/top of the parent to position the dialog (unimportant to the example)
 */
effLoad.loadOneDialogInefficient = function(objParent,inc) {
  //add the dialog to the VIEW using repaint
  var objDlg = objParent.load("components/containers/dialog.xml",false);
  //this is only used for tiling the dialogs, so you can see them all. unimportant to this sample app
  if(inc) objDlg.setLeft(inc).setTop(inc);
  //use repaint...not a good idea
  objParent.repaint();
}
//Class end
})