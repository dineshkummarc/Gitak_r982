/**
 * Define a namespace
 * Don't define the same namespace in other script files. See for example mutiInstances.js
 * 
 * Ceate a package. 
 * jsx3.lang.Package.definePackage("sfn.dialogs", function(dialogs) { Your functions } )
 * @see jsx3.lang.Package
 */
jsx3.lang.Package.definePackage("eg.sampledialogs", function(sampledialogs) {
// application server object
sampledialogs.APP; 
/**
 * Clear work area
 *
 * @param workArea {jsx3.app.Model} ? the JSX object to be cleared.
 */
sampledialogs.clearWorkArea = function(workArea) {
       workArea.removeChildren();
}
/**
* Launches a none existing gui as a child of the target.
* brings an existing gui forward instead of launching it again
*
* @param target {jsx3.app.Model} ? JSX Object.
* @guiFile {String} the serialization file to deserialize. Base diectory is 'components/'
* @bClear {boolean} if true clear the work area before load();
*
* @see jsx3.app.Model.load()
*/
sampledialogs.launchComponent= function(target,guiFile,bClear){
    var componentName = guiFile.doReplace('.xml','')
    if(bClear){
       sampledialogs.clearWorkArea(target);
    }
   var objDialog = target.getChild(componentName);
   if (!objDialog){
    objDialog =  target.load("components/"+guiFile);
    objDialog.setName(componentName);
   }
   else{
    objDialog.focus();
   }
return objDialog;
}
/**                                       
  * Launches a simple dialog as a child of server body block if one dosen't exists. 
  * Brings an existing dialog forward instead of launching it again    
  */
sampledialogs.launchSimple = function() {
   var objDialog = eg.sampledialogs.APP.getBodyBlock().getChild('dlgSimpleDialog');
   if (!objDialog){
   objDialog = eg.sampledialogs.APP.getBodyBlock().load("components/simpleDialog.xml");
        }
   else{
    objDialog.focus();
   }
}
/**
 * Show salert bound to dialog box.
 */
sampledialogs.showDialogAlert = function() {
  eg.sampledialogs.APP.getJSXByName("dlgParentDialog").alert("Dialog Alert","<p>This is an alert bound to this dialog.</p>  <p>Note that while the application is still active, the dialog is disabled.</p>");
}
/**
 * Shows confirm alert.
 */
sampledialogs.showConfirmAlert = function() {
 eg.sampledialogs.APP.confirm("Confirm Alert","<p>This is a confirm alert.</p>");
}
/**
 * Shows prompt alert.
 */
sampledialogs.showPromptAlert = function() {
  eg.sampledialogs.APP.prompt("Prompt Alert","<p>This is a prompt alert.</p>", sampledialogs.showJSAlert);
}
/**
 * Displays alert and closes dialog box that called the function.
 *
 * @param objDialog {jsx3.gui.Dialog} dialog box to close.
 * @param textToDisplay {String} string to be displayed in alert.
 */
sampledialogs.showJSAlert = function(objDialog, textToDisplay) {
  alert(textToDisplay);
  objDialog.doClose();
}
/**
 * Shows alert bound to application's server instance.
 */
sampledialogs.showServerAlert = function() {
  eg.sampledialogs.APP.alert("My Alert","<p>This is an alert bound to this application's server instance.</p>  <p>Note that the user cannot interact with the application until the alert is dismissed.</p>");
}
/**
 * Formats error.
 */
sampledialogs.formatErr = function(err){
   alert("Error:  "+err);
}
});