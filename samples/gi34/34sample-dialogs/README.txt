Classes:
jsx3.app.Server
jsx3.gui.Block 
jsx3.gui.Dialog
jsx3.gui.LayoutGrid
jsx3.gui.Matrix
jsx3.gui.Stack
jsx3.gui.StackGroup
jsx3.gui.ToolbarButton
jsx3.gui.WindowBar
String

Methods:
eg.dialogs.clearWorkArea()
eg.dialogs.getServer()
eg.dialogs.launchInApp()
eg.dialogs.launchSimple()
eg.dialogs.openSelectedStocks()
eg.dialogs.showAlertStack()
eg.dialogs.showAppLayout()
eg.dialogs.showConfirmAlert()
eg.dialogs.showDialogAlert()
eg.dialogs.showEscaping()
eg.dialogs.showJSAlert()
eg.dialogs.showModifiedDialogs()
eg.dialogs.showMultiDialogs()
eg.dialogs.showPromptAlert()
eg.dialogs.showServerAlert()
jsx3.app.Model.load()
jsx3.app.Model.setName()
jsx3.app.Model.getChild()
jsx3.app.Server.alert()
jsx3.app.Server.confirm()
jsx3.app.Server.getBodyBlock()
jsx3.app.Server.getJSXByName()
jsx3.app.Server.prompt()
jsx3.gui.Block.setText()
jsx3.gui.Dialog.alert()
jsx3.gui.Dialog.doClose()
jsx3.gui.Dialog.focus()
jsx3.gui.List.getRecordNode()
jsx3.gui.List.getSelectedIds()
jsx3.lang.Package.definePackage()
jsx3.xml.Entity.getAttribute()

Constants:


keywords:
dialog, components, instantiate components, loading, loading components, remove children, add children, alert, overflow, expand

Description:
Dialogs  version 2.0
JSX version 3.1.0
This sample application demonstrates a number of ways to create and instantiate GUI components, in this case dialogs.
The whole application is a set of components. These components can have their own JavaScript files. 
In this sample the Multi Instance application has its own JavaScript file called multiInstances.js that shows how to 
read information from a list, create and load jsx3.gui objects with or without a serialization file, and verify if a 
dialog with a unique name already exists. 
The process of loading components on demand will keep applications snappy for end users. 
Also, splitting the whole application in smaller components makes it easier for maintenance. 
These components can be saved as a user component and be used in other applications too. 
There are to JavaScript files In This version of Dialogs: One defines the logic fur multi 
instance application and the other one defines the logic of other applications. The most i
mportant function in logic.js is sfn.launchComponent() that loads a component in a target area and is used in almost all components. 
