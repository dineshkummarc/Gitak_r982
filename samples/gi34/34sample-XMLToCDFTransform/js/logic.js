jsx3.lang.Package.definePackage(
  "eg.XMLToCDF",                //the full package name
  function(XMLToCDF) {          //short package name, good to use in this file only.

  XMLToCDF.APP;

/**
 * Transform source xml using Entity.transformNode() and load into jsx3.gui.Matrix object
 * @param  strSourceURL {String} location of XML file
 * @param  objMatrix {jsx3.gui.Matrix}  object to load
 * @return void
*/
  XMLToCDF.loadList= function(strSourceURL, objMatrix) {

  var url = XMLToCDF.APP.resolveURI(strSourceURL);
  var sourceXMLDoc= new jsx3.xml.Document().load(url);
  var transformXSL = XMLToCDF.APP.getCache().getDocument("applicant2record_xsl");

  var transformedDoc = sourceXMLDoc.transformNode(transformXSL);

  var newDoc = new jsx3.xml.Document().loadXML(transformedDoc); 
  XMLToCDF.APP.getCache().setDocument("CDF_XML",newDoc);
  objMatrix.repaint();
  XMLToCDF.APP.getJSXByName("xblkOutputPane").repaint();
}

/**
 * Transform source xml  and load into jsx3.gui.Matrix object
 * @param  strSourceURL {String} location of XML file
 * @param  objMatrix {jsx3.gui.Matrix}  object to load
 * @return void
*/
  XMLToCDF.loadMatrixByTemplate= function(strSourceURL, objMatrix) {

  var url = XMLToCDF.APP.resolveURI(strSourceURL);
  var sourceXMLDoc= new jsx3.xml.Document().load(url);
  var transformXSL = XMLToCDF.APP.getCache().getDocument("applicant2record_xsl");

  var templateXSL = new jsx3.xml.Template(transformXSL);
  var transformedDoc = templateXSL.transform(sourceXMLDoc, true);

  XMLToCDF.APP.getCache().setDocument("CDF_XML",transformedDoc); 
  objMatrix.repaint();
  XMLToCDF.APP.getJSXByName("xblkOutputPane").repaint();
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