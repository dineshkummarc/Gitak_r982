jsx3.lang.Package.definePackage(
  "eg.CDFMasterDetail",                //the full package name
  function(CDFMasterDetail) {          //short package name, good to use in this file only.
/* Globals */
  positionIndex = 1;
  /**
   * Returns the application server object which by default is the application
   * namespace as specified in Project->Deployment Options.
   *
   * @returns {jsx3.app.Server} the application server object.
   */
   CDFMasterDetail.getServer = function() {
     // should be the same as namespace in Project -> Deployment Options
     return CDFMasterDetail32; 
   };
/**
 * Extract single record and transform to document with multiple records
 *   (each attribute is converted to single record for display purposes).
 * @param  objJSX           source jsx control
 * @param  strRecordId      source record id as string
 * @return void
*/
  CDFMasterDetail.displayItem = function(objJSX,strRecordId){
  var recordNode = objJSX.getRecordNode(strRecordId);
  var itemNode = recordNode.cloneNode("false");
  var applicantDialog = CDFMasterDetail.getServer().getJSXByName("blkMainPane").load("components/dlgApplicantDetails.xml",true);
  var dialogCaption = itemNode.getAttribute("jsxtext");
  var dialogName = itemNode.getAttribute("jsxid") + "_dialog";
  applicantDialog.getCaptionBar().setText(dialogCaption);
  applicantDialog.setName(dialogName);
  //transform single record to new document with multiple records
  var newDoc = new jsx3.xml.Document();
  newDoc.loadXML("<data jsxid='jsxroot'/>");
  var rootNode = newDoc.getRootNode();
  rootNode.appendChild(itemNode);
  var transformXSL = CDFMasterDetail.getServer().Cache.getDocument("record2records_xsl");
  var transformedDoc = newDoc.transformNode(transformXSL);
  newDoc.loadXML(transformedDoc);
   
  var listDoc = CDFMasterDetail.getServer().getCache().setDocument(strRecordId + "_xml", newDoc);
  applicantDialog.repaint();
  var objList = applicantDialog.getDescendantOfName("mtxApplicantDetails");
  objList.setXMLId(strRecordId + "_xml");
  var position = 25 * (positionIndex++);
  applicantDialog.setLeft(position); 
  applicantDialog.setTop(position);  
  applicantDialog.repaint();
}
/**
 * Remove items from the local Cache that are not needed. 
 * This is called on execute event of close button of applicant details dialog.
 * @param  objCloseButton   source jsx control
 * @return void
*/
  CDFMasterDetail.removeDoc = function(objCloseButton){
  var itemList = objCloseButton.getParent().getParent().getDescendantOfName("mtxApplicantDetails");
  var itemXMLId = itemList.getXMLId();
  var itemXSLId = itemList.getXSLId();
  CDFMasterDetail.getServer().Cache.clearById(itemXMLId);
  CDFMasterDetail.getServer().Cache.clearById(itemXSLId);
}
})