/**
 * Defines package eg.addRemoveCDFRecords.
 */
jsx3.lang.Package.definePackage(
               "eg.addRemoveCDF",  // full package name
                function(addRemoveCDF) {  // argument in function is a short package, good to use in this file only.

 

     /* Application Server object which is by default the project namespace  (see Project -> Project settings -> Namespace) */      
   addRemoveCDF.APP;

  

  /**
   * Dynamically add data from user input text boxes into CDF Document and repaint view i.e grid.
   *     
   */
   addRemoveCDF.loadList = function (objJSX) {
     // List grid view
     var objServer = objJSX.getServer();
     var listView = objServer.getJSXByName("mtxUpdatableTable");   
     
      
     var objRecord = new Object(); // new CDF record obj
     objRecord.jsxid = jsx3.CDF.getKey();

     //read user input
     objRecord.Date = objServer.getJSXByName("dpkrDateInput").getValue();
     objRecord.Security = objServer.getJSXByName("txtSecurityInput").getValue();
     objRecord.Open = objServer.getJSXByName("txtOpenInput").getValue();
     objRecord.High = objServer.getJSXByName("txtHighInput").getValue();
     listView.insertRecord(objRecord, null, true);   
   };

  /**
   * Adds a record to the table.
   */
  addRemoveCDF.doAddNewRecord= function (objJSX, strRecordId) {
     // List grid view
     var listView = objJSX.getServer().getJSXByName("mtxEditableTable");   
     
     var objRecord = new Object(); // new CDF record obj
     objRecord.jsxid = jsx3.CDF.getKey();

     //read user input
     objRecord.Date = ""
     objRecord.Security = ""
     objRecord.Open = ""
     objRecord.High = ""
     listView.insertRecord(objRecord, null, true);   
     //listView.setSortPath("jsxid");
     //listView.repaint();
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