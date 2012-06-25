jsx3.lang.Package.definePackage(
  "eg.search",                //the full name of the package to create
  function(search) {          //name the argument of this function
  /**
   * Position of the record in the CDF document to be returned
   */
  search.resultIndex = 1;
  
  /**
   * Returns the application server object which by default is the application
   * namespace as specified in Project->Deployment Options.
   *
   * @returns {jsx3.app.Server} the application server object.
   */
   search.getServer = function() {
    // should be the same as namespace in Project -> Deployment Options
    return eg.search.SERVER;
   };
  
 /**
  * Finds and focuses the first or next found record in list. 
  * @param strSearched {String} Text to find
  * @param bReset {boolean} if true search from begining.
  */
  search.selectRecord = function(strSearched, bReset) {
    if(bReset) search.resetResult();
	var server = search.getServer();
    var mylist =  server.getJSXByName('list');
    var objXSL =  new jsx3.xml.Document();
    objXSL.load(server.resolveURI('xsl/findrecordid.xsl'));
    var objXML =  server.getCache().getDocument("cachedlist");
    var params= {'searchedtext':strSearched, 'resultindex':this.resultIndex}
    var objPROC = new jsx3.xml.Template(objXSL);
    objPROC.setParams(params);
    var xmlRECORDID = objPROC.transform(objXML);
    var strRECORDID = this.removeWrap(xmlRECORDID);
    //jsx3.log("id = " + strRECORDID);
    if (mylist.getRecord(strRECORDID) ){
      this.resultIndex++;
      mylist.focusRowById(strRECORDID);
    }
    else{
      var message = (this.resultIndex == 1)?'Text not found':'End of search'
      search.resultIndex = 1; // reset search index
      server.alert(message,message);
    }
  } 

/**
 * 
 */
  search.removeWrap = function(wrapped) {
     
    if (wrapped.indexOf("<JSX_FF_WELLFORMED_WRAPPER>") > -1) {
       return wrapped.substring(wrapped.indexOf(">") + 1, wrapped.lastIndexOf("<"));
    } else
     return wrapped;

  }

});
