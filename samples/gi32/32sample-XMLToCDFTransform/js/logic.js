jsx3.lang.Package.definePackage(
  "eg.XMLToCDF",                //the full package name
  function(XMLToCDF) {          //short package name, good to use in this file only.
  /**
   * Returns the application server object which by default is the application
   * namespace as specified in Project->Deployment Options.
   *
   * @returns {jsx3.app.Server} the application server object.
   */
   XMLToCDF.getServer = function() {
     // should be the same as namespace in Project -> Deployment Options
     return XMLToCDFTransform; 
   };
/**
 * Transform source file and load into jsx3.List object
 * @param  strSourceURL {String} location of XML file
 * @param  objMatrix{jsx3.gui.Matrix}  object to load
 * @return void
*/
  XMLToCDF.loadList= function(strSourceURL, objMatrix) {
  var sourceXMLDoc= new jsx3.xml.Document().load(objMatrix.getServer().resolveURI(strSourceURL));
  var transformXSL = XMLToCDF.getServer().getCache().getDocument("applicant2record_xsl");
  var transformedDoc = sourceXMLDoc.transformNode(transformXSL);
  var newDoc = new jsx3.xml.Document().loadXML(transformedDoc); 
  XMLToCDF.getServer().getCache().setDocument("CDF_XML",newDoc);
  objMatrix.repaint();
  XMLToCDF.getServer().getJSXByName("xblkOutputPane").repaint();
}
  
/**
 * Handle cursor hover over jsx object
 * @param  objJSX           source jsx control
 * @param  strRecordId      source record id as string
 * @return {String}
*/
  XMLToCDF.showDetails = function(objJSX, strRecordId) {
  var objRecord = objJSX.getRecord(strRecordId);
  var strHTML = '&nbsp;&nbsp;&nbsp;<table style="font-family:Arial;font-size:10px;width:200px;">';
  for(var p in objRecord) {
    if((p.substring(0,3) != "jsx")) {
      strHTML += '<tr><td style="font-weight:bold;width:40%;">' + p + ':</td><td>' + objRecord[p] + '</td></tr>';
    }
  }
  strHTML += '</table>';
  return '<span style="font-family:Arial;font-size:10px;font-weight:bold;text-decoration:underline;width=200px;">' + objRecord['jsxtext'] + '</span>' + strHTML;
}
})