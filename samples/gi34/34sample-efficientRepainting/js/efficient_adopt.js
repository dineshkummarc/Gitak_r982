jsx3.require("jsx3.gui.Dialog", "jsx3.gui.WindowBar", "jsx3.gui.ImageButton");

jsx3.lang.Package.definePackage(
   "eg.effAdopt",                   // the full name of the class to create
   function(effAdopt) {
/**
 * Active container
 */
effAdopt.activeContainer = 'dialog'
  /**
    * loads a new GUI component (dialog, stack, tab) into the view without requiring repaint
    */
  effAdopt.loadOneItem = function() {
    //get current view (what container should be added (tab/dialog/stack))
  //  var viewtype = jsx3.gui.RadioButton.getValue("group1"); //deprecated
      var viewtype = eg.efficientRepainting.APP.getJSXByName("radio").getGroupValue();
    //get parent container to add new item to
    var objParent = eg.efficientRepainting.APP.getJSXByName("my" + viewtype + "container");
    var objItem = objParent.load("components/containers/" + viewtype + ".xml",false);
    objParent.paintChild(objItem);
    //Use a delay (100ms) to add content to the dialog. This way the perceived performance is better
    //In other words, the user sees the container immediately, and THEN the content is loaded
    window.setTimeout(function() {
      var objContentPane = objItem.getDescendantsOfType("jsx3.gui.Block")
      //gets the index of the block where content has to be rendered.
      var intContentIndex = (effAdopt.activeContainer == "dialog") ? 1 : 0;
      if(objContentPane.length > intContentIndex) objItem = objContentPane[intContentIndex];
      var objList = objItem.load("components/list_of_states.xml",false);
      objItem.paintChild(objList);
    },100);
  }
  /**
    * Visualizes content in container 'my' + viewtype + 'container'
    * @param viewtype {String} one of: dialog, stack, or tab
    */
  effAdopt.transferAllItems = function(viewtype) {
    //get the old container
    var objOldParent = eg.efficientRepainting.APP.getJSXByName("my" +  effAdopt.activeContainer + "container");
    //get new container
    var objNewParent = eg.efficientRepainting.APP.getJSXByName("my" + viewtype + "container");
    //loop through all children in the old container
    var intStartIndex = (effAdopt.activeContainer == "dialog") ? 1 : 0;
    var maxLen = objOldParent.getChildren().length;
    for(var i=intStartIndex;i<maxLen;i++) {
         effAdopt.transferItem(objOldParent,objNewParent,effAdopt.activeContainer,viewtype,i);
    }
    // update the new active container
    effAdopt.activeContainer = viewtype;
  }
  /**
    * Transfers a single item with an incremented delay
    * @param objOldParent {jsx3.gui.Block} old parent that held the content items
    * @param objNewParent {jsx3.gui.Block} new parent that will hold multiple content items
    * @param prevview {String} 'jsxvalue' property for the previously active radio button
    * @param viewtype {String} 'jsxvalue' property for the active radio button
    * @param intIndex {int} child index for child in old parent to transfer to new parent
    */
  effAdopt.transferItem = function(objOldParent,objNewParent,prevview,viewtype,intIndex) {
    var intContentIndex =  (viewtype == "dialog") ? 1 : 0;
    var intContentIndexOld = (prevview == "dialog") ? 1 : 0;
    //use a delay to transfer (adopt) the content of the old container into the new
    window.setTimeout(function() {
      //load a new instance of the new container type and insert into the DOM
      var objItem = objNewParent.load("components/containers/" + viewtype + ".xml",false);
      //tile left and top if this is a dialog
      if(viewtype == "dialog") objItem.setLeft(intIndex * 25 + 100).setTop(intIndex * 25 + 100);
      objNewParent.paintChild(objItem);
      //get the first block child (this is the content pane where the list will go)
      objItem = objItem.getDescendantsOfType("jsx3.gui.Block")[intContentIndex];
      objItem.adoptChild(objOldParent.getChild(intIndex).getDescendantsOfType("jsx3.gui.Block")[intContentIndexOld].getChild(0));
      //objItem.adoptChild(objOldParent.getChild(intIndex).getDescendantsOfType("jsx3.gui.Block")[intContentIndexOld].getChild(0));
      //remove all children from the old parent if all content has been transferred
      if(intIndex == objOldParent.getChildren().length -1) effAdopt.removeAllItems(prevview);
    },100 * intIndex); //==> use an 'incremented delay' to improve perceived performance
  }
  /**
    * Removes all content; resets the example
    * @param viewtype {String} one of: dialog, stack, or tab
    */
  effAdopt.removeAllItems = function(viewtype) {
    //get current view (what container is active) if not passed
  //  if(viewtype == null) viewtype = jsx3.gui.RadioButton.getValue("group1"); //deprecated
  if(viewtype == null) viewtype =  eg.efficientRepainting.APP.getJSXByName("radio").getGroupValue();
    //get parent container
    var objParent =  eg.efficientRepainting.APP.getJSXByName("my" + viewtype + "container");
    //remove content (if the view is of type dialog, the first child is a splitter, so don't remove
    var maxLen = objParent.getChildren().length -1;
    for(var i=maxLen;i>=0;i--) {
      var objChild = objParent.getChild(i);
     // if(!objChild.isInstanceOf("jsx3.gui.Splitter")) objParent.removeChild(objChild);  //isInstanceOf deprecated
	 if(!objChild.instanceOf("jsx3.gui.Splitter")) objParent.removeChild(objChild);
	 
    }
  }
})