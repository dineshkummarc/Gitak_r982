/*
Copyright 2006-2011 TIBCO Software Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

//structure/logic for resolving native objects
var _jsxlookups = {};
_jsxlookups.jsx3_gui_Block         = {
                                      undefined:{dom:"",events:"click,keydown,mousedown,mouseup,mouseover,mouseout,dblclick"}
                                     };
_jsxlookups.jsx3_gui_BlockX        = {
                                      undefined:{dom:"",events:"click,keydown,mousedown,mouseup,mouseover,mouseout,dblclick"}
                                     };
_jsxlookups.jsx3_gui_Button        = {
                                      undefined:{dom:"",events:"click,keydown,mousedown,mouseout,mouseup"}
                                     };
_jsxlookups.jsx3_gui_CheckBox      = {
                                      undefined:{dom:"",events:"click,keydown"}
                                     };
_jsxlookups.jsx3_gui_ColorPicker   = {
                                      undefined:{dom:"",events:""},
                                      gradientmap:{dom:"0,0",events:"mousedown"},
                                      colorband:{dom:"0,1",events:"mousedown"}									  
                                     };
_jsxlookups.jsx3_gui_DatePicker    = {
                                      undefined:{dom:"",events:""},
                                      textbox:{dom:"0,0",events:"change,keydown,mousewheel"},
                                      icon:{dom:"0,1",events:"click,keydown"},
                                      downyear:{dom:function(objJSX) {
                                                      return objJSX.getServer().getDocumentOf().getElementById(objJSX.getId() + "_dy");
                                                    },events:"click"},
                                      upyear:{dom:function(objJSX) {
                                                      return objJSX.getServer().getDocumentOf().getElementById(objJSX.getId() + "_uy");
                                                    },events:"click"},
                                      downmonth:{dom:function(objJSX) {
                                                      return objJSX.getServer().getDocumentOf().getElementById(objJSX.getId() + "_dm");
                                                    },events:"click"},
                                      upmonth:{dom:function(objJSX) {
                                                      return objJSX.getServer().getDocumentOf().getElementById(objJSX.getId() + "_um");
                                                    },events:"click"},
                                      day:{dom:function(objJSX,strDate) {
                                                      //strDate must adhere to format, yyyy-m-d. For example, Jan 1, 2006 would be structured: 2006-0-1
                                                      return objJSX.getServer().getDocumentOf().getElementById(objJSX.getId() + "_" + strDate);
                                                    },events:"click,mouseout,mouseover"}
                                     };
_jsxlookups.jsx3_gui_Dialog        = {
                                      undefined:{dom:function(objJSX) {                                      
                                                      return Dialog_getRenderedDialog(objJSX);
                                                    },events:"keydown,mousedown"},
                                      modalmask:{dom:function(objJSX) {
                                                      return (objJSX.getModal() == 1) ? objJSX.getRendered().childNodes[0] : null;
                                                    },events:"mousedown,mouseup,keydown"},
                                      captionbar:{dom:function(objJSX) {
                                                      var objBar = objJSX.getCaptionBar();
                                                      return (objBar) ? objBar.getRendered() : null;
                                                    },events:"mousedown"},
                                      body:{dom:function(objJSX) {
                                                      return (objJSX.getModal() == 1) ? objJSX.getRendered().childNodes[2] : objJSX.getRendered().childNodes[1];
                                                    },events:""},
                                      resizer:{dom:function(objJSX) {
                                                      return (objJSX.getResize() == 1) ? objJSX.getRendered().childNodes[3] : null;
                                                    },events:"mousedown"}
                                     };
_jsxlookups.jsx3_gui_ImageButton   = {
                                      undefined:{dom:"",events:"click,keydown,mousedown,mouseout,mouseover,mouseup"}
                                     };
_jsxlookups.jsx3_gui_LayoutGrid    = {
                                      undefined:{dom:"",events:""}
                                     };
_jsxlookups.jsx3_gui_Matrix        = {
                                      undefined:{dom:"",events:""},
                                      viewport:{dom:"1",events:"mouseup"},
                                      vscroller:{dom:"2",events:"mousedown,scroll"},
                                      hscroller:{dom:"3",events:"mousedown,scroll"},
                                      column:{dom:function(objJSX,intColumnIndex) {
                                                      //returns the visible column (display != none) at the given index (zero-based)
                                                      var objDisplayedColumns = objJSX.getChildren().filter(function(objColumn) { return objColumn && (objColumn.getDisplay() != "none"); });
                                                      var objColumn = objDisplayedColumns[intColumnIndex];
                                                      var objGUI;
                                                      if(objColumn && (objGUI = objColumn.getRendered()) != null)
                                                        return objGUI;
                                                    },events:""},
                                      rows:{dom:function(objJSX) {
                                                      return objJSX.getIterableRows();
                                                    },events:""},
                                      rowbyindex:{dom:function(objJSX,intRowIndex) {
                                                      return _jsxlookups.jsx3_gui_Matrix.rows.dom(objJSX)[intRowIndex];
                                                    },events:"mousedown"},
                                      rowbyjsxid:{dom:function(objJSX,strJsxId) {
                                                      var strId = objJSX.getId() + "_jsx_" + strJsxId;
                                                      var objDoc = objJSX.getServer().getDocumentOf();
                                                      return objDoc.getElementById(strId);
                                                    },events:"mousedown"},
                                      cellbyindex:{dom:function(objJSX,intRowIndex,intColumnIndex) {
                                                      var objRow = _jsxlookups.jsx3_gui_Matrix.rowbyindex.dom(objJSX,intRowIndex);
                                                      if(objRow != null)
                                                        return objRow.childNodes[intColumnIndex];
                                                    },events:"mousedown"},
                                      cellbyjsxid:{dom:function(objJSX,strJsxId,intColumnIndex) {
                                                      var objRow = _jsxlookups.jsx3_gui_Matrix.rowbyjsxid.dom(objJSX,strJsxId);
                                                      if(objRow != null)
                                                        return objRow.childNodes[intColumnIndex];
                                                    },events:"mousedown"},
                                      toggler:{dom:function(objJSX,strJsxId) {
                                                      //this is the plus/minus icon that the user clicks to expand/close the tree
                                                      var objRow = _jsxlookups.jsx3_gui_Matrix.rowbyjsxid.dom(objJSX,strJsxId);
                                                      // what about row by index
                                                      if(objRow != null) {
                                                        var objGUI = objRow.childNodes[0];
                                                        if(objGUI != null) {
                                                          while(objGUI && objGUI.getAttribute &&  objGUI.getAttribute("jsxtype") != "plusminus" &&
                                                                objGUI.getAttribute("jsxtype") != "paged")
                                                              objGUI = objGUI.childNodes[0];
                                                          return objGUI;
                                                        }
                                                      }
                                                    },events:"click"},
                                     icon:{dom:function(objJSX,strJsxId) {
                                        //this is the tree item itself . childNodes[0] = plusminus, childNodes[1] = icon, childNodes[2] = text label
                                         var objRow = _jsxlookups.jsx3_gui_Matrix.rowbyjsxid.dom(objJSX,strJsxId);
                                         // what about row by index
                                         if(objRow) {
                                            LOG.debug('objRow='+objRow.outerHTML);
                                            var objGUI = objRow.childNodes[0];
                                            if(objGUI != null) {
                                                while(objGUI && objGUI.getAttribute &&  objGUI.getAttribute("jsxtype") != "plusminus" &&
                                                      objGUI.getAttribute("jsxtype") != "paged")
                                                  objGUI = objGUI.childNodes[0];
                                              return objGUI.parentNode.childNodes[1];                                            }
                                          }

                                      },events:"click"}

                                      };
_jsxlookups.jsx3_gui_MatrixColumn  = {
                                       undefined:{dom:"",events:"mousedown"}
                                      };
_jsxlookups.jsx3_gui_Menu          = {
                                      undefined:{dom:function(objJSX) {
                                                      return objJSX.getRendered();
                                                    },events:"blur,focus,keydown,keypress,mouseover,mousedown,mouseout"},
                                      items:{dom:function(objJSX) {
                                                      LOG.debug('jsxlookup menu=' + objJSX);
                                                      //returns all menu items contained by the most deeply nested submenu displayed onscreen
                                                      var allItems = [];
                                                      var intIndex = 0;
                                                      var objDoc = objJSX.getServer().getDocumentOf();
                                                      var objHW;
                                                      while((objHW = objDoc.getElementById("jsx30curvisiblemenu_" + (intIndex+1))) != null) intIndex++;
                                                      LOG.debug('menu index = ' + intIndex);
                                                      objHW = objDoc.getElementById("jsx30curvisiblemenu_" + intIndex);
                                                      if (objHW) { // make sure heavyweight window is actually there.
                                                       var objKids = objHW.childNodes[0].childNodes;
                                                          if (objHW.childNodes[0].className == "jsx30scrollpane" || // GI 3.5.0 heavyweight scrollpane
                                                              objKids[0].tagName == 'SPAN' || objKids[0].tagName == 'span')  // GI 3.4.x menu use a span
                                                              objKids = objKids[0].childNodes;

                                                       var intMaxLen = objKids.length;
                                                       for(var i=0;i<intMaxLen;i++) allItems.push(objKids[i]); // copy elements just in case                                                        
                                                      }
                                                      return allItems;
                                                    },events:""},
                                      allitems:{dom:function(objJSX) {
                                                      //returns every menu item from every visible submenu displayed onscreen
                                                      var allItems = [];
                                                      var intIndex = 1;
                                                      var objDoc = objJSX.getServer().getDocumentOf();
                                                      var objHW;
                                                      while((objHW = objDoc.getElementById("jsx30curvisiblemenu_" + intIndex)) != null) {
                                                        var objKids = objHW.childNodes[0].childNodes;
                                                          if ( objHW.childNodes[0].className == "jsx30scrollpane" ||
                                                                objKids[0].tagName == 'SPAN' || objKids[0].tagName == 'span')
                                                              objKids = objKids[0].childNodes; // additional childNodes[0] level down, there's a span here in 3.4.?
                                                        var intMaxLen = objKids.length;
                                                        for(var i=0;i<intMaxLen;i++) allItems.push(objKids[i]);
                                                        intIndex++;
                                                      }
                                                      return allItems;
                                                    },events:""},
                                      itembyindex:{dom:function(objJSX,intItemIndex) {
                                                      //returns a menu item at a given position (zero-based) for the most deeply nested submenu;
                                                      //NOTE: separators are included in the index
                                                      return _jsxlookups.jsx3_gui_Menu.items.dom(objJSX)[intItemIndex];
                                                    },events:"blur,click,focus,keydown,mousedown,mouseup,mouseover,mouseout"},
                                      itembyjsxid:{dom:function(objJSX,strJsxId) {
                                                      var strId = objJSX.getId() + '_' + strJsxId;
                                                      var objDoc = objJSX.getServer().getDocumentOf();
                                                      return objDoc.getElementById(strId);
                                                    },events:"blur,click,focus,keydown,mousedown,mouseup,mouseover,mouseout"}
                                     };
_jsxlookups.jsx3_gui_RadioButton   = {
                                      undefined:{dom:"",events:"click,keydown"}
                                     };
_jsxlookups.jsx3_gui_Select        = {
                                      undefined:{dom:"",events:"keydown,mousedown"},
                                      ascombo:{dom:"",events:"focus,keydown,mousedown"},
                                      asselect:{dom:"",events:"keydown,mousedown"},
                                      textbox:{dom:"0,0,0",events:"blur"},
                                      items:{dom:function(objJSX) {
                                                      //returns all menu items contained by the most deeply nested submenu displayed onscreen
                                                      var allItems = [];
                                                      var objDoc = objJSX.getServer().getDocumentOf();
                                                      var objHW = objDoc.getElementById("jsx30curvisibleoptions");
                                                      if(objHW) {
                                                        var objKids = objHW.childNodes[0].childNodes;
                                                        if (objHW.childNodes[0].className == "jsx30scrollpane")
                                                            objKids = objKids[0].childNodes; // 3.5.x now has scrollpane
                                                        var intMaxLen = objKids.length;
                                                        for(var i=1;i<intMaxLen;i++) allItems.push(objKids[i]);
                                                      }
                                                      return allItems;
                                                    },events:""},
                                      itembyindex:{dom:function(objJSX,intItemIndex) {
                                                      //returns a select item at the given index (zero-based)
                                                      return _jsxlookups.jsx3_gui_Select.items.dom(objJSX)[intItemIndex];
                                                    },events:"blur,click,keydown,mousedown,mouseover,mouseout"},
                                      itembyjsxid:{dom:function(objJSX,strJsxId) {
                                                      var strId = objJSX.getId() + '_' + strJsxId;
                                                      LOG.debug('jsxlookup id  =' + strId);
                                                      var objDoc = objJSX.getServer().getDocumentOf();
                                                      return objDoc.getElementById(strId);
                                                    },events:"blur,click,keydown,mousedown,mouseover,mouseout"}
                                     };
_jsxlookups.jsx3_gui_Slider        = {
                                      undefined:{dom:"",events:"keydown,mousewheel"},
                                      track:{dom:"0,0",events:"mousedown"},
                                      handle:{dom:"0,1",events:"click"}
                                     };
_jsxlookups.jsx3_gui_Splitter      = {
                                      undefined:{dom:"",events:""},
                                      bar:{dom:"0",events:"mousedown"}
                                     };
_jsxlookups.jsx3_gui_Stack         = {
                                      undefined:{dom:"",events:""},
                                      handle:{dom:"0",events:"click,keypress,mouseover,mouseout"}
                                     };
_jsxlookups.jsx3_gui_StackGroup    = {
                                      undefined:{dom:"",events:""}
                                     };
_jsxlookups.jsx3_gui_Tab           = {
                                      undefined:{dom:"",events:"click,keydown,mouseout,mouseover,mouseup"}
                                     };
_jsxlookups.jsx3_gui_TabbedPane    = {
                                      undefined:{dom:"",events:"mouseup"}
                                     };
_jsxlookups.jsx3_gui_Table    = {
                                  undefined:{dom:"",events:"mouseup,mousedown,mouseover,click,dblclick"},
                                  header: {dom:"",events:"mouseup"},
                                  rows:{dom:function(objJSX) {
                                              return _jsxlookups.jsx3_gui_Table_getIterableRows(objJSX.getRendered());
                                            },events:""},
                                  rowbyindex:{dom:function(objJSX,intRowIndex) {
                                              return _jsxlookups.jsx3_gui_Table.rows.dom(objJSX)[intRowIndex];
                                            },events:"mousedown,mouseover"},
                                  rowbyjsxid:{dom:function(objJSX,strJsxId) {
                                                    var strId = objJSX.getId() + "_" + strJsxId;
                                                    var objDoc = objJSX.getServer().getDocumentOf();
                                                    return objDoc.getElementById(strId);
                                                  },events:"mousedown,mouseover"},
                                  cellbyindex:{dom:function(objJSX,intRowIndex,intColumnIndex) {
                                                     var objRow = _jsxlookups.jsx3_gui_Table.rowbyindex.dom(objJSX,intRowIndex);
                                                     if(objRow != null)
                                                       return objRow.childNodes[intColumnIndex];
                                                  },events:"mousedown"},
                                  cellbyjsxid:{dom:function(objJSX,strJsxId,intColumnIndex) {
                                                      var objRow = _jsxlookups.jsx3_gui_Table.rowbyjsxid.dom(objJSX,strJsxId);
                                                      if(objRow != null)
                                                        return objRow.childNodes[intColumnIndex];
                                                  },events:"mousedown"}
                                };
_jsxlookups.jsx3_gui_TextBox    = {
                                      undefined:{dom:"",events:"blur,change,dblclick,focus,keydown,keypress,keyup,mouseup,mousewheel,scroll"}
                                  };
_jsxlookups.jsx3_gui_TimePicker = {
                                      undefined:{dom:"",events:""},
                                      hour:{dom:"0,0",events:"blur,focus,keydown,mousewheel"},
                                      minute:{dom:"0,2",events:"blur,focus,keydown,mousewheel"},
                                      second:{dom:function(objJSX) {
                                          if (objJSX.getShowSeconds() == 1)
                                            return objJSX.getRendered().childNodes[0].childNodes[4];
                                      },events:"blur,focus,keydown,mousewheel"},
                                      milli:{dom:function(objJSX) {
                                          if (objJSX.getShowMillis() == 1)
                                            return objJSX.getRendered().childNodes[0].childNodes[6];
                                      },events:"blur,focus,keydown,mousewheel"},
                                      ampm:{dom:function(objJSX) {
                                          if (objJSX.is24Hour() == 1) return; // no ampm
                                          var offsetSecond = objJSX.getShowSeconds() * 2;
                                          var offsetMillis = objJSX.getShowSeconds() * objJSX.getShowMillis() * 2;
                                          var offset = 4 + offsetSecond + offsetMillis;
                                          return objJSX.getRendered().childNodes[0].childNodes[offset];
                                      },events:"blur,focus,keydown,mousewheel"},
                                      spinup:{dom:function(objJSX) { // 0>hour,1>:,2>min,3>:,4>sec,5>
                                          var offset24Hour = (objJSX.is24Hour() == 1) ? 0 : 2 ; // opposite 1 => 0
                                          var offsetSecond = objJSX.getShowSeconds() * 2;
                                          var offsetMillis = objJSX.getShowSeconds() * objJSX.getShowMillis() * 2;
                                          var offset = 4 + offset24Hour + offsetSecond + offsetMillis - 1;
                                          // base child node index is 5
                                          return objJSX.getRendered().childNodes[0].childNodes[offset].childNodes[0];
                                      },events:"click,mousedown"},
                                      spindown:{dom:function(objJSX) {  //"0,5,1"
                                          var offset24Hour = (objJSX.is24Hour() == 1) ? 0 : 2;
                                          var offsetSecond = objJSX.getShowSeconds() * 2;
                                          var offsetMillis = objJSX.getShowSeconds() * objJSX.getShowMillis() * 2;
                                          var offset = 4 + offset24Hour + offsetSecond + offsetMillis - 1;                                          // base child node index is hour[0],:[1],min[2], [3], up[4,0] = 0sec+0milli+0ampm
                                          return objJSX.getRendered().childNodes[0].childNodes[offset].childNodes[1];
                                      },events:"click,mousedown"}
                                     };
_jsxlookups.jsx3_gui_ToolbarButton = {
                                        undefined:{dom:"",events:"blur,focus,keydown,keypress,mouseover,mousedown,mouseout"}
                                     };
_jsxlookups.jsx3_gui_Tree =          {
                                      undefined:{dom:"",events:"focus"},
                                      items:{dom:function(objJSX) {
                                                      //returns all nodes that have been painted on-screen. 
                                                      //Specifically returns the caption row(s) (which contains: toggler [0], icon [1], label [2])
                                                      return _jsxlookups._jsx3_gui_Tree_items(objJSX.getRendered(),[]);
                                                    },events:""},
                                      itembyjsxid:{dom:function(objJSX,strJsxId) {
                                                      //returns the caption row for the item (which contains: toggler [0], icon [1], label [2])
                                                      var strId = objJSX.getId() + "_" + strJsxId;
                                                      var objDoc = objJSX.getServer().getDocumentOf();
                                                      var objItem = objDoc.getElementById(strId);
                                                      if(objItem != null) {
                                                        return objItem.childNodes[0];
                                                      }
                                                    },events:""},
                                      itembyindex:{dom:function(objJSX,intItemIndex) {
                                                      //returns the caption row for the item (which contains: toggler [0], icon [1], label [2])
                                                      return _jsxlookups.jsx3_gui_Tree.items.dom(objJSX)[intItemIndex];
                                                    },events:""},
                                      togglerbyjsxid:{dom:function(objJSX,strJsxId) {
                                                      //returns plus/minus icon
                                                      var objItem = _jsxlookups.jsx3_gui_Tree.itembyjsxid.dom(objJSX,strJsxId);
                                                      if(objItem != null) {
                                                        return objItem.childNodes[0];
                                                      }
                                                    },events:"click"},
                                      iconbyjsxid:{dom:function(objJSX,strJsxId) {
                                                      //returns user-defined icon
                                                      var objItem = _jsxlookups.jsx3_gui_Tree.itembyjsxid.dom(objJSX,strJsxId);
                                                      if(objItem != null) {
                                                        return objItem.childNodes[1];
                                                      }
                                                    },events:"click,dblclick,keydown,mousedown,mouseout,mouseover,mouseup"},
                                      labelbyjsxid:{dom:function(objJSX,strJsxId) {
                                                      //returns the text label
                                                      var objItem = _jsxlookups.jsx3_gui_Tree.itembyjsxid.dom(objJSX,strJsxId);
                                                      if(objItem != null) {
                                                        return objItem.childNodes[2];
                                                      }
                                                    },events:"click,dblclick,keydown,mousedown,mouseout,mouseover,mouseup"},
                                      togglerbyindex:{dom:function(objJSX,intItemIndex) {
                                                      //returns plus/minus icon
                                                      var objItem = _jsxlookups.jsx3_gui_Tree.itembyindex.dom(objJSX,intItemIndex);
                                                      if(objItem != null) {
                                                        return objItem.childNodes[0];
                                                      }
                                                    },events:"click"},
                                      iconbyindex:{dom:function(objJSX,intItemIndex) {
                                                      //returns user-defined icon
                                                      var objItem = _jsxlookups.jsx3_gui_Tree.itembyindex.dom(objJSX,intItemIndex);
                                                      if(objItem != null) {
                                                        return objItem.childNodes[1];
                                                      }
                                                    },events:"click,dblclick,keydown,mousedown,mouseout,mouseover,mouseup"},
                                      labelbyindex:{dom:function(objJSX,intItemIndex) {
                                                      //returns the text label
                                                      var objItem = _jsxlookups.jsx3_gui_Tree.itembyindex.dom(objJSX,intItemIndex);
                                                      if(objItem != null) {
                                                        return objItem.childNodes[2];
                                                      }
                                                    },events:"click,dblclick,keydown,mousedown,mouseout,mouseover,mouseup"}
                                     };
_jsxlookups.jsx3_gui_WindowBar =     {
                                      undefined:{dom:"",events:""}
                                     };


//deprecated structures
_jsxlookups.jsx3_gui_Column = {undefined:{dom:"",events:""}};
_jsxlookups.jsx3_gui_Grid = {undefined:{dom:"",events:""}};
_jsxlookups.jsx3_gui_List = {undefined:{dom:"",events:""}};

//recursive functions used to avoid adding code to the core framework
_jsxlookups._jsx3_gui_Tree_items = function(objGUI,objArray) {
  if (objGUI) {
   var objKids = objGUI.childNodes;
   if(objKids != null) {
    for(var i=0;i<objKids.length;i++) {
      if(objKids[i].tagName && objKids[i].tagName.toLowerCase() != "img") {
        //add the caption row to the array of items
        objArray.push(objKids[i].childNodes[0]);
        //recurse, using the content row as the parent to look within for children
        _jsxlookups._jsx3_gui_Tree_items(objKids[i].childNodes[1],objArray);
      }
    }
   }
  }
  return objArray;
};

_jsxlookups.jsx3_gui_Table_getIterableRows = function(objGUI) {
    var myToken;
    var objRows = [];
    if (objGUI) {	
      var rows = objGUI.childNodes[0].childNodes[0].rows;
      for (var i=0; i< rows.length;i++) {
        objRows.push(rows[i]);
      }
    }
	return objRows;
};


//Returns a native HTML object that can be acted upon per a given control type
//For example, if objJSX is an instance of jsx3.gui.Slider element and STYPE is handle, the return is a DIV object (e.g., [native_gui_object].childNodes[0].childNodes[1])
//to get the day object for Jan 1, 2006, call:   getActionableObject(yourDatePickerInstance,"day","2006-0-1");   Note that the format is yyy-m-d
function getActionableObject(objJSX,STYPE) {
  if(objJSX) {
    var objClass = objJSX.getClass();
    var className = objClass.getName().replace(/\./g,"_");
	// When objJSX is a sub-class of jsx3.gui.Foo, we need to figure out which Foo this object was derived from -- Jim & Peter CDC 2007-08-09
    while (!(_jsxlookups[className]) && (objClass = objClass.getSuperClass()) ) {
        className = objClass.getName().replace(/\./g,"_");
    }

    var domGetter = _jsxlookups[className][STYPE+""].dom;
    var objGUI = objJSX.getRendered();
    if(typeof(domGetter) == "function") {
      //the native HTML element will be resolved by calling a custom function
      objGUI = domGetter(objJSX,arguments[2],arguments[3]);
    } else if (domGetter != "") {
      //the native HTML element will be resolved by traversing the DOM
      var objStruct = domGetter.split(/\s*,\s*/);
      for(var i=0;i<objStruct.length;i++)
         objGUI = (objGUI) ? objGUI.childNodes[objStruct[i]-0] : null; 
    }
    return objGUI;
  }
  return null;
}


