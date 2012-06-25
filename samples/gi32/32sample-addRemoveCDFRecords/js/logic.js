/**
 * Defines package eg.addRemoveCDFRecords.
 */
jsx3.lang.Package.definePackage(
               "eg.addRemoveCDFRecords",  // full package name
                function(addRemoveCDF) {  // argument in function is a short package, good to use in this file only.

  /**
   * Returns the application server object which by default is the application
   * namespace as specified in Project->Deployment Options.
   * @returns {jsx3.app.Server} the application server object.
   */
  addRemoveCDF.getServer = function() {
      return sampleaddRemoveCDFRecords;
  };

  /**
   * Dynamically add data from user input text boxes into CDF Document and repaint view i.e grid.
   *     
   */
   addRemoveCDF.loadList = function () {
     // List grid view
     var listView = addRemoveCDF.getServer().getJSXByName("mtxUpdatableTable");   
     
     // list will grow by 1 row every time a new record is inserted
     //listView.setGrowBy(1);   
   
     var objRecord = new Object(); // new CDF record obj
     objRecord.jsxid = jsx3.CDF.getKey();

     //read user input
     objRecord.Date = addRemoveCDF.getServer().getJSXByName("dpkrDateInput").getValue();
     objRecord.Security = addRemoveCDF.getServer().getJSXByName("txtSecurityInput").getValue();
     objRecord.Open = addRemoveCDF.getServer().getJSXByName("txtOpenInput").getValue();
     objRecord.High = addRemoveCDF.getServer().getJSXByName("txtHighInput").getValue();
     listView.insertRecord(objRecord, null, true);   
     //listView.setSortPath("jsxid");
     listView.repaint();
   };

  /**
   * Adds a record to the table.
   */
  addRemoveCDF.doAddNewRecord= function (strRecordId) {
     // List grid view
     var listView = addRemoveCDF.getServer().getJSXByName("mtxEditableTable");   
     
     var objRecord = new Object(); // new CDF record obj
     objRecord.jsxid = jsx3.CDF.getKey();

     //read user input
     objRecord.Date = ""
     objRecord.Security = ""
     objRecord.Open = ""
     objRecord.High = ""
     listView.insertRecord(objRecord, null, true);   
     //listView.setSortPath("jsxid");
     listView.repaint();
  }

  /**
   * Removes selected row from CDF and repaints the grid
   * @param strRecordId - 
   */
   addRemoveCDF.doDeleteRecord = function (strRecordId) {
     addRemoveCDF.doDeleteRecordInTable(strRecordId, "mtxUpdatableTable");
   }

  /**
   * Removes selected row from CDF and repaints the grid
   * @param strRecordId - 
   * @param table - 
   */
   addRemoveCDF.doDeleteRecordInTable = function (strRecordId, table) {
     // get the table 
     var listView = addRemoveCDF.getServer().getJSXByName(table);
     var objRecord = listView.getRecord(strRecordId);

     listView.deleteRecord(strRecordId, true);
     listView.repaint();
   }
   
});