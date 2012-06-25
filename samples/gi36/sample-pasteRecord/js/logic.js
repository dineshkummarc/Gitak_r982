jsx3.lang.Package.definePackage(
  "eg.copypaste",                //the full name of the package to create
  function(copypaste) {          //name the argument of this function

    copypaste.g_strRecordId = null;


copypaste.getServer = function() {
    return eg.copypaste.SERVER;
}

copypaste.showSpy = function(objList,strRecordId){
  copypaste.g_strRecordId = strRecordId;
  return  this.formatRecord(objList.getRecord(strRecordId));
}


copypaste.formatRecord = function(objRecord){
  var output = "";
  for (var p in objRecord){
    if (p.substring(0,3) != 'jsx') {
      output += p + ": " + objRecord[p] + "\r\n";
    }
  }
  return output;
}

// Called by context menu to copy
copypaste.copyRecordToClipboard = function(menu){
  //find source jsx3.gui.Matrix object from menu context parent
  var sList = menu.getContextParent();

  var strRecordId = sList.getValue();

  if (strRecordId && strRecordId.length) {
    var copytext=[];
    for (var i=0; i < strRecordId.length; i++) {
       copytext.push(copypaste.formatRecord(sList.getRecord(strRecordId[i])));
    }
    jsx3.html.copy(copytext.join());
  } else if (!strRecordId) {
    var record = sList.getRecord(strRecordId);
    // cross-browser copy
    jsx3.html.copy(copypaste.formatRecord(record));
  }  else {
    //try to use record id from spy
    jsx3.log('last spy = ' + copypaste.g_strRecordId);
    var record = sList.getRecord(copypaste.g_strRecordId);
    // cross-browser copy
    jsx3.html.copy(copypaste.formatRecord(record));
    
  }
   
}

copypaste.pasteFromClipboard = function(){
  copypaste.getServer().getJSXByName("textarea").setValue(jsx3.html.paste(), true);

}

copypaste.showSource = function(){
  copypaste.getServer().getBodyBlock().load("components/javascriptSourceDialog.xml",true);
}


})
