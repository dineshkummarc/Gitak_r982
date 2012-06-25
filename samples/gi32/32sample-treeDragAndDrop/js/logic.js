/**
 * Defines package eg.treeDragAndDrop for Tree Drag and Drop sample application.
 */
jsx3.lang.Package.definePackage("eg.treeDragAndDrop", function(treeDragAndDrop ) {

  /**
   * Returns the application server object which by default is the application
   * namespace as specified in Project->Deployment Options.
   *
   * @returns {jsx3.app.Server} the application server object.
   */
  treeDragAndDrop.getServer = function() {
    // should be the same as namespace in Project -> Deployment Options
    return sampleTreeDragAndDrop;
  };

  /**
   * This method fetch a record from the objSource (tree) with strDRAGID and
   * display the dragged record's information in the text boxes.
   * @param {jsx} objSource - source object.
   * @param {JSXDragId} strDRAGID - Id of the dragged record from tree.
   *    
   */
  treeDragAndDrop.showSize= function(objSOURCE,strDRAGID) {
    var objRecord = objSOURCE.getRecord(strDRAGID);
    treeDragAndDrop.getServer().getJSXByName("txtBreed").setValue(objRecord.jsxtext);
    treeDragAndDrop.getServer().getJSXByName("txtSize").setValue(objRecord.size);
  }

  /**
   * This method gets breed name and size from the user input and inserts
   * the record into a tree.
   */

  treeDragAndDrop.addBreed= function() {
    var objTree = treeDragAndDrop.getServer().getJSXByName("treeBreedSelection");
    var o = new Object();
    o.jsxid = jsx3.CDF.getKey();
    o.jsxtext = treeDragAndDrop.getServer().getJSXByName("txtBreed").getValue();
    o.size = treeDragAndDrop.getServer().getJSXByName("txtSize").getValue();
    o.jsximg = "JSX/images/tree/file.gif";
    objTree.insertRecord(o,"root");
  }

})