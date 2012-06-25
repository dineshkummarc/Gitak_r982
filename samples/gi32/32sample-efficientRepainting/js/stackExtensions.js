/*
 * Extension to jsx3.gui.StackGroup.insertHTML. Allows dynamic content to be added without
 * requiring a full repaint of the stack and all its children
 * @param objJSX {jsx3.gui.Stack}
 */
  function insertHTML(objJSX) {
   //don't subclass when the stackgroup is owned by the IDE
   if(this.getNS() != "IDE") {
    if(objJSX.isInstanceOf("jsx3.gui.Stack")) {
      var objGUI = this.getRendered();
      if(objGUI != null) {
        //get handle to tbody for the stackgroup
        if(this.getChildren().length > 1 && (objTBody = objGUI.childNodes[0].childNodes[0]) != null) {
          var objTR = document.createElement("TR");
          var objTD = document.createElement("TD");
          objTR.appendChild(objTD);
          objTBody.appendChild(objTR);
          // Inserts the given HTML text into the element at the location.
          objTD.insertAdjacentHTML("BeforeEnd",objJSX.paint());
          //activate the new stack; this will also set the size of the dimension array
          objJSX.doShow();
          return;
        }
        //just repaint; if tbody doesn't exist or objJSX is the first child, just as efficient to repaint
        this.repaint();
      }
    }
   } else {
     this.doCallSuper("jsx3.gui.LayoutGrid","insertHTML",objJSX);
   }
  }
  jsx3.gui.StackGroup.prototype.insertHTML = insertHTML;
/*
 * Subclass of jsx3.gui.Block.destroyView. Allows content to removed from the VIEW without a repaint
 */
  function destroyView() {
    //don't subclass when the stack is owned by the IDE
    if(this.getNS() != "IDE") {
      var objGUI = this.getRendered();
      if(objGUI) {
        var objTR = objGUI.parentNode.parentNode;
        var objParent = jsx3.BrowserDOM.getJSXParent(objTR);
        if(objParent.getChildren().length == 0) {
          objParent.repaint();
        } else {
          var intMyIndex = objTR.rowIndex;
          var intCurIndex = objParent.getSelectedIndex();
          var objTBODY = objTR.parentNode;
          objTBODY.removeChild(objTR);
          if(intCurIndex == intMyIndex || intCurIndex == intMyIndex -1)  {
            objParent.setSelectedIndex(-1);
            objParent.getChild(0).doShow(false);
          }
        }
      }
    }
  }
  jsx3.gui.Stack.prototype.destroyView = destroyView;