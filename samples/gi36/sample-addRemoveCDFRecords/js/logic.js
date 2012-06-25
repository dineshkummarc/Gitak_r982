/**
 * Defines package eg.addRemoveCDFRecords.
 */
jsx3.lang.Package.definePackage(
               "eg.addRemoveCDF",  // full package name
                function(addRemoveCDF) {  // argument in function is a short package, good to use in this file only.
 
  /* Application Server object which is by default the project namespace  (see Project -> Project settings -> Namespace) */      
   addRemoveCDF.APP;

   addRemoveCDF.newjsxid;

  /* Format handler will display price above 200 in red and price under 10 in green.
   * Note, since format handler is defined in javascript depending on the browser this can be faster or slower than
   * value template.
   */
    addRemoveCDF.formatValue  = function(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer) {

     var strValue = objMatrixColumn.getValueForRecord(strCDFKey) ;
     if (!strValue) return; // nothing there
     
     var mf = new jsx3.util.MessageFormat("{0,number,currency}");
      objDiv.innerHTML = mf.format(strValue);

      if (strValue < 200) {
        if (strValue < 10)
            objDiv.style.color="green";
        else
            objDiv.style.color="black";
        }
      else
        objDiv.style.color="red";
    }

  addRemoveCDF.resetTextBox = function (objJSX) {
     var objServer = objJSX.getServer();
     objServer.getJSXByName("dpkrDateInput").setValue();
     objServer.getJSXByName("txtSecurityInput").setValue();
     objServer.getJSXByName("txtOpenInput").setValue();
     objServer.getJSXByName("txtHighInput").setValue();
  }
  /**
   * Dynamically add data from user input text boxes into CDF Document and repaint view i.e grid.
   *     
   */
   addRemoveCDF.loadList = function (objJSX) {

     // List grid view
     var objServer = objJSX.getServer();
     var listView = objServer.getJSXByName("mtxUpdatableTable");   
     var objRecord = {}; // new CDF record obj
     objRecord.jsxid = jsx3.CDF.getKey();

     //read user input
    var date = objServer.getJSXByName("dpkrDateInput").getDate();
     objRecord.Date = (date) ? date : new Date();
     objRecord.Security = objServer.getJSXByName("txtSecurityInput").getValue();
     objRecord.Open = objServer.getJSXByName("txtOpenInput").getValue();
     objRecord.High = objServer.getJSXByName("txtHighInput").getValue();
     listView.insertRecord(objRecord, null, true);   
     this.resetTextBox(objJSX);
   };

  /**
   * Adds a record to the table.
   */
  addRemoveCDF.doAddNewRecord= function (objJSX, strRecordId) {
     // menu context parent is Grid list view
     var listView = objJSX.getContextParent();   
     var objRecord = {};// new CDF record obj

     this.newjsxid = objRecord.jsxid = jsx3.CDF.getKey();

     //read user input
     objRecord.Date = ""
     objRecord.Security = ""
     objRecord.Open = ""
     objRecord.High = ""
     listView.insertRecord(objRecord, objJSX.getContextRecordId(), true);   
  }

  /**
   * Removes selected row from CDF and repaints the grid
   * @param strRecordId - 
   */
   addRemoveCDF.doDeleteRecord = function (objJSX, strRecordId) {
     addRemoveCDF.doDeleteRecordInTable(objJSX, strRecordId, "mtxUpdatableTable");
   }

  /**
   * Removes selected row from CDF and repaints the grid
   * @param strRecordId - 
   * @param table - 
   */
   addRemoveCDF.doDeleteRecordInTable = function (objJSX, strRecordId, table) {
 //  alert(strRecordId)     ;
     var listView = objJSX.getServer().getJSXByName(table); // get the table 

     var objRecord = listView.getRecord(strRecordId);

     listView.deleteRecord(strRecordId, true);
  //   listView.repaint();
   }
   
});