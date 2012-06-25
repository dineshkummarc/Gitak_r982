jsx3.lang.Package.definePackage(
  "eg.CDFMasterDetail",                //the full package name
  function(CDFMasterDetail) {          //short package name, good to use in this file only.

  
  //Global Variables
  positionIndex = 1;
  servObj = eg.CDFMasterDetail.APP;  // Application server object

 
/**
 * Extract single record and transform to document with multiple records
 *   (each attribute is converted to single record for display purposes).
 * @param  objJSX           source jsx control
 * @param  strRecordId      source record id as string
 * @return void
*/
  
  CDFMasterDetail.displayItem = function(objJSX,strRecordId){
 		  
	rec = objJSX.getRecord(strRecordId);
         // Don't load another dialog if one is already up.
         if (servObj.getJSXByName(rec.jsxid + "_dialog") == null ) {
	var applicantDialog = servObj.getJSXByName("blkMainPane").load("components/dlgApplicantDetails.xml",false);
		    
	var dialogCaption = rec.jsxtext;
	var dialogName = rec.jsxid + "_dialog";
		   
         var position = 25 * (positionIndex++);
	applicantDialog.setLeft(position); 
	applicantDialog.setTop(position);  
	applicantDialog.getCaptionBar().setText(dialogCaption);
	applicantDialog.setName(dialogName);
         //applicantDialog.repaint();
 
                  
	/* Transform single record to new document with multiple records */
         if (servObj.getCache().getDocument(strRecordId + "_xml") == null ){
	    var newDoc =  jsx3.xml.CDF.Document.newDocument();
        	    newDoc.insertRecord(rec);                  
		  
	    var transformXSL = servObj.Cache.getDocument("record2records_xsl");
             var template = new jsx3.xml.Template(transformXSL);
    	    /* var transformedDoc = newDoc.transformNode(transformXSL); // old 3.2 way*/
             /* newDoc.loadXML(transformedDoc); */

             var transformedDoc = template.transformToObject(newDoc);
			   
            // use newDoc if doing old way          
	    var listDoc = servObj.getCache().setDocument(strRecordId + "_xml", transformedDoc); 	
         }
	var objList = applicantDialog.getDescendantOfName("mtxApplicantDetails");
         objList.setXMLId(strRecordId + "_xml");
	objJSX.getServer().getJSXByName("blkMainPane").paintChild(applicantDialog); 
        }                   		 
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
	servObj.Cache.clearById(itemXMLId);
	servObj.Cache.clearById(itemXSLId);
}

})