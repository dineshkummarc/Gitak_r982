//keep track of positions for tiling new dialogs
var position = 0
/**
 * Opens a list to display Stock information in a dialog area.
 *
 * @param list {jsx3.gui.List} list of stocks.
 */
eg.sampledialogs.openSelectedStocks = function(list){
 try {
  // Get the area that the dialogs are to be lunched in (target)
   var areaDialogs = eg.sampledialogs.APP.getJSXByName("blkDialogScrollableArea")
// Get array of selected rows from list.
  var selectedIds = list.getSelectedIds(); 
  var len = selectedIds.length
  for (var i = 0 ; i < selectedIds.length ; i ++){
    //get the CDF Record using id
    var currentRecordNode = list.getRecordNode(selectedIds[i]);
    //retrieve the value of the attribute "Symbol"
    var stockSymbol = currentRecordNode.getAttribute("Symbol"); 
    // Compare if the dialog already exists.
    var singlDialog = areaDialogs.getChild(stockSymbol) ; 
   /* if ( typeof(singlDialog) == 'undefined' ){  */ // doesn't work
    if ( singlDialog == null ){
      // Create new dialog and add it to the target "in this case areaDialogs"
      /*
      create a jsx3.gui object without a serialization file
      eg.sampledialogs.createDialog(stockSymbol,areaDialogs,position);
      */
      eg.sampledialogs.createDialogWserFile(stockSymbol,areaDialogs,position);  
      // simple tiling algorithm will place new dialog 30 over and 30 down from last
      position  += 30;
    }
    else { 
      // since dialog already exists, then we want to make it the top-most dialog
      singlDialog.focus();
    }
  }
 }
 catch(e){
  eg.sampledialogs.formatErr(e); 
 }
}

/**
 * Creates a new dialog and add it to the dialog area
 * This function shows how to create a jsx3.gui object without a serialization file.
 * 
 *
 * @ dialogName {string} name of the gui object
 * @ dialogArea {jsx3.app.Model} – JSX object, target
 * @ positon {int}
 */
eg.sampledialogs.createDialog = function(dialogName,dialogArea,position){
  // Create a new dialog and set the name , caption bar left top positions and ...
  var myDialog = new jsx3.gui.Dialog();
  // add the dialog to the work area
  dialogArea.setChild(myDialog);
  myDialog.getCaptionBar().setText(dialogName); 
  // don't repaint with second arg false until all attributes are set.
  myDialog.setLeft(position , false); 
  myDialog.setTop(position , false);
  myDialog.setWidth(150, false)
  myDialog.setHeight(80, false);
  myDialog.setName(dialogName) ;
  //set the bgcolor
  myDialog.setDynamicProperty('jsxbgcolor' , '@Solid Medium')
  // repaint the workarea
  dialogArea.repaint(); 
}

/**
 * loads a sample dialog to the work area.
 *
 * @ dialogName {string} name of the gui object
 * @ dialogArea {jsx3.app.Model} – JSX object, target
 * @ positon {int}
 */

eg.sampledialogs.createDialogWserFile = function(dialogName,dialogArea,position){
   var myDialog = dialogArea.load("components/dlgMulti.xml");
    myDialog.setName(dialogName) ;
    myDialog.getCaptionBar().setText(dialogName); 
    myDialog.setLeft(position , false); 
    // You can also set the value for these attributs in the gui component. 
    myDialog.setTop(position , false);
    myDialog.setWidth(150, false)
    myDialog.setHeight(80, false);
      // repaint the workarea
    dialogArea.repaint();
 
}