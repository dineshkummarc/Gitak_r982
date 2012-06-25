jsx3.lang.Package.definePackage(
"eg.manipulateCDF",                //the full name of the package to create
function(manipulateCDF) {          //name the argument of this function

    /**
    * Returns the application server object which by default is the application
    * namespace as specified in Project->Deployment Options.
    *
    * @returns {jsx3.app.Server} the application server object.
    */
    manipulateCDF.getServer = function() {
      // should be the same as namespace in Project -> Deployment Options
      return eg.manipulateCDF.SERVER;
    }

  /**
    * selected Function selected from menu menuXY
    */
    manipulateCDF.fXYType = "sum" ;

  /**
    * selected Function selected from menu menuX
    */
    manipulateCDF.fXType  = "sum" ;

  /**
    * selected Function selected from menu menuyY
    */
    manipulateCDF.fYType  = "sum" ;

  /**
    * selected Function selected from menu menuZ
    */
    manipulateCDF.fZType  = "sum" ;

  /**
    * Applies the selected functions to the columns X, Y and Z
    * Modifies the original CDF document
    * Creates a new CDF document from selected list.
    */
    manipulateCDF.calculate = function(){
      // New CDF Document ( later add modified records to this Object)
      var objFiltered = jsx3.xml.CDF.newDocument();
      var objRoot = objFiltered.getRootNode();
      var objEndresult = objRoot.createNode(jsx3.xml.Entity.TYPEELEMENT,"record");
      objEndresult.setAttribute("jsxid",jsx3.xml.CDF.getKey())
      objEndresult.setAttribute("jsxtext","Total");

      // Sets the default value for place holder based on selected function, multiplication or summation
      var resultTotalX = ( manipulateCDF.fXType == "sum") ? 0 : 1;
      var resultTotalY = ( manipulateCDF.fYType == "sum") ? 0 : 1;
      var resultTotalZ = ( manipulateCDF.fZType == "sum") ? 0 : 1;
      // Place holder for selected record
      var objNode ;
      // Place holders for attributes X and Y and their result
      var xint ;
      var yint ;
      var resultXY ;
      // Object list
      var objSOURCE   = manipulateCDF.getServer().getJSXByName("srcList");
      var selectedRECORDS = objSOURCE.getSelectedNodes();
      // Gets all records if none is selected
      if (!selectedRECORDS.hasNext()){
        var objXML = objSOURCE.getXML();
        var selectedRECORDS = objXML.selectNodes("//data/*");
      }
      while (selectedRECORDS.hasNext()){
        objNode = selectedRECORDS.next();
        xint = parseInt(objNode.getAttribute("jsxIntX"));
        yint = parseInt(objNode.getAttribute("jsxIntY"));
        // Applies the select function to x and y for selected Record
        resultXY = manipulateCDF.doCalculateXY(xint,yint,manipulateCDF.fXYType)
        // Sets the value for column Z
        objNode.setAttribute("jsxIntXY",resultXY);
        // update original record view
        objSOURCE.redrawRecord(objNode.getAttribute("jsxid"), jsx3.xml.CDF.UPDATE);
        // Clones and add the selected record in newly created new CDF document
        objRoot.appendChild(objNode.cloneNode(true));
        // Applies the select function to y and previous y result
        resultTotalZ = manipulateCDF.doCalculateXY(resultTotalZ,resultXY,manipulateCDF.fZType)
        // Applies the select function to X and previous X result
        resultTotalX = manipulateCDF.doCalculateXY(resultTotalX,xint,manipulateCDF.fXType)
        // Applies the select function to Z and previous Z result
        resultTotalY = manipulateCDF.doCalculateXY(resultTotalY,yint,manipulateCDF.fYType)
      }

      // create end results for end result list and filtered list
      manipulateCDF.addToEndResult(resultTotalX,resultTotalY,resultTotalZ);
      objEndresult.setAttribute("jsxIntX",resultTotalX);
      objEndresult.setAttribute("jsxIntY",resultTotalY);
      objEndresult.setAttribute("jsxIntXY",resultTotalZ);
      objRoot.appendChild(objEndresult);

      // Adds the document to the cache
      manipulateCDF.getServer().getCache().setDocument("cachedFiltered",objFiltered);
      manipulateCDF.getServer().getJSXByName("listFiltered").repaintData();
      manipulateCDF.repaintXMLBlocks()
      // deselect lists and menus
      manipulateCDF.resetRecordSelection(objSOURCE);
      manipulateCDF.resetRecordSelection(listFiltered);
      manipulateCDF.resetRecordSelection(manipulateCDF.getServer().getJSXByName("listMultiSelect"))
    }

  /**
    * Applies the function cType on parameters intX and intY and returns the result
    * @param intX  {int}
    * @param intY  {int}
    * @param cType (String}
    * @retirn {int}
    */
    manipulateCDF.doCalculateXY = function(intX, intY, cType){
      var result = null ;
      switch(cType) {
        case "sum":
          result= intX + intY;
          break;
        case "mult":
          result= intX * intY;
          break;
        default:
          result= intX + intY;
          break;
      }
      return result
    }

  /**
    * Modifies the end result record for the second list
    * @param intX  {int}
    * @param intY  {int}
    * @param intY  {int}
    */
   manipulateCDF.addToEndResult = function(intX,intY,intZ){
    var objSOURCE   = manipulateCDF.getServer().getJSXByName("endResultIist");
    var objRecordNode = objSOURCE.getRecordNode("unique")
    objRecordNode.setAttribute("jsxfX",intX);
    objRecordNode.setAttribute("jsxfY",intY);
    objRecordNode.setAttribute("jsxfZ",intZ);
    objSOURCE.insertRecordNode(objRecordNode, null, true);
   }

   manipulateCDF.resetRecordSelection = function(listOBJ){
    if (!listOBJ) listOBJ = manipulateCDF.getServer().getJSXByName("srcList");
     listOBJ.deselectAllRecords()
   }

   manipulateCDF.selectRecord = function(listOBJ,strRECORDID){
    listOBJ.selectRecord(strRECORDID)
   }

   manipulateCDF.repaintXMLBlocks = function(){
    var blockXfiltered = manipulateCDF.getServer().getJSXByName("blockXfiltered");
    var blockXmodified = manipulateCDF.getServer().getJSXByName("blockXmodified");

    var radioFiltered = manipulateCDF.getServer().getJSXByName("radioFiltered");
    if(radioFiltered.getSelected()==jsx3.gui.RadioButton.SELECTED){
      blockXmodified.setDisplay(jsx3.gui.Block.DISPLAYNONE  ,false);
      blockXfiltered.setDisplay(jsx3.gui.Block.DISPLAYBLOCK ,false);
    }
    else{
      blockXfiltered.setDisplay(jsx3.gui.Block.DISPLAYNONE ,false);
      blockXmodified.setDisplay(jsx3.gui.Block.DISPLAYBLOCK,false);
    }
    //blockXmodified.repaint();
    //blockXfiltered.repaint();
    blockXfiltered.getParent().repaint();
    return false
   }

   manipulateCDF.onRadioSelected = function(){
     setTimeout( function() { manipulateCDF.repaintXMLBlocks() } , 200);
   }

    manipulateCDF.onlyOne = []; // only one of these should exist.
/**
  * Launches a simple dialog as a child of server body block if one dosen't exists.
  * Brings an existing dialog forward instead of launching it again
  * @param url : location of the resource
  * @param name : jsxname the resource
  */
manipulateCDF.launchSimple = function(url,name) {
   
   var objDialog = manipulateCDF.getServer().getBodyBlock().getChild(name);
   if (!objDialog){
    objDialog = manipulateCDF.getServer().getBodyBlock().load(url,false);
    this.onlyOne.push(objDialog);
    manipulateCDF.getServer().getBodyBlock().paintChild(objDialog);
   }
   else{
    objDialog.focus();
   }
}

});
