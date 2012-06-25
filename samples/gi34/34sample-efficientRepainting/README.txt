Classes:
jsx3.app.Server
jsx3.gui.Block 
jsx3.gui.Dialog
jsx3.gui.LayoutGrid
jsx3.gui.List
jsx3.gui.Stack
jsx3.gui.StackGroup
jsx3.gui.ToolbarButton
jsx3.gui.WindowBar
jsx3.gui.RadioButton
String

Methods:
effRepainting.getServer()
effLoad.loadDialogs()
effLoad.loadOneDialogEfficient()
effLoad.loadOneDialogInefficient()
effAdopt.loadOneItem()
effAdopt.transferAllItems()
effAdopt.transferItem()
effAdopt.removeAllItems()
jsx3.app.Model.load()
jsx3.app.Server.getJSXByName()


Constants:


keywords:
dialog, stack, stackGroup, efficient repainting

Description:
Dialogs  version 2.0
JSX version 3.2.0
<P align="right"><B>Efficient Painting: version 2.0</B><BR>
JSX version: 3.2.0</P>
This sample application demonstrates best practices for adding and repainting complex applications.
The rendering of HTML onscreen is often the slowest aspect of browser-based applications.  
Ensuring efficient repaints will make your applications snappier and more responsive to user input.  
The GI repaint() method will get a handle to the parent object and render it's HTML along with that of all of its children.  
This can often slow app performance when adding children to large parents. 
Two strategies are used in this example: 1) use of window.setTimeout to give the UI a chance to breathe in between inserts, 
and 2) insertHTML to efficiently add HTML to the view.
Run Project... in the GI menu to run this project outside of the Builder environment to see the performance impact of the code.  
Running this application in Builder tends to slow things down, as the various palettes in the Builder environment try to keep up 
with the rendering in the application view window.