//Returns a comma-delimited list of supported events per a given actionable object.
//For example, getSupportedEvents("jsx3.gui.Slider","handle") returns onclick
function getSupportedEvents(strClassName,STYPE) {
  strClassName = strClassName.replace(/\./g,"_");

  return _jsxlookups[strClassName][STYPE+""].events;
}


//Returns a comma-delimited list of known actionable objects for a given GUI class.
//For example, getActionableConstants("jsx3.gui.Slider") returns undefined, track, handle
function getActionableConstants(strClassName) {
  var strName = strClassName.replace(/\./g,"_");

  // Here, also need to find the jsx3.gui super class when obj is a derived classs -- dhwang
  while (!(_jsxlookups[strName]) && (obj = obj.getSuperClass()) ) {
            strName = obj.getName().replace(/\./g,"_");
 }

  var objStruct = _jsxlookups[strName];
  var a = [];
  for(var p in objStruct) {
    a.push(p);
  }
  return a.join(",");
}

function Dialog_getRenderedDialog(objJSX) {
   if (objJSX) {
     var objGUI = objJSX.getRendered();
     LOG.debug("objGUI : " + jsx3.html.getOuterHTML(objGUI) );
     if (objJSX.jsxmodal) {
       return objGUI.childNodes[1];
     } else {
       return objGUI;
     }
   } 
 };
 


