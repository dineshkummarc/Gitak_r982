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
 




/*
Copyright 2006-2011 TIBCO Software, Inc

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 (0.7) Initial release -- dhwang
 (0.8) Updated with selenium 0.8.2
        - see the release notes under gitak/gi for list of changed and new features.
        - added include command, which is modified from include command v2.1 by Robert Zimmermann
 (0.9) Updated to Selenium 0.8.3 core, Selenium RC 0.9.2
 (0.9.1) update support for Firefox 3
		- Add gi dom locator, "gi".
    - Add jsxselector , css3 like, gi dom locator.
    - Add recorder playback
 (1.0) Upgrade to Selenium 1.0.1
 */

/* element outerHTML works only on IE. jsx3.html.getOuterHTML() is GI 3.2 crossbrowser function*/
function getOuterHTML(element) {
    if (!element) return "element is null or undefined!";
    if (jsx3.html)
      return jsx3.html.getOuterHTML(element);
    else // if we're not running 3.2.0 use default, which works only in IE.
      return element.outerHTML;
}

function _triggerKeyEvent(element, keyType, key, canBubble) {
    triggerKeyEvent(element, keyType, key, canBubble,
        selenium.browserbot.controlKeyDown,
        selenium.browserbot.altKeyDown,
        selenium.browserbot.shiftKeyDown,
        selenium.browserbot.metaKeyDown);
}
function _triggerEvent(element, eventType, canBubble) { // old version
   triggerEvent(element, eventType, canBubble, false, false, false, false);
}

function triggerLeftMouseEvent(element, eventType, canBubble, objPos) {
    var clientX = 0;
    var clientY = 0;
    var screenX = 0;
    var screenY = 0;
    var controlKey = false;
    var shiftKey = false;
    var altKey = false;
    var metaKey = false;
    if (objPos) {
        LOG.debug("event " + eventType + " pos T = " + objPos.T + " L=" +  objPos.L );
        clientX = objPos.L;
        clientY = objPos.T;
    }
    if (selenium.browserbot) {
          controlKey = selenium.browserbot.controlKeyDown;
          shiftKey = selenium.browserbot.shiftKeyDown;
          altKey = selenium.browserbot.altKeyDown;
          metaKey = selenium.browserbot.metaKeyDown;
    }

    canBubble = (!canBubble) ? true : canBubble;
    if (element.fireEvent && element.ownerDocument && element.ownerDocument.createEventObject) { // IE
        var evt = element.ownerDocument.createEventObject();
        evt.clientY = clientY;
        evt.clientX = clientX;
        evt.detail = 0;
        evt.screenX = screenX;
        evt.screenY = screenY;
        evt.ctrlKey = controlKey;
        evt.shiftKey = shiftKey;
        evt.altKey = altKey;
        evt.metaKey = metaKey;
       
		// event.button is used with the onmousedown, onmouseup, and onmousemove events.
    //    For other events, it defaults to 0 regardless.
        if (eventType == 'mousedown' || eventType == 'mouseup')
            evt.button = (document.documentMode >= 9 ? 0 : 1); // IE uses concept of button mask 0=none 1=left 2=right 3=left+right 4=middle.
        else
            evt.button = 0; // GI specific. Use button 0 regardless of IE defaults.
			
        evt.bubbles = canBubble;
        evt.relatedTarget = null;
		
        LOG.debug('fire event='+ eventType + ",button="+ evt.button +",ctrl key="+ evt.ctrlKey + ",shft key=" + evt.shiftKey);
        element.fireEvent('on' + eventType, evt);
    }
    else {
        var evt = document.createEvent('MouseEvents');
        var button = 0; // Mozilla left=0, middle=1, right=2
	
        if (evt.initMouseEvent)
        {
            LOG.debug("element has initMouseEvent eventType ="+ eventType +",controlKey="+ controlKey +",shiftKey="+ shiftKey);
             
            evt.initMouseEvent(eventType, canBubble, true, document.defaultView, 1, screenX, screenY, clientX, clientY,
                    controlKey, altKey, shiftKey, metaKey, button, null);
        }
        else {
            LOG.debug("element doesen't has initMouseEvent");
            evt.initEvent(eventType, canBubble, true);
            evt.shiftKey = shiftKey;
            evt.metaKey = metaKey;
            evt.altKey = altKey;
            evt.ctrlKey = controlKey;
        }

        element.dispatchEvent(evt);
    }
}


/* Fire a right mouse button mouse event in a browser-compatible manner */
function triggerRightMouseEvent(element, eventType, canBubble, objPos) {
    canBubble = (!canBubble) ? true : canBubble;
    LOG.debug("right mouse event type = " + eventType);
    var screenX = 0;
    var screenY = 0;
    if (element.fireEvent && element.ownerDocument && element.ownerDocument.createEventObject) { // IE
        var evt = element.ownerDocument.createEventObject();
        if (objPos && objPos.T) {
          LOG.debug("event pos T = " + objPos.T + " L=" +  objPos.L );
          evt.clientY = objPos.T;
          evt.clientX = objPos.L;
        }
        evt.detail = 1;
        evt.screenX = screenX;
        evt.screenY = screenY;
        evt.ctrlKey = false;
        evt.shiftKey = false;
        evt.altKey = false;
        evt.metaKey = false;

        if (selenium.browserbot) {
            evt.ctrlKey = selenium.browserbot.controlKeyDown;
            evt.shiftKey = selenium.browserbot.shiftKeyDown;
            evt.altKey = selenium.browserbot.altKeyDown;
            evt.metaKey = selenium.browserbot.metaKeyDown;
        }
		
        evt.bubbles = canBubble;
	    evt.relatedTarget = element;
        evt.button = 2;
        element.fireEvent('on' + eventType, evt);
    }
    else {
        var evt = document.createEvent('MouseEvents');
        var localY = 0;
        var localX = 0;

        if (objPos && objPos.T) {
          localY=objPos.T;
          localX=objPos.L;
        }
        evt.initMouseEvent(eventType, canBubble, true, window, 1, screenX, screenY, localX, localY, false, false, false, false, 2, null);
        element.dispatchEvent(evt);
    }
}

function _triggerMouseEvent(element, eventType, canBubble, clientX, clientY) {
    var objPos = {};
    clientX = clientX ? clientX : 0;
    clientY = clientY ? clientY : 0;
    objPos.L = clientX;
    objPos.T = clientY;

    triggerLeftMouseEvent(element, eventType, canBubble, objPos);
}
// helper,
function getAbsoluteTop(elmId) {
	// Get an object top position from the upper left viewport corner
	// Tested with relative and nested objects
    var o = elmId;
	oTop = o.offsetTop;            // Get top position from the parent object
	while(o.offsetParent) { // Parse the parent hierarchy up to the document element
		oParent = o.offsetParent;  // Get parent object reference
		oTop += oParent.offsetTop; // Add parent top position
		o = oParent;
	}
	// Return top position
	return oTop;
}
function getAbsoluteLeft(elmId) {
	// Get an object top position from the upper left viewport corner
	// Tested with relative and nested objects
    var o = elmId; // must be an HTML element
 	oLeft = o.offsetLeft;            // Get top position from the parent object
	while(o.offsetParent) { // Parse the parent hierarchy up to the document element
		oParent = o.offsetParent;  // Get parent object reference
		oLeft += oParent.offsetLeft; // Add parent top position
		o = oParent;
	}
	// Return top position
	return oLeft;
}

// remove first and last ' or " string quotes
function stripQuotes(qstr) {
    if ((qstr.indexOf('"') === 0) || qstr.indexOf("'") === 0) {
       qstr = qstr.slice(1, -1);
    }//LOG.debug('stripped text='+qstr)
    return qstr;
}

// parse name=value string into ['name', 'value']
function getNameValue(nameValueString) {
    var params = nameValueString;

    pattern = /^(\w+)=(.+)/;
    params = nameValueString.match(pattern);

    if (params instanceof Array)
        return {name:params[1], value:params[2]};
    else
        return params;
}

function getNameId(nameIdString) {
    var params = nameIdString;

    if (nameIdString.indexOf(',') != -1)
     params = nameIdString.split(',');

    if (params instanceof Array) {
        params[1] = stripQuotes(params[1]);
        return {name:params[0].trim(), id:params[1].trim()};
    }
    else
        return params;
}

/**
* jsxopen - Open a GI application from given URL
* @param url {String} the URL path fo the GI application
*/
Selenium.prototype.doJsxopen = function (url) {
    var ts_open = new Date();
    this.browserbot.openLocation(url);
    LOG.debug('open jsx url=' + url);
    
    var w = selenium.browserbot.getCurrentWindow();
    var self = this;
    var isJsxLoaded = function () {      
      if ( self.isPageLoaded || self.browserbot.isNewPageLoaded()) {
        self.isPageLoaded = true;
        if (w.jsx3) {
		  window.top.jsx3 = w.jsx3;
          //var jsx3 = w.jsx3;		 
          var apps = null;
          if (jsx3.lang && jsx3.lang.System && jsx3.lang.System.getAllApps)
            apps = jsx3.lang.System.getAllApps();
          else if (jsx3.app && jsx3.app.Server && jsx3.app.Server.allServers)
            apps = jsx3.app.Server.allServers();

          if (apps && apps.length > 0) {
            var app = apps[apps.length-1];
            var jsxbody = app.getJSXByName("JSXBODY");
            var isJsxBodyLoaded = ( jsxbody && jsxbody.getChild(0) && jsxbody.getChild(0).getRendered() ) ;
            LOG.debug("isJsxBodyLoaded check :"+ isJsxBodyLoaded); // can only check for the first application block
            if (isJsxBodyLoaded) {
               self._jsxappname = app;
               delete self.isPageLoaded;
               var ts_elapsed = ( new Date() ) - ts_open;
               self.doEcho("elapsed " + ts_elapsed + "ms");
               return true;
             }
          }
        }
      } // isPageLoaded     
      return false;
    };
    
    return Selenium.decorateFunctionWithTimeout(isJsxLoaded, this.defaultTimeout);
};

//Copy input element value or text.
Selenium.prototype.doCopy = function(locator) {
/**
 * Copy the text or input element value of a locator.
 * @param locator {String} locator string for element to retrieve text from
 */
 var element = this.browserbot.findElement(locator);
 var clip = element.value || getText(element);
 jsx3.html.copy(clip);
};

Selenium.prototype.doPaste = function(locator, storeName) {
/**
 * Paste current clipboard content to an input box
 * @param locator {String} locator string for element to paste to
 * @param storeName 
 *
*/
  var clip = jsx3.html.paste();
  if (storeName) {
    storedVars[storeName] = clip; // save the clipboard content to ${storedName}
  }
  var element = this.browserbot.findElement(locator);
  if (element && element.tagName == "input") {
    this.browserbot.replaceText(element, clip);
  }
};

Selenium.prototype.doFireRightMouse = function(locator, eventName) {
	/**
   * Explicitly simulate an event from right mouse button, to trigger the corresponding &quot;on<em>event</em>&quot;
   * handler.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param eventName the event name, e.g. "focus" or "blur"
   */
    var element = this.browserbot.findElement(locator);
    var pos = (storedVars.LASTJSXOBJ) ? storedVars.LASTJSXOBJ.getAbsolutePosition() :
              jsx3.html.getRelativePosition(null, element);

    triggerRightMouseEvent(element, eventName, false, pos);
};

Selenium.prototype.doFireLeftMouse = function(locator, eventName) {
	/**
   * Explicitly simulate an event from left mouse button, to trigger the corresponding &quot;on<em>event</em>&quot;
   * handler.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param eventName the event name, e.g. "focus" or "blur"
   */
    var element = this.browserbot.findElement(locator);
    var pos = (storedVars.LASTJSXOBJ) ? storedVars.LASTJSXOBJ.getAbsolutePosition() :
              jsx3.html.getRelativePosition(null, element);

    triggerLeftMouseEvent(element, eventName, false, pos);
};

Selenium.prototype.isAllImagesComplete = function() {
/**
isAllImagesComplete - Checks to see if all images on the page have complete property set.

Related Assertions, automatically generated:

assertAllImagesComplete( )
assertNotAllImagesComplete ( )
verifyAllImagesComplete ( )
verifyNotAllImagesComplete ( )
waitForAllImagesComplete ( )
waitForNotAllImagesComplete ( )

*/
    var elements = this.browserbot.getCurrentWindow(true).document.getElementsByTagName('img');
    var result = true;

    for (var i = 0; i < elements.length; i++) {
       if (! elements[i].complete ) {
               result = false;
               LOG.error('image src=' + elements[i].src + ' not loaded');
               //break; // don't stop, check all images
        }
    }
    return result;
};


Selenium.prototype.isImageComplete = function(idsrc) {
/** Check if given image element is loaded completely.
  * @param idsrc {String} element id or src attribute
  *
  */
    var imgElement = this.browserbot.getCurrentWindow(true).document.getElementById(idsrc);
    if (!imgElement) { // do src path search
      var elements = this.browserbot.getCurrentWindow(true).document.getElementsByTagName('img');
      for (var i = 0; i < elements.length; i++) {
       //LOG.debug(idsrc + " img src = " + elements[i].src );
       if ( PatternMatcher.matches(idsrc, elements[i].src)  ) {
            imgElement = elements[i];
            //LOG.debug(idsrc + ' found! ' +  imgElement.src );
        }
      }
    }
    return (imgElement) ? imgElement.complete : false;
};


Selenium.prototype.doChooseJsxCancelConfirmPrompt = function(text) {
/** ChooseCancelConfirmPrompt -- choose cancel on confirm or prompt dialog.
 * @param text {String} Prompt/Comfirm caption text or body text
 *
*/   LOG.debug("doChooseJsxCancelNext label = " + text );

   // alert belong to system root, unless spawn from a dialog object, which is rare
   var oBlock = this.browserbot.findByJsxText(text);

   if (!oBlock) {
     Assert.fail("Alert caption text or message text '" + text + "' not found.");
     return;
   }
   LOG.debug('object = ' + oBlock);
   var dialog = oBlock.getAncestorOfType('jsx3.gui.Dialog');
   if (dialog) {
     LOG.debug("alert = " + dialog);
     LOG.debug("text = " +  dialog.getDescendantOfName('message').getText() );
     var cancelButton = dialog.getDescendantOfName('cancel');
     if (cancelButton) {
       LOG.debug("cancel button = " +  cancelButton );
       _triggerEvent(cancelButton.getRendered(), 'focus', true);
       _triggerMouseEvent(cancelButton.getRendered(), 'click', true);
     }
   } else {
     Assert.fail("Jsx alert dialog containing '" + text + "' not found.");
   }
};

Selenium.prototype.doCheckJsx = function(locator) {
    /** Check a jsx3.gui.RadioButton or jsx3.gui.CheckBox control.
     * @param locator {String} RadioButton or CheckBox locator
    */
   var outerSpan = this.browserbot.findElement(locator);
   if (outerSpan) {
     //LOG.debug("outerSpan = " + getOuterHTML(outerSpan));
     var input= outerSpan.childNodes[0];
     if (!input.checked) // click only if not yet checked, to check it
        _triggerMouseEvent(outerSpan, 'click', true);
   } else
    Assert.fail("Cannot check checkbox, " + locator + " not found");

};

Selenium.prototype.doUnCheckJsx = function(locator) {
    /** UnCheck a jsx3.gui.RadioButton or jsx3.gui.CheckBox control.
     * @param locator {String} RadioButton or CheckBox locator
    */
   var outerSpan = this.browserbot.findElement(locator);
   if (outerSpan) {
     //LOG.debug("outerSpan = " + getOuterHTML(outerSpan));
     var input= outerSpan.childNodes[0];
     if (input.checked) // click only if checked to uncheck it
        _triggerMouseEvent(outerSpan, 'click', true);
   } else
    Assert.fail("Cannot uncheck checkbox, " + locator + " not found");
};

Selenium.prototype.doPartialCheckJsx = function(locator) {
/** Partial check jsx3.gui.CheckBox control [-] partial checked state
  * @param locator {String} CheckBox locator
  */
    var objJSX = this.browserbot.findJsxObject(locator);
    if (objJSX && objJSX.setChecked) {
        LOG.debug('Apply partial check to ' + objJSX);
        objJSX.setChecked(jsx3.gui.CheckBox.PARTIAL);
    } else
    Assert.fail("Cannot partical check, " + locator + " not found");
};

Selenium.prototype.doToggleJsxCheckBox = function(locator, value) {
/** Check a jsx3.gui.RadioButton or jsx3.gui.CheckBox control. In case of checkbox
 * this action will toggle the state.
 * @param locator {String} RadioButton or CheckBox locator
 * @param value {String} not used
*/
   var outerSpan = this.browserbot.findElement(locator);
   if (outerSpan) {
     //LOG.debug("outerSpan = " + getOuterHTML(outerSpan));
     _triggerMouseEvent(outerSpan, 'click', true);
   } else
    Assert.fail("Cannot toggle checkbox, " + locator + " not found");
};

Selenium.prototype.doClickJsxCellMask = function(locator, value) {
/** Depending on the Matrix column mask type, perform different action. For example, matrix text box column will have the value provided typed in.
  * Matrix select column will have the provided locator item selected (and a combo/select will have the provided value typed in). etc.
  * @param locator {String} Cell locator. For example, JsxMatrixCellId=matrixJsxName.id123.1
  * @param value {String} Cell value. Can be a secondary locator like JsxMenuItemId or JsxSelectItemIndex.
 */
  // TODO -- support value=JSXACTION( action:"type", locator:"gi=customui,1", value:"somevalue")
  this.doActionJsxMaskCell(locator, value);
};

Selenium.prototype.doActionJsxMaskCell = function(locator, value) {
   LOG.debug("Action matrix cell" + locator + " with " + value);

   var strategy = locator.split(/\=/); // should be a Matrix Cell locator
   var params;
   if (strategy[1].search(/\./) != -1)
        params = strategy[1].split(/\./); // matrix.r.c
   else if (strategy[1].search(/,/) != -1)
        params = strategy[1].split(/,/)  // matrix,text

   var jsxName = params[0];
   jsxName = stripQuotes(jsxName);

   LOG.debug("matrix jsxname = " + jsxName);

   var jsxMatrix =  this.browserbot.findByJsxName(jsxName);
    if (!jsxMatrix) {
        throw new SeleniumError("No object named '"+ jsxName + "' found!");
    }

   var cell_item = this.browserbot.findElement(locator);

   _triggerEvent(cell_item, 'focus', false);
   //_triggerMouseEvent(cell_item, 'click', false);
   var columns = jsxMatrix.getChildren();
   var session = null;
   for (var i=0; (i < columns.length) && (!session); i++){
        if (columns[i].getChildren().length > 0)
          session = columns[i].getChild(0).emGetSession();
   }
   var activeMaskSession = (session) ? session : null;
   if (activeMaskSession) {
    var activeMask = activeMaskSession.column.getChild(0); // column of the edit mask, get child mask obj
	var activeMaskElement = activeMask.getRendered(); // Non always-on edit mask such as textbox and datepicker have only one instance. So we can safely use the one returned by getRendered().
	//LOG.debug(activeMask + ", EditMaskElement = " + getOuterHTML(activeMaskElement));

	_triggerEvent(activeMaskElement, 'focus', false);

    // this.browserbot.triggerMouseEvent(activeMaskElement, 'focus', false);
    if (jsx3.gui.TextBox && activeMask.instanceOf(jsx3.gui.TextBox)) {
        LOG.debug('textboxy action type value' + value)
        this.browserbot.replaceJsxText(activeMaskElement, value, activeMask);
    }
    else if (jsx3.gui.DatePicker && activeMask.instanceOf(jsx3.gui.DatePicker) ) {
        LOG.debug('Matrix pickJsxDate');
        this.doPickJsxDate(activeMask.getName(), value);
    }
    else if (jsx3.gui.Menu && activeMask.instanceOf(jsx3.gui.Menu) ) {
        // value must be a JsxMenuItem[Text/Id/Index] selector
        LOG.debug('instance of jsx3.gui.Menu, menu item=' + value);
        this.doClickJsxMenu('JsxMenuName='+activeMask.getName(), value);
    }
    else if (jsx3.gui.Select && activeMask.instanceOf(jsx3.gui.Select) ) {
        // value must be a JsxSelectItem[Text/Id/Index] selector
        LOG.debug('instance of jsx3.gui.Select, select item=' + value);
        this.doClickJsxSelect('JsxSelectName='+activeMask.getName(), value);
    }
    else if (jsx3.gui.Slider && activeMask.instanceOf(jsx3.gui.Slider) ) {
        LOG.debug('instance of jsx3.gui.Slider');
        this.doMoveSliderRelative('JsxSlidertName='+activeMask.getName(), value);
    }
    else if (jsx3.gui.TimePicker && activeMask.instanceOf(jsx3.gui.TimePicker) ) {
        LOG.debug('instance of Timepicker ' + value);
        this.doPickJsxTime(activeMask.getName(), value);
    }
    else if (jsx3.gui.ImageButton && activeMask.instanceOf(jsx3.gui.ImageButton) ) {
      activeMaskElement = cell_item.childNodes[0].childNodes[0];
      _triggerEvent(activeMaskElement, 'focus', false);
      //LOG.debug('instance of imagebutton ' + getOuterHTML(activeMaskElement));
      _triggerMouseEvent(activeMaskElement, 'mouseover', false); // must do mouseover in Firefox
      _triggerMouseEvent(activeMaskElement, 'click', false);
    }
    else {     
	 // Default click action Always on edit mask columns such as :
	 // Button, Checkbox, RadioButton, ImageButton, ToolbarButton(delete column) 
	 // For Dialog and Block Mask, clickJsxElement MatrixCellByIndex, wait for subMask object, do custom action.
      activeMaskElement = cell_item.childNodes[0].childNodes[0];
	  if (!activeMaskElement) 
	   activeMaskElement = cell_item.childNodes[0];
	  _triggerEvent(activeMaskElement, 'focus', false);

	  LOG.debug('default action mousedown, mouseup, click');
        if (activeMaskElement.onmousedown)
            _triggerMouseEvent(activeMaskElement, 'mousedown', true);
        if (activeMaskElement.onmouseup)
            _triggerMouseEvent(activeMaskElement, 'mouseup', true);
        if (activeMaskElement.onclick)
            _triggerMouseEvent(activeMaskElement, 'click', true);
    }

  }
};

Selenium.prototype.doClickJsxDialogButton = function(dlgLocator, btnLocator) {
/** Click on a dialog box caption bar button. Specify dialog name or
 * caption text as locator and min/max/close button name as value
 *
 * @param dlgLocator {String} dialog name or caption text
 * @param btnLocator {String} min/max/close button name or label text
*/
   LOG.debug("doJsxClickDialogButton caption text = " + dlgLocator + ' button=' + btnLocator);
   var jsxCaption = this.browserbot.findByJsxTextAndType(dlgLocator, 'jsx3.gui.WindowBar');
   if (!jsxCaption)
     jsxCaption = this.browserbot.findByJsxNameAndType(dlgLocator, 'jsx3.gui.WindowBar');

   LOG.debug("caption = " + jsxCaption);
   if (!jsxCaption) return false;

   var buttons = jsxCaption.getDescendantsOfType('jsx3.gui.ToolbarButton');

   var buttonElement = null;
   var i = 0;
   for (i=0; i < buttons.length; i++) {
      if (buttons[i].getName() == btnLocator) { // name match
	   buttonElement = buttons[i].getRendered();
       break;
      }
      if (PatternMatcher.matches(btnLocator, buttons[i].getText()) ) { // Text label match
	   buttonElement = buttons[i].getRendered();
       break;
      }
   }
   if (buttonElement !== null ) {
    _triggerEvent(buttonElement, 'focus', true);
    _triggerMouseEvent(buttonElement, 'click', true);
   }
};
//TODO -- Deprecated clickDateIcon
Selenium.prototype.doClickJsxDateIcon = function(jsxname) {
/**
 * Click on date icon using JsxDateIcon locator
 * @param jsxname {String} tree item locator by jsxid or label text
 */
   var dateicon = this.browserbot.findElement("JsxDateIcon="+jsxname);

    _triggerEvent(dateicon, 'focus', true);
    _triggerMouseEvent(dateicon, 'click', true);
};

Selenium.prototype.doClickJsxDatePrevMonth = function(jsxname) {
    /**	click next month icon element of jsx.gui.DatePicker by 'jsxname'
     *  @param jsxname {String} jsxname locator for DatePicker
     */
   LOG.debug("doClickJsxDatePrevMonth locator =" + jsxname );

   var dateprev = this.browserbot.findElement("JsxDatePrevMonth="+jsxname);

    _triggerEvent(dateprev, 'focus', false);
    _triggerMouseEvent(dateprev, 'click', true);

   var objCal = this.browserbot.findByJsxNameAndType(jsxname, "jsx3.gui.DatePicker") ;
   LOG.debug("datepicker = " + objCal);
   if (!objCal.getDate()) {
     objCal.setDate(new Date()); // current date
   }
    var dateNow = objCal.getDate();
    var monthVal = dateNow.getMonth() - 1;
    if (monthVal < 0) {
        monthVal = 12;
        dateNow.setFullYear(dateNow.getFullYear() - 1)
    }
   dateNow.setMonth(monthVal);
    objCal.setDate(dateNow); // need to commit date change

};

Selenium.prototype.doClickJsxDateNextMonth = function(jsxname) {
 /**	click next month icon element of jsx.gui.DatePicker by 'jsxname'
   *  @param locator {String} jsxname locator for DatePicker
   */
   jsxname = jsxname.trim();
   LOG.debug("doClickJsxDateNextMonth locator =" + jsxname );

   var datenext = this.browserbot.findElement("JsxDateNextMonth="+jsxname);

    _triggerEvent(datenext, 'focus', false);
    _triggerMouseEvent(datenext, 'click', true);

   var objCal = this.browserbot.findByJsxNameAndType(jsxname, "jsx3.gui.DatePicker") ;

   LOG.debug("datepicker = " + objCal);
   if (!objCal.getDate()) {
     objCal.setDate(new Date()); // current date
   }
    var dateNow = objCal.getDate();
    var monthVal = dateNow.getMonth() + 1;
    if (monthVal > 11) {
        monthVal = 0;
        dateNow.setFullYear(dateNow.getFullYear() + 1);
    }
    dateNow.setMonth(monthVal);
    objCal.setDate(dateNow); // need to commit date change
};

Selenium.prototype.doClickJsxDatePrevYear = function(jsxname) {
/**	click next year icon element of jsx.gui.DatePicker by 'jsxname'
 *  @param jsxname {String} jsxname locator for DatePicker
 */
   LOG.debug("doClickJsxDatePrevYear locator =" + jsxname );

   var dateprev = this.browserbot.findElement("JsxDatePrevYear="+jsxname);

    _triggerEvent(dateprev, 'focus', true);
    _triggerMouseEvent(dateprev, 'click', true);

   var objCal = this.browserbot.findByJsxNameAndType(jsxname, "jsx3.gui.DatePicker") ;
   if (objCal) {
   LOG.debug("datepicker = " + objCal);
   if (!objCal.getDate()) {
     objCal.setDate(new Date()); // current date
   }
    var dateNow = objCal.getDate();
    dateNow.setFullYear(dateNow.getFullYear() - 1);
    objCal.setDate(dateNow); // need to commit date change
   }

};

Selenium.prototype.doClickJsxDateNextYear = function(jsxname) {
 /**	click next year icon element of jsx.gui.DatePicker by 'jsxname'
   *  @param jsxname {String} jsxname locator for DatePicker
   */
   LOG.debug("doClickJsxDateNextYear locator =" + jsxname );

   var datenext = this.browserbot.findElement("JsxDateNextYear="+jsxname);

    _triggerEvent(datenext, 'focus', true);
    _triggerMouseEvent(datenext, 'click', true);

   var objCal = this.browserbot.findByJsxNameAndType(jsxname, "jsx3.gui.DatePicker") ;
   if (objCal) {
    LOG.debug("datepicker = " + objCal);
    if (!objCal.getDate()) {
         objCal.setDate(new Date()); // current date
    }
    var dateNow = objCal.getDate();
    dateNow.setFullYear(dateNow.getFullYear() + 1);
    objCal.setDate(dateNow); // need to commit date change
   }
};

Selenium.prototype.doClickJsxElement = function(locator, modifier) {
/** Click on jsx element, generic doClick may not work properly.
 * @param locator {String} JsxElement locator
 * @param modifier {String} key modifier to click : ctrl+shift+alt
*/
  var prevCtrl = this.browserbot.controlKeyDown
  var prevShift = this.browserbot.shiftKeyDown;
	var prevAlt = this.browserbot.altKeyDown;
	var prevMeta = this.browserbot.metaKeyDown;

	if (modifier && modifier.length > 0) {
		if (/ctrl/.test(modifier))
	    this.browserbot.controlKeyDown = true;
		if (/shift/.test(modifier))
      this.browserbot.shiftKeyDown = true;
    if (/alt/.test(modifier))
			this.browserbot.altKeyDown = true;
		if (/meta/.test(modifier))
			this.browserbot.metaKeyDown = true;
	}
   LOG.debug("doClickJsxElement locator = " + locator + "modifier=" + modifier);

   var jsxElement = this.browserbot.findElement(locator);
   
   if (!jsxElement) {
     Assert.fail("clickJsxElement : " + locator + " is not found!");
     return;
   }
   var jsxElementId = jsxElement.id;

   try {
     if (jsxElement.onmouseover) {
       LOG.debug("do mouseover ..." );
       _triggerMouseEvent(jsxElement, 'mouseover', true);
     }
     if (jsxElement.onfocus) {
       LOG.debug("do focus ..." );
       _triggerEvent(jsxElement, 'focus', false);
     }

     triggerLeftMouseEvent(jsxElement, 'click', true);
     if (jsxElement && jsxElement.onmousedown) 
      triggerLeftMouseEvent(jsxElement, 'mousedown', true);
     if (jsxElement && jsxElement.onmouseup) 
      triggerLeftMouseEvent(jsxElement, 'mouseup', true);

      
   } catch (e) {
      LOG.warn("Exception caught in clickJsxElement! message=" + e.message);
   }

  this.browserbot.controlKeyDown = prevCtrl;
  this.browserbot.shiftKeyDown = prevShift;
	this.browserbot.altKeyDown = prevAlt;
	this.browserbot.metaKeyDown = prevMeta;

};

Selenium.prototype.doClickJsxMatrixHeader = function(locator) {
/**
 * Click on a Matrix header cell
 * @param locator {String} matrix header locator JsxMatrixHeaderIndex=jsxname,colIndex
 *
 */
   LOG.debug("doClickJsxMatrixHeader locator = " + locator );
   var elmColumn = this.browserbot.findElement(locator);

   if (elmColumn && (storedVars.LASTJSXOBJ instanceof jsx3.gui.Matrix) ) {
     var jsxMatrix = storedVars.LASTJSXOBJ;

    _triggerMouseEvent(elmColumn, 'mousedown', true);
    var ghostElement = this.browserbot.findElement("id=" + jsxMatrix.getId() + "_ghost");
    if (ghostElement)
    _triggerMouseEvent(ghostElement, 'mouseup', true);
  }
};


Selenium.prototype.doClickJsxMatrixTreeItem = function(locator) {
/**
 *  Click on a Matrix Tree item icon using JsxMatrixTreeItemId
 * @param locator {String} JsxMatrixTreeItemId=mtxJsxName,mtxJsxId
 */
   LOG.debug("doClickJsxMatrixTreeItem " + locator);
   var treeElement = this.browserbot.findElement(locator);
   _triggerMouseEvent(treeElement, 'click', true);
   _triggerMouseEvent(treeElement, 'mousedown', true);
   _triggerMouseEvent(treeElement, 'mouseup', true);

};

Selenium.prototype.doClickJsxMatrixTreeToggle = function(locator) {
/**
 * Click on a Matrix header cell
 * | clickJsxMatrixTreeToggle | JsxMatrixTreeItemId=jsxname,jsxid | | 
 * @param locator {String} matrix tree item id locator jsxname,jsxid
 *
 */
   if (!/MatrixTreeItem/.test(locator)) {
      Assert.fail("MatrixTreeItem locator required.");
   }
   LOG.debug("doClickJsxMatrixTreeToggle locator = " + locator );
   var text = locator.split("=")[1];
   var params = text.split(",");
   var mtxJsxName = params[0].trim();
   var jsxid = params[1].trim();

   var jsxMatrix = this.browserbot.findByJsxNameAndType(mtxJsxName, 'jsx3.gui.Matrix');

   if (jsxMatrix !== null) {
    LOG.debug('matrix = ' + jsxMatrix);
    var elmToggle = getActionableObject(jsxMatrix, 'toggler', jsxid);
    //LOG.debug("Tree toggle element = " + getOuterHTML(elmToggle));
    _triggerMouseEvent(elmToggle, 'mousedown', true);
    _triggerMouseEvent(elmToggle, 'mouseup', true);
    _triggerMouseEvent(elmToggle, 'click', true);
  } else {
    LOG.debug("doClickJsxMatrixTreeToggle couldn't find matrix jsxname="+ mtxJsxName );
  }
};

var timerId;

Selenium.prototype.doClickJsxMenu = function(locator, itemLocator) {
/** jsx3.gui.Menu click is actually a mousedown event
 * @param locator {String} Menu locator JsxMenuName/JsxMenuText
 * // itemLocator {String} Menu item locator not working //
 */
   LOG.debug("doClickJsxMenu locator = " + locator );

   var menuElement = this.browserbot.findElement(locator);
   if (menuElement && !this.isJsxMenuWindowPresent(1)) {
     _triggerEvent(menuElement, 'focus', false);
     _triggerMouseEvent(menuElement, 'mousedown', true);
     // Alternative, use arrow key down. TBD -- create a test using keyDown
     //triggerKeyEvent(menuElement, 'keydown', jsx3.gui.Event.KEY_ARROW_DOWN, true);
   }

   if (itemLocator) {    // will not work in 3.1.x
           if (htmlTestRunner.controlPanel.runInterval <= 0)
            this.doPause(500);
       jsx3.sleep( function () {selenium.doClickJsxMenuItem(itemLocator);}, "click_menu_item", this, true);
   }


};

Selenium.prototype.doClickJsxMenuItem = function(locator) {
/** Click a menu item, mostly used internally by clickJsxMenu (menu,item) command.
 * @param locator {String} Menu item locator JsxMenuItemId/JsxMenuItemText
 */
   LOG.debug("doClickJsxMenuItem locator = " + locator );
    var menuElement = this.browserbot.findElement(locator);
    if (menuElement) {
     //LOG.debug('element = ' + getOuterHTML(menuElement));
     _triggerEvent(menuElement, 'focus', false);
     _triggerMouseEvent(menuElement, 'mouseover', true);
     _triggerMouseEvent(menuElement, 'click', true);
     //menu item is gone when clicked, no mouseout or blur event
    }
};

Selenium.prototype.doClickJsxSelectItem = function(optionLocator) {
/** Click a select option item, mostly used internally by clickJsxSelect (slct,item) command.
 * @param locator {String} Select item locator JsxSelectItemId/JsxSelectItemText/JsxSelectItemIndex
 */
    LOG.debug("select/combo item option locator = " + optionLocator);
    var selectItemElement = this.browserbot.findElement(optionLocator);
    if (selectItemElement) {
        _triggerEvent(selectItemElement, 'focus', false);
        _triggerMouseEvent(selectItemElement, 'mouseover', true);
        _triggerMouseEvent(selectItemElement, 'mousedown', true);
        _triggerMouseEvent(selectItemElement, 'click', true);
    }
}

Selenium.prototype.doClickJsxSelect = function(locator, optionLocator) {
/**  This method now a allows selection of a select control item directly
 *  @param locator {String} locator string for select control
 *  @param optionLocator {String} [optional] if provided will select the item specified.
 */
   LOG.debug("doClickJsxSelect/combo locator = " + locator );
   //
   var selectElement = this.browserbot.findElement(locator);

    if (selectElement.onmousedown) {
	   var params = getNameValue(locator);
      // 3.2 and later use selectElement
      this.browserbot.findByJsxName(params.value).focus();
      _triggerEvent(selectElement, 'focus', false);  // focus?
      _triggerMouseEvent(selectElement, 'mousedown', true);
      _triggerMouseEvent(selectElement, 'mouseup', true);
      } else {
       // 3.1 use childNodes[0]
      var mElement = selectElement.childNodes[0];
      _triggerEvent(mElement, 'focus', true);
      _triggerMouseEvent(mElement, 'mousedown', true);
      _triggerMouseEvent(mElement, 'mouseup', true);
      
       //triggerKeyEvent(selectElement, 'keydown', jsx3.gui.Event.KEY_ARROW_DOWN, true)
      }

    if (optionLocator) { // jsx3.sleep is not in 3.1.x!! drop support for 3.1.x.
        //this.doPause(400);
        var isDoneSelect = false;
        setTimeout ( function () {
          selenium.doClickJsxSelectItem(optionLocator);
          isDoneSelect = true;
        }, 200);
        return Selenium.decorateFunctionWithTimeout(function () {
                return isDoneSelect;
              }, this.defaultTimeout);
    }

};

Selenium.prototype.doClickJsxStack = function(locator) {
/** Click on a jsx3.gui.Stack control
 * @param locator {String} Stack locator by jsxname or label text
 */
   LOG.debug("doClickJsxStack locator = " + locator );
   // stackElement.childNodes[0].rows[0].cells[0] is where the action is
   var mElement = this.browserbot.findElement(locator);
   if (mElement.childNodes[0].rows ) {
       mElement = mElement.childNodes[0].rows[0].cells[0];
   } else {
      var objJSX = storedVars['LASTJSXOBJ']; // objJSX is last found by findElement
	  mElement = getActionableObject(objJSX, 'handle');
   }
   if (mElement ) {
     _triggerMouseEvent(mElement, 'mouseover', true);
     _triggerMouseEvent(mElement, 'click', true);
     _triggerMouseEvent(mElement, 'mouseout', true);
   }
}



Selenium.prototype.doClickJsxToolbarButton = function(text) {
/** Click on a tool bar button, generic click doesn't work.
 * @param text {String} Locator text of Toolbar Button label or jsxname
 */
   LOG.debug("doJsxClickToolbarButton label/jsxname = " + text );
   text.trim();
   var buttonElement = this.browserbot.locateElementByJsxToolbarButtonName(text, null);
   if (!buttonElement) {
     buttonElement = this.browserbot.locateElementByJsxToolbarButtonText(text, null);
   }
   _triggerMouseEvent(buttonElement, 'focus', true);
   _triggerMouseEvent(buttonElement, 'click', true);
}

Selenium.prototype.doClickJsxTreeToggle = function(locator) {
/**
 * Click on Tree toggle icon using JsxTreeItemId/Text locator.
 *
 * @param locator {String} tree item locator by jsxid or label text
 */
   LOG.debug("doJsxClickJsxTreeToggle = " + locator );
   // <img jsxtype=plusminus/>
   var treeElement = this.browserbot.findElement(locator); 
   if (treeElement && treeElement.parentNode) {
    treeElement = treeElement.parentNode.childNodes[0]; // treeitemid | treeitemtext locator now return the label.
    _triggerMouseEvent(treeElement, 'click', true);
   } else {
    Assert.fail("tree element not found using " + locator);
   }
};

// TODO -- deprecate
Selenium.prototype.doClickJsxTreeItem = function(locator) {
/**
 * Click on Tree item using JsxTreeItemId locator.
 * @param locator {String} tree item locator by jsxid or label text
 */
   LOG.info("Command doClickJsxTreeItem is deprecated, use clickJsxElement.");
   LOG.debug("doJsxClickJsxTreeToggle = " + locator );
   var treeElement = this.browserbot.findElement(locator); 
   if (treeElement) {
      _triggerMouseEvent(treeElement, 'click', true);
   }
};


Selenium.prototype.doResizeJsxLayout = function(jsxName, value) {
/**
 * Resize layout with given new dimension Array.
 * @param jsxName {String} jsxname of the layout
 * @param value {String} Comma seperated value specifying new dimension array e.g. 100,*
 */
  LOG.debug("doResizeJsxLayout jsxname = " + jsxName + ",value="+ value);
  var objLayout = this.browserbot.findByJsxName(jsxName);
  var newdim = value.split(',');
  objLayout.setDimensionArray(newdim, true);
};


Selenium.prototype.doRightClickJsxElement = function(locator) {
/**
 * Do a right click on a given jsxname element. 
 * @param locator {String}  locator is strategy=jsxname,itemid
*/
   LOG.debug("doRightClickJsxElement = " + locator );
   var thisElement = this.browserbot.findElement(locator);
   var jsxObj = storedVars.LASTJSXOBJ;

   if (jsxObj) {
    var objPos;
    if (jsx3.html)
      objPos = jsx3.html.getRelativePosition(null, thisElement); // relative to the top, this is new for 3.2
    else {
       objPos = jsxObj.getAbsolutePosition();
       if (jsxObj.instanceOf("jsx3.gui.List")) { // a list/grid
           var headerOffset = jsxObj.getHeaderHeight();
           objPos.T = objPos.T + thisElement.offsetTop + headerOffset ;
           objPos.L = objPos.L + thisElement.offsetLeft;
       }
     }

     LOG.debug("Pos = " + objPos.L + " t=" + objPos.T);
     _triggerEvent(thisElement, 'focus', true);
     triggerRightMouseEvent(thisElement, 'mousedown', true, objPos);
     triggerRightMouseEvent(thisElement, 'mouseup', true, objPos);
     triggerRightMouseEvent(thisElement, 'click', true, objPos);
   }

};


Selenium.prototype.doRightClickJsxListRow = function(locator) {
/**
 * doRightClickJsxListRow -- Right click on a list row
 * @param locator {String} locator=jsxname,item_jsxid
*/
   LOG.debug("doRightClickJsxListRow = " + locator );

   var params = locator.split(",");
   var jsxName = params[0];  // jsxname
   var jsxId = params[1];    // item jsxid

   var listObj = this.browserbot.findByJsxName(jsxName);
   LOG.debug("listobj = "  + listObj);
   var listRowId = listObj.getId() + jsxId;
   LOG.debug("listrowid = " + listRowId);
   var listRowElement = this.browserbot.getCurrentWindow(true).document.getElementById(listRowId);
   //LOG.debug("listrow = " + getOuterHTML(listRowElement));

   var objPos = listObj.getAbsolutePosition();
   var listOffset = listObj.getHeaderHeight();
   if (listOffset == undefined)
      listOffset = jsx3.gui.List.DEFAULTHEADERHEIGHT;
   objPos.T = objPos.T + listRowElement.offsetTop + listOffset ;
   objPos.L = objPos.L + listRowElement.offsetLeft;

   LOG.debug("pos T=" + objPos.T + " L=" + objPos.L);
   _triggerMouseEvent(listRowElement, 'focus', true);

   triggerRightMouseEvent(listRowElement,'mousedown', true, objPos);
   triggerRightMouseEvent(listRowElement,'mouseup', true, objPos);
};

Selenium.prototype.doRightClickJsxTreeItem = function(locator) {
/**
 * right click tree item
 * @param locator {String} Tree item locator by jsxname,jsxid
*/
   LOG.debug("doRightClickJsxTreeItem = " + locator );

   var treeItemElement = this.browserbot.findElement(locator)
   //LOG.debug("tree icon/label element = " + getOuterHTML(treeItemElement));

   var objPos = jsx3.html.getRelativePosition( null, treeItemElement );

   LOG.debug("pos T=" + objPos.T + " L=" + objPos.L);
   _triggerEvent(treeItemElement, 'focus', true);

   triggerRightMouseEvent(treeItemElement,'mousedown', true, objPos);
   triggerRightMouseEvent(treeItemElement,'mouseup', true, objPos);
};


Selenium.prototype.doDoubleClickJsxElement = function(locator) {
/**
 * Do user double click on a jsx element
 * @param locator {String} A List Row <a href="#locators">element locator</a> can be: listJsxName,recordJsxId or TextPattern
 */
   LOG.debug("doDoubleClickJsxElement locator = " + locator );
   var thisElement = this.browserbot.findElement(locator);
   _triggerEvent(thisElement, 'focus', true);
   triggerLeftMouseEvent(thisElement, 'click', true);     // 3.1.x use click to select in list
   triggerLeftMouseEvent(thisElement, 'dblclick', true);

};

Selenium.prototype.doDoubleClickJsxTreeItem = function(locator) {
/**
 * Simulate user double click on a tree item. DEPRECATED.
 * @param {String} locator A Tree item <a href="#locators">element locator</a> treeJsxName,recordJsxId
 * @deprecated
 */
 this.doDoubleClickJsxElement(locator);
};


Selenium.prototype.doMoveJsxSliderPercent = function(locator, value) {
 /**
   * Simulates a user dragging the slider handle to a given percentage location
   *
   * @param locator {String} an <a href="#locators">element locator</a>
   * @param value {String} position defined in [1-100] % position.
   */
  LOG.debug("doMoveJsxSliderPercent locator = " + locator );

  var elementSlider = this.browserbot.findElement(locator);

  var jsxSlider = storedVars.LASTJSXOBJ;
  var sliderPos = jsxSlider.getAbsolutePosition();
  var elementSliderHandle = getActionableObject(jsxSlider, 'handle');
  var handlePos = jsx3.html.getRelativePosition(null, elementSliderHandle);
  
  // X or Y relative pixel position
  var relPos = Math.round(jsxSlider.getLength() * value / 100);
  var finishTop = handlePos.T;
  var finishLeft = handlePos.L;
    if (jsxSlider.getOrientation() == 0) 
      finishLeft = sliderPos.L + relPos;
    else
      finishTop = sliderPos.T + relPos;
  var  left = finishLeft - handlePos.L;
  var  top = finishTop - handlePos.T;
  var  giLocator = "gi=" + jsxSlider.getName() + ",handle";
  var  movement = left+ "," + top;
  LOG.debug("move slider " + giLocator + " by " + movement);
  return this.doDragJsxTo(giLocator, movement);
};

Selenium.prototype.doMoveJsxSliderRelative = function(locator, value) {
	/**
   * Simulates a user moving the slider handle.
   *
   * @param locator {String} an <a href="#locators">element locator</a>
   * @param value {String} position defined in [+/-]Y pixel position, relative to locator element position.
   */
  LOG.debug("doMoveJsxSlider gi = " + locator );
  this.browserbot.findElement(locator);
  var jsxSlider = storedVars.LASTJSXOBJ;
  if (jsxSlider && jsxSlider.instanceOf(jsx3.gui.Slider) ) {
      var  giLocator = "gi=" + jsxSlider.getName() + ",handle";
      if (jsxSlider.getOrientation() == 1) {
        // vertical
        return this.doDragJsxTo(giLocator, "0,"+value);
      } else {
        // horizontal
        return this.doDragJsxTo(giLocator, value+",0");
      }
  }
};

Selenium.prototype.doDragJsxDialogResize = function(locator, posval) {
	/**
   * Simulates a user doing drag resize on a dialog box.
   * Equivalent DragJsxBy("mydialog,resizer", "10,10").
   * @param locator {String} an <a href="#locators">element locator</a>
   * @param posval {String} offset x,y pixel position, relative to current element position.
   */

    // find the resize div handle, child node 4 under dialog
    var jsxObj = this.browserbot.findJsxObject(locator);
    var element  = getActionableObject(jsxObj, "resizer");
    if (!element) Assert.fail( locator + " not found!");
    
    var jsxPos = jsxObj.getAbsolutePosition();

    LOG.debug('dialog resize pos.t=' + jsxPos.T + ",pos.l=" + jsxPos.L );
    if (jsx3.html) {
       element = getActionableObject(jsxObj, 'resizer');
       //LOG.debug('resize element = ' + getOuterHTML(element));
       jsxPos = jsx3.html.getRelativePosition(null, element);
    } else {
        jsxPos.T = jsxPos.T + jsxObj.getHeight();
        jsxPos.L = jsxPos.L + jsxObj.getWidth();
    }
    LOG.debug('dialog resize pos.t=' + jsxPos.T + ",pos.l=" + jsxPos.L );
    triggerLeftMouseEvent(element, 'mouseover', true, jsxPos);
    triggerLeftMouseEvent(element, 'mousedown', true, jsxPos);

    if (posval) {
      var xy = posval.split(',');
      var offsetX = xy[0];
      var offsetY = xy[1];
       jsxPos.T += Math.round(parseInt(offsetY) / 2);
       jsxPos.L += Math.round(parseInt(offsetX) / 2);
      triggerLeftMouseEvent(element, 'mousemove', true, jsxPos);
       jsxPos.T += Math.round(parseInt(offsetY) / 2);
       jsxPos.L += Math.round(parseInt(offsetX) / 2);
      triggerLeftMouseEvent(element, 'mouseup', true, jsxPos);
    } else {
     Assert.fail("To [x,y] relative offset values required");
    }
    LOG.debug('new dialog props' + jsxObj);
};

Selenium.prototype.doDragJsxDialogTo = function(locator, posval) {
	/**
   * Simulates a user doing drag-and-drop on the specified jsxname object.
   *
   * @param locator {String} an <a href="#locators">JSX locator by jsxname</a>
   * @param posval {String} offset x,y pixel position, relative to current element position.
   */

    var jsxObj = this.browserbot.findJsxObject(locator);
    var element  = getActionableObject(jsxObj, "captionbar");
    if (!element) Assert.fail( locator + " not found!");

    if (jsx3.html) { // 3.2.0 class
        element = getActionableObject(jsxObj, 'captionbar');
    }
    var jsxPos = jsxObj.getAbsolutePosition();
    jsxPos.T += 2;
    jsxPos.L += 2; // add 2 pixel to be within the rendered element
    triggerLeftMouseEvent(element, 'mousedown', true, jsxPos);

    if (posval) {
      var xy = posval.split(',');
      var offsetX = xy[0];
      var offsetY = xy[1];
       jsxPos.T += Math.round(parseInt(offsetY) / 2);
       jsxPos.L += Math.round(parseInt(offsetX) / 2);
      triggerLeftMouseEvent(element, 'mousemove', true, jsxPos);
       jsxPos.T += Math.round(parseInt(offsetY) / 2);
       jsxPos.L += Math.round(parseInt(offsetX) / 2);
      triggerLeftMouseEvent(element, 'mouseup', true, jsxPos);
    } else {
     Assert.fail("To [x,y] relative offset values required");
    }
};

Selenium.prototype.doDragJsxTo = function(locator, movementsString) {
/** 
  * Simulates a user doing drag-and-drop on the specified jsxname object.
  * Drags an element a certain distance and then drops it
  * @param locator {String} an element locator
  * @param movementsString {String} offset in pixels from the current location to which the element should be moved, e.g., "+70,-300"
  */
    var element = this.browserbot.findElement(locator);
    var pos = jsx3.html.getRelativePosition(null, element);
    var clientStartX = pos.L;
    var clientStartY = pos.T;
    LOG.debug("client X=" + clientStartX + ",client Y=" + clientStartY);
    
    var movements = movementsString.split(/,/);
    var movementX = Number(movements[0]);
    var movementY = Number(movements[1]);
    var clientFinishX = ((clientStartX + movementX) < 0) ? 0 : (clientStartX + movementX);
    var clientFinishY = ((clientStartY + movementY) < 0) ? 0 : (clientStartY + movementY);
    LOG.debug(" finish " + clientFinishX + " , " + clientFinishY);
    var mouseSpeed = this.mouseSpeed;
    var move = function(current, dest) {
        if (current == dest) return current;
        if (Math.abs(current - dest) < mouseSpeed) return dest;
        return (current < dest) ? current + mouseSpeed : current - mouseSpeed;
    };

  _triggerMouseEvent(element, 'mousedown', true, clientStartX, clientStartY);
  _triggerMouseEvent(element, 'mousemove', true, clientStartX, clientStartY);
   // Drag delay in GI must wait a little after initial mousedown  
  var isDoneDrag = false;   
  setTimeout ( function () {
    while ((clientStartX != clientFinishX) || (clientStartY != clientFinishY)) {
      clientStartX = move(clientStartX, clientFinishX);
      clientStartY = move(clientStartY, clientFinishY);
      _triggerMouseEvent(element, 'mousemove', true, clientStartX, clientStartY);
     // splitter uses these values, update them.
      element.style.left = clientStartX;
      element.style.top  = clientStartY;
    }   
    _triggerMouseEvent(element, 'mousemove', true, clientFinishX, clientFinishY);
    _triggerMouseEvent(element, 'mouseup', true, clientFinishX, clientFinishY);
    isDoneDrag = true;
  }, 280);
  
  return Selenium.decorateFunctionWithTimeout(function () {
    return isDoneDrag;
  }, this.defaultTimeout);

};
Selenium.prototype.doDragJsxTo.dontCheckAlertsAndConfirms = true;

// doDragJsxRecordChild
// doDragJsxRecordBefore

Selenium.prototype.doDragJsxToJsx = function(locator, locator2) {
/** 
   * Simulates a user doing drag-and-drop on the specified jsxobj to a second jsxobj.
   * // TODO -- fix drop to sibling row or child row of matrix and tree.
   * @param locator {String} an JsxName <a href="#locators">element locator</a>
   * @param locator2 {String} The second JsxName <a href="#locators">element locator</a>
   */
   this.fromElement = this.browserbot.findElement(locator);
   if (!this.fromElement)
    Assert.fail("Could not locate from Element using " + locator );
   
   this.fromPosition = storedVars.LASTJSXOBJ.getAbsolutePosition();
   
   this.toElement = this.browserbot.findElement(locator2);
   if (!this.toElement)
    Assert.fail("Could not locate to Element using " + locator2 );
   
   this.toPosition = storedVars.LASTJSXOBJ.getAbsolutePosition();
     
    _triggerMouseEvent(this.fromElement, 'mousedown', true, this.fromPosition.L, this.fromPosition.T);
   this.doPause(1000); // wait after this command to allow drag delay timeout to trigger
   var me = this;
  
   setTimeout( function () { 
     LOG.debug('trigger move and mouseup');
     var clientX = me.fromPosition.L;
     var clientY = me.fromPosition.T;
     var clientFinishX = Math.round(me.toPosition.L + (me.toElement.offsetWidth / 2));
     var clientFinishY =  Math.round(me.toPosition.T + (me.toElement.offsetHeight / 2));
     var mouseSpeed = me.mouseSpeed;
     var move = function(current, dest) {
        if (current == dest) return current;
        if (Math.abs(current - dest) < mouseSpeed) return dest;
        return (current < dest) ? current + mouseSpeed : current - mouseSpeed;
     };
     while ((clientX != clientFinishX) || (clientY != clientFinishY)) {
        clientX = move(clientX, clientFinishX);
        clientY = move(clientY, clientFinishY);
        _triggerMouseEvent(me.fromElement, 'mousemove', true, clientX, clientY);
    }
    
     _triggerMouseEvent(me.toElement, 'mousemove', true, clientFinishX, clientFinishY);    
     _triggerMouseEvent(me.toElement, 'mouseup', true, clientFinishX, clientFinishY);    
  }, 300);   // TREE has drag delay 250ms
    

};

// TODO, test mousedown, mousemove, mouseup
Selenium.prototype.doJsxMouseDown = function(locator, posval) {
	/**
   * Simulates a user pressing the mouse button (without releasing it yet) on
   * the specified element.
   *
   * @param locator an <a href="#locators">Jsx locator</a>
   * @param posval position defined in x,y pixel position, relative to locator element position.
   */

    var element = this.browserbot.findElement(locator);

    var jsxPos = (storedVars.LASTJSXOBJ) ? storedVars.LASTJSXOBJ.getAbsolutePosition() : { T:0, L:0};

    if (posval) {
      var xy = posval.split(',');
       jsxPos.T = jsxPos.T + parseInt(xy[1]);
       jsxPos.L = jsxPos.L + parseInt(xy[0]);
    }


    triggerLeftMouseEvent(element, 'mousedown', true, jsxPos);
};

Selenium.prototype.doJsxMouseMove = function(locator, posval) {
	/**
   * Simulates a user moving the mouse (without releasing it yet) on
   * the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param posval  postion value in x,y pixel positon, relative to locator element position.
   */
    var element = this.browserbot.findElement(locator);
    var jsxPos = (storedVars.LASTJSXOBJ) ? storedVars.LASTJSXOBJ.getAbsolutePosition() : { T:0, L:0};
    
    if (posval) {
      var xy = posval.split(',');
       jsxPos.T = jsxPos.T + parseInt(xy[1]);
       jsxPos.L = jsxPos.L + parseInt(xy[0]);
    }

    triggerLeftMouseEvent(element, 'mousemove', true, jsxPos);
};

Selenium.prototype.doJsxMouseUp = function(locator, posval) {
	/**
   * Simulates a user releasing the mouse button on the specified element.
   *
   * @param locator an <a href="#locators">element locator</a>
   * @param posval  postion value in x,y pixel positon, relative to locator element position.
   */
    var element = this.browserbot.findElement(locator);
    var jsxPos = (storedVars.LASTJSXOBJ) ? storedVars.LASTJSXOBJ.getAbsolutePosition() : { T:0, L:0};
    if (posval) {
      var xy = posval.split(',');
       jsxPos.T = jsxPos.T + parseInt(xy[1]);
       jsxPos.L = jsxPos.L + parseInt(xy[0]);
    }

    triggerLeftMouseEvent(element, 'mouseup', true, jsxPos);
};

Selenium.prototype.doTypeJsxKeys = function(locator, text) {
/**
 * Type the individual keys of the provided text string. Select action is first performed before typing to clear the existing text.
 * Unlike doTypeKeys, we replace the text first on IE , carry out  select text action and trigger blur event.
 *
 * @param locator {String} input ="text" element locator (like combo box input).
 * @param text {String} the text to enter for the input box
 */
 LOG.debug("doTypeJsxKeys " + locator + " with " + text);
 var element = this.browserbot.findElement(locator);
 triggerEvent(element, 'focus', false);
 // on IE, typeKeys does not input the text yet on FX doing both enters the text twice.
 if (browserVersion.isIE)
	this.doType(locator, text);
// Select the current text in the input box, so that typekeys replace current content.
 element.select();
 this.doTypeKeys(locator, text);
 this.element = element;
 setTimeout( function () { triggerEvent(element, 'blur', false); }, 100);

}
Selenium.prototype.doTypeJsxTextbox = function(locator, text) {
 /**
  * Type text into a jsx3.gui.TextBox, DatePicker box, TimePicker box. Unlike the "type" command we trigger blur event
  *
  * @param locator an element locator
  * @param text  value to input
  */

   LOG.debug("doType " + locator + " with " + text);
   // Not using NameAndType locator since we want to type in different type of input box, date picker, combo box, etc.
   var element = this.browserbot.findElement(locator);
   var objJSX = storedVars['LASTJSXOBJ'];
   if (!element || !objJSX)
    Assert.fail("Cannot locate input box with locator=" + locator);
   if (this.browserbot.shiftKeyDown) {
        text = new String(text).toUpperCase();
    }
    this.browserbot.replaceJsxText(element, text, objJSX); // our replacetext does blur event.
};

Selenium.prototype.doSpyJsxElement = function(locator) {
/**
 * Trigger spy event on located jsx element. -- TODO, seems to work on Firefox only.
 *
 * @param locator {String} jsx element locator.
 */
   LOG.debug("doSpyJsxElement locator = " + locator );
   var mElement = this.browserbot.findElement(locator);
   if (mElement) {
       var objPos;
       if (jsx3.html)
         objPos = (storedVars.LASTJSXOBJ) ? storedVars.LASTJSXOBJ.getAbsolutePosition() : 
                  jsx3.html.getRelativePosition(mElement);
       else {
         objPos = new Object();
         objPos.T = getAbsoluteTop(mElement);
         objPos.L = getAbsoluteLeft(mElement);
       }
     triggerLeftMouseEvent(mElement, 'mouseover', true, objPos);
     //_triggerMouseEvent(mElement, 'mouseover', true);
   }
};

Selenium.prototype.doPickJsxTime = function(jsxname, value) {
/** Pick a time value in the form of HH:mm:SS.sss into a jsx3.gui.TimePicker
  * TODO -- add support for AM/PM time?
  * @param jsxname {String} DatePicker jsxname
  * @param value {String} date value in valid Date string format
  */
    var longPattern = /(\d){2}:(\d){2}:(\d){2} ([AM|PM])/i;
    var otpicker = this.browserbot.findByJsxNameAndType(jsxname.trim(), "jsx3.gui.TimePicker") ;

    var hhmmss = value.split(/:/);   // hh:mm:ss.sss
    var hours =  hhmmss[0];
    var minutes = hhmmss[1];
    var seconds = hhmmss[2];
	LOG.debug(hours + "-" + minutes + "-" + seconds);
    // enter hours value
    this.doType('JsxTimePickerHours='+jsxname.trim(), hours );
    this.doFireEvent('JsxTimePickerHours='+jsxname.trim(), 'blur');
    // enter minutes value
    this.doType('JsxTimePickerMinutes='+jsxname.trim(), minutes );
    this.doFireEvent('JsxTimePickerMinutes='+jsxname.trim(), 'blur');
    if (otpicker.getShowSeconds() == 1) {
        var secon = seconds;
        var milli = 0;
        if (seconds.indexOf(".") > 0 ) {
            var parts = seconds.split(".");
            secon = parts[0];
            milli = parts[1];
        }
        this.doType('JsxTimePickerSeconds='+jsxname.trim(), secon );
        this.doFireEvent('JsxTimePickerSeconds='+jsxname.trim(), 'blur');
        if (otpicker.getShowMillis() == 1) {
            this.doType('JsxTimePickerMillis='+jsxname.trim(), milli );
            this.doFireEvent('JsxTimePickerMillis='+jsxname.trim(), 'blur');
        }
    }

};


Selenium.prototype.doPickJsxDate = function(jsxname, value) {
/** Pick a date value in the form of a parsable Date class value into jsx3.gui.DatePicker control
 * @param jsxname {String} DatePicker jsxname
 * @param value {String} date value in valid Date string format YYYY/MM/dd
 */
   LOG.debug("doPickJsxDate jsxname = " + jsxname );

   var objCal = this.browserbot.findByJsxNameAndType(jsxname.trim(), "jsx3.gui.DatePicker") ;
   LOG.debug("datepicker = " + objCal);

   if (!value)
    objCal.setDate(new Date());
   else if (value == 'today' || value == '') {
    objCal.setDate(new Date());
   }
   else {
    objCal.setDate(new Date(value) );
   }

   var elmCal = objCal.getRendered();
   _triggerEvent(elmCal, 'focus', true); // click to open calendar
   _triggerMouseEvent(elmCal, 'click', true); // click to open calendar
   if (elmCal.childNodes.length > 1) { // 3.2.0 has icon img as child element
       var elementIcon = getActionable(objCal, "icon");
       _triggerEvent(elementIcon, 'focus', true);
       _triggerMouseEvent(elementIcon, 'click', true);
   }

   var id = "jsxDatePicker" + objCal.getId();
   var objHw = jsx3.gui.Heavyweight.GO(id);
   if (!objHw) {
   // 3.2, event on img element
    var iconElement = getActionableObject(objCal, 'icon');
    _triggerEvent(iconElement, 'focus', true); // click to open calendar
    _triggerMouseEvent(iconElement, 'click', true); // click to open calendar
   }

    var calDate = objCal.getDate();
    var year = calDate.getFullYear();

    var month = calDate.getMonth();
    var dayid = year.toString() + "-" + month.toString() + "-" + calDate.getDate().toString();
    LOG.debug("dayid = " + dayid);
    var dayElement = getActionableObject(objCal, 'day', dayid);
    //if (dayElement != null) {
    //LOG.debug('day = ' + getOuterHTML(dayElement));
     _triggerMouseEvent(dayElement, 'mouseover', true);
     _triggerMouseEvent(dayElement, 'click', true); // click to select date
    //}

};

Selenium.prototype.doRecordStartTime = function(index) {
/**
 * Record a start time for performance timing
 * @param index {String} a start time variable index
 */
 var timevar = 'startTime' + index;
 var currentTime = new Date();
 storedVars[timevar] = currentTime.getTime(); // millisecond value of time
 currentTest.currentRow.setMessage(currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() + "." + currentTime.getMilliseconds() );
 //LOG.info('**Recorded start time for ' + index + " = " + currentTime);
 
}

Selenium.prototype.doRecordEndTime = function(index) {
/**
 * Record a end time for performance timing
 * @param index {String} a start time variable index  or Id String
 */
 var timevar = 'endTime' + index;
 var currentTime = new Date();
 storedVars[timevar] = currentTime.getTime(); // millisecond value of time
 currentTest.currentRow.setMessage(currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() + "." + currentTime.getMilliseconds() );
 //LOG.info('**Recorded end time for ' + index + " = " + currentTime);
};

Selenium.prototype.doShowElapseTime = function(id) {
/**
 * Display elapsed time of given index for performance timing
 * @param id {String} a start time variable index or Id String
 */
  var startvar = 'startTime' + id;
  var endvar = 'endTime' + id;
  var diffTime = (storedVars[endvar] - storedVars[startvar]) - (htmlTestRunner.controlPanel.runInterval * 2);
  // substract command interval time for more accurate elapse time. 1 interval after startRecord + 1 after endRecord.
  //TBD, need to count the number of commands between start/stop.
  storedVars[id] = diffTime;
  var message = "Elapse time for " + id + " is = " + diffTime + " msec.";
  currentTest.currentRow.setMessage(message);
  LOG.info(message);
};

Selenium.prototype.doSetInterval = function(value) {
/**
  * Set the command run interval between commands.
  * @param value millisecond pause interval between commands.
*/
   htmlTestRunner.controlPanel.runInterval = value;
};

Selenium.prototype.doSetJsxNamespace = function (namespace) {
/**
  * Set the namespace of our GI application, this is useful when there is more than one application
  * on the same page.
  * @params namespace {String} the namespace name string as defined in application configuration
  */
 if (!namespace || namespace == "null")
	this.jsxNamespace = null;
 else
	this.jsxNamespace = namespace;

	if (namespace)
		storedVars['JSXNS'] = namespace;       // save the value as a Selenium global var ${JSXNS}
  LOG.debug("app namespace = " + this.jsxNamespace);
};

Selenium.prototype.doUnsubscribeJsxResize = function() {
/**
 * IE bug trigger resize when there's none but dynamic element inserted to DOM
 * use this command to disable all onresize event handlers.
*/
  if (browserVersion.isIE) {
    jsx3.gui.Event.unsubscribeAll(jsx3.gui.Event.RESIZE);
    LOG.info('jsx3.gui.Event.unsubscribeAll(jsx3.gui.Event.RESIZE);');
  }
  else
    LOG.info('unsubscribeJsxResize is noop for non IE browser');
};

Selenium.prototype.doSelectJsxRecords = function(locator, xpath) {
/** Convenience function for selecting records in Matrix or Tree according to a XPath selector of the XML records.
 *
 * @param jsxname {String} the jsxname or locator
 * @param xpath {String} record selection xpath for example //record[@status='Deployed']
*/
  var objGUI = this.browserbot.findJsxObject(locator);
  if (!objGUI)
    Assert.fail("Cannot locate GUI with locator=" + locator);
  
  objGUI.setValue(""); // reset selection
  
  var selNodes = objGUI.getXML().selectNodes(xpath);
  var arrayJsxid = [];
  if (selNodes.size() > 0) {
    var itrSelected = selNodes.iterator();
    while (itrSelected.hasNext()) {
      var recordId = itrSelected.next().getAttribute("jsxid");
      if (objGUI.selectRecord) // matrix use select record
        objGUI.selectRecord(recordId);
      else
        arrayJsxid.push(recordId); // tree selection array
    }
    if (jsx3.gui.Tree && objGUI.instanceOf("jsx3.gui.Tree") && objGUI.getMultiSelect()) {
      objGUI.setValue(arrayJsxid);
    }
  } else { // dont fail, just record an error.
    LOG.error("No records selected using " + xpath );
  }
  
}
  
// TODO -- store matrix row (index|id) of matching condition (text|radio/checkbox=checked|button=pressed)
Selenium.prototype.getJsxRecordIndex = function(locator) {
/**
 * Return the row index of a Matrix
 * @param locator {String} record locator by id or text.
 * @return index {Number} record row/item index number.
*/
 var strategy=locator.split(/\=/)[0];
 var isMatrix = /JsxMatrixRow/i;
 var jsxElement;
	jsxElement = this.browserbot.findElement(locator);
	if (jsxElement)	{
		jsxElement = (isMatrix.test(locator) ) ? jsxElement.parentNode : jsxElement ; // matrix row locator return the child cell 0.

		var previousSibling;
		var index = 0;
		while ((previousSibling = jsxElement.previousSibling) !== null) {
			if (!this._isCommentOrEmptyTextNode(previousSibling)) {
				index++;
			}
			jsxElement = previousSibling;
		}
		return index;
	} 

}

// TODO
//Selenium.prototype.getJsxRecordIds
//Selenium.prototype.doLoadData
//Selenium.prototype.doDragJsxInsert

Selenium.prototype.getJsxTypeCount = function(strNameType) {
/**
 * Return the number of JSX object matching the type
 */
 // TODO -- is this useful? or just for one case type.
 var appServer;
 if (selenium.jsxNamespace) { // handle app server with dot notation like "eg.portletA.APP"  
    appServer = this.getCurrentWindow()[selenium.jsxNamespace]; 
 }
 // Use rootblock to count the server alerts also.
 var rootblock = (appServer) ? appServer.getRootBlock() : jsx3.GO("JSXROOT");   
 var all = rootblock.getDescendantsOfType(strNameType);
 return (all) ? all.length : 0;
}

Selenium.prototype.getJsxOfType = function(text) {
/**
 * Get all JSX objects of given type, pass a parent jsxname or jsxtext to give a starting place.
 * @param  text {String} jsxname,type | jsxtext,type | type.
 * @return objects (Array)
*/
// TODO get all of name, get all of text
  var rootName = "JSXROOT";
  var type = text.trim();
  if (text.indexOf(",") > 0) {
    var params = text.split(/,/);
    rootName = stripQuotes(params[1].trim());
    type = params[2].trim();
  }
  
  var pObj = this.browserbot.findByJsxName(rootName);
  if (!pObj) { // maybe it's jsxtext value
    pObj = this.browserbot.findByJsxText(rootName);
  }
  
  return (pObj) ? pObj.getDescendantsOfType(type) : [];  
}

Selenium.prototype.getJsxElementId = function(locator) {
/**
 * Return the <b>jsxid</b> of an rendered JSX Object
*/
	var element = this.browserbot.findElement(locator); 
	return element.getAttribute("id"); 
}

Selenium.prototype.getJsxElementName = function(locator) {
/**
  * Get the jsxname of an Element, which is set as the label property for jsx generated components
  * @return name {String} jsxname
  */
 var e = this.browserbot.findElement(locator);
 while (e.parentNode && !e.getAttribute("label")) {
    e = e.parentNode;
 }

 return (e.getAttribute("label")) ? e.getAttribute("label") : null;
}

Selenium.prototype.getJsxByName = function (jsxName) {
/**
 * Return the JSX Object itself using its jsxname property.
 * @param jsxName {String} jsxname of the GI object
 * @return object (Object) The actual JSX object, not the HTML element
 */
 return this.browserbot.findByJsxName(jsxName);
}

Selenium.prototype.getJsxByText = function (jsxText) {
/**
 * Return the JSX Object itself using its jsxtext property.
 * @param jsxText {String}
 * @return object (Object) The actual JSX object, not the HTML element
 */
 return this.browserbot.findByJsxText(jsxText);
}


Selenium.prototype.getJsxSelectedIndex = function(locator) {
// index of selected option item, multi-select item, matrix row
  return this.getJsxSelectedIndexes(locator)[0];
}

Selenium.prototype.getJsxSelectedIndexes = function(locator) {
// @return Array
  var selectedIds = this.getJsxSelectedIds(locator);
  var allIdx = [];
  // for all selected, find the element index.
  
  var objJSX = storedVars.LASTJSXOBJ;
  var subtype = "itembyjsxid";
  if (objJSX.instanceOf("jsx3.gui.Matrix") || objJSX.instanceOf("jsx3.gui.Table")) {
     subtype = "rowbyjsxid";
  }

  for (var i = 0; i < selectedIds.length; i++ ) {
    var element = getActionableObject(objJSX, subtype); 
    if (!element) break; // no such element.
    var previousSibling;
    var index = 0;
    while ((previousSibling = element.previousSibling) != null) {
        if (!this._isCommentOrEmptyTextNode(previousSibling)) {
            index++;
        }
        element = previousSibling;
    }
    allIdx.push(index);
   }
   
	return allIdx;
}

Selenium.prototype.getJsxSelectedIds = function(locator) {
/*
*@param locator {String} jsxname or jsxid of the ui control
*@return jsxids (Array) of IDs selected option item, multi-select item, matrix row
*/
  var objJSX = this.browserbot.findJsxObject(locator);
  LOG.debug(locator + ", getselectedids , obj= "+ objJSX);
  if (objJSX && objJSX.getSelectedIds)
    var selected = objJSX.getSelectedIds();
  else   
    var selected = (objJSX) ? objJSX.getValue() : Assert.fail( locator + " is not found!");
	if (!selected.length) selected = [selected]; // only one selected, still returns an array.
	return selected;
}

Selenium.prototype.getJsxSelectedId = function(locator) {
// id of selected option item, multi-select item, matrix row
	var selected = this.getJsxSelectedIds(locator);
	return (selected) ? selected[0] : null;
}

Selenium.prototype.getJsxXmlDocument = function(locator) {
/** GetJsxDocument - store/verify/waitFor Jsx Document.
* @param locator {String} locator string
* @return document {String} CDF Document object associated with a control as string.
*/
  var objJSX = this.browserbot.findJsxObject(locator);  
  if (objJSX && objJSX.getXML ) 
    return objJSX.getXML();
  else
    Assert.fail(locator + " is not found or contain no xml.");
}

Selenium.prototype.getJsxText = function(locator) {
/**
* @param locator {String} locator string
* @return text {String} the jsxtext property if there is one
*/
  var jsxobj = this.browserbot.findJsxObject(locator);
  return (jsxobj && jsxobj.getText ) ? jsxobj.getText() : null;
}

Selenium.prototype.getJsxValue = function(locator) {
/**
* TODO -- this seems somewhat like getSelectedId? which use the same getValue method.
* @param locator {String} locator string
* @return value {String} the jsxvalue property if there is one
*/
  var jsxobj = this.browserbot.findJsxObject(locator);
  return (jsxobj && jsxobj.getValue ) ? jsxobj.getValue() : null;
}

Selenium.prototype.isJsxMenuWindowPresent = function(locatorId) {
/** Is the menu dropdown window open, find given the level id
 *
 * @param locatorId {String} Menu dropdown level id
 */
    var elmMenuWindow = this.browserbot.locateElementByJsxMenuWindowId(locatorId, this.browserbot.getDocument());
   //if (elmMenuWindow) LOG.debug('elmMenu = ' + getOuterHTML(elmMenuWindow));
   return (elmMenuWindow) ? true : false;
}

Selenium.prototype.isJsxSelectWindowPresent = function () {
/**
 * Is the Select control drop down list present.
 */
  var elmSelectWindow = this.browserbot.getDocument().getElementById("jsx30curvisibleoptions");   
  return (elmSelectWindow) ? true : false;
}

Selenium.prototype.isJsxButtonPresent = function(text) {
/** TODO - Dprecate this command
 * Asserts that the specified JsxButton element can be found.
 * @param text {String} label text or jsxname (or locator like JsxButtonName=jsxname and JsxButtonText=press me)
 */
    try {
        var element = null;
          element = this.browserbot.locateElementByJsxButtonName(text, this.browserbot.getDocument());
        if (!element)
          element = this.browserbot.locateElementByJsxButtonText(text, this.browserbot.getDocument());
        if (!element)  // locator search
	      element = this.browserbot.findElement(text);
        return (element) ? true : false;
    } catch (e) {
      LOG.debug("exception caught in isJsxButtonPresent");
    }
    return false;
};

Selenium.prototype.isJsxPresent = function(text) {
/**
 * Asserts that the specified JSX object can be found and the on screen element is there.
 * @param text {String} the jsxname or a JSX locator
 * @return (Boolean) true | false 
assertJsxPresent( )
assertJsxNotPresent( )
verifyJsxPresent( )
verifyJsxNotPresent( )
waitForJsxPresent( )
waitForJsxNotPresent( )

Example
  assertJsxPresent  | rootblock/tabbedpane/child[0]/mtxGridEditable | |
  verifyJsxPresent  | JsxDateNextYear=dpkrStartDate | |
  waitForJsxPresent | JsxDialogCaption=*Blah* | |

 */
 	var objGUI;

  try {
		if (text.indexOf("=") < 0) {
		 LOG.info(" findByJsxName " + text);
		 var objJSX = this.browserbot.findJsxObject(text);
     objGUI = (objJSX) ? objJSX.getRendered() : null;
		}
		if (!objGUI) { // only do this if objGUI is not found using jsxname search.
		 LOG.info(" findElement() " + text);
		 objGUI = this.browserbot.findElement(text);
		}
  } catch (e) {
	    LOG.warn("isJsxPresent Execption=" + e.message);
      return false;
  }
	
    return (objGUI) ? true : false;
};

Selenium.prototype.isJsxValueEqual= function(locator, value) {
/**
 * Is the value in control with given jsxname equal to value specified
 * assertJsxValueEquals - generic version of above.
 * @param jsxName {String} jsxname of control to locate
 * @param value {String} value to compare against
 */
    var jsxObject = this.browserbot.findJsxObject(locator);
    // Get the actual element value
    var actualValue = jsxObject.getValue();
    LOG.debug('jsxvalue expected=' + value +' actual=' + actualValue);
    return PatternMatcher.matches(value, actualValue);
};

Selenium.prototype.isJsxTextEqual= function(locator, value) {
/**
 * Is the text in control with given jsxname equal to value specified
 * assertJsxValueEquals - generic version of above.
 * @param jsxName {String} jsxname of control to locate
 * @param value {String} text to compare against
 */
    var jsxObject = this.browserbot.findJsxObject(locator);

    // Get the actual element value
    var actualValue = jsxObject.getText();
    LOG.debug('jsxtext expected='+ value + ' actual=' + actualValue);
    return PatternMatcher.matches(value, actualValue);
};


Selenium.prototype.assertJsxAlertOK= function(text) {
/** Find alert and dismiss with OK. works with prompt also.
 * @param text {String} The alert text in dialog window bar or body text.
 */
    LOG.debug("assertJsxAlert with text=" + text );

   // alert belong to system root, unless spawn from a dialog object, which is rare
   var oBlock = this.browserbot.findByJsxText(text);

   if (!oBlock) {
     Assert.fail("Alert caption text or message text '" + text + "' not found.");
     return;
   }
   var dialog = oBlock.getAncestorOfType('jsx3.gui.Dialog');
   if (dialog) {
     //LOG.debug("alert = " + dialog);
     //LOG.debug("text = " +  dialog.getDescendantOfName('message').getText() );
     var okButton = dialog.getDescendantOfName('ok');
     if (okButton) {
     //LOG.debug("ok button = " +  okButton );
     _triggerMouseEvent(okButton.getRendered(), 'click', true);
     }
   } else {
     Assert.fail("Jsx alert dialog containing '" + text + "' not found.");
     return;
   }

}

Selenium.prototype.assertJsxConfirmOK= function(text) {
/**
 * Confirm type alert has a cancel button, but otherwise work the same way as regular alert.
 * @param text {String} confirmation window bar text or body text
 */
  this.assertJsxAlertOK(text);
}

Selenium.prototype.assertJsxPromptOK= function(text, value) {
/**
 * Prompt dialog has a textbox that takes value, but otherwise work the same way as regular alert.
 * @param text {String} confirmation window bar text or body text
 * @param value {String} value to enter to prompt
 */
   LOG.debug("assertJsxAlert with text=" + text );


   // alert belong to system root, unless spawn from a dialog object, which is rare
   var oBlock = this.browserbot.findByJsxText(text);
   if (!oBlock) {
     Assert.fail("Prompt caption text or message text '" + text + "' not found.");
     return;
   }
   LOG.debug('object = ' + oBlock);
   var dialog = oBlock.getAncestorOfType('jsx3.gui.Dialog');
   if (dialog) {
   //getFirstChildOfType('jsx3.gui.TextBox', true);
     var editbox = dialog.findDescendants(function(objJSX) {
           return (objJSX.instanceOf('jsx3.gui.TextBox') );
       },false,false,false,true);

     editbox.setValue(value);
      //LOG.debug("alert = " + dialog);
     //LOG.debug("text = " +  dialog.getDescendantOfName('message').getText() );
     var okButton = dialog.getDescendantOfName('ok');
     var okTag  = okButton.getRendered();
     _triggerMouseEvent(okTag, 'click', true);
   } else {
     Assert.fail("Jsx prompt dialog containing '" + text + "' not found.");
     return;
   }


}

Selenium.prototype.jsxNamespace = null;

PageBot.JSXROOT = "JSXROOT"; //default root
PageBot.JSXWINDOWS = "JSXWINDOWS";
PageBot.prototype.jsxroot = PageBot.JSXROOT;
//PageBot.prototype.jsxapp  = null;

/**
 *  Select new jsx3.gui.Window as current working window.
 *  @param name {String} jsx3.gui.Window's jsxname
 *  @return jsxwin {object}
 */
Selenium.prototype.doSelectJsxWindow = function (name) {
  if (!name || name == "" || name == "null") {
    this.browserbot.jsxroot=PageBot.JSXROOT;
    this.browserbot.selectWindow("null");
    return;
  }
  
  var appServer = this._jsxappname; // set by jsxopen
  var win = this.browserbot.getCurrentWindow();
  if (selenium.jsxNamespace) // handle app server with dot notation like "eg.portletA.APP"  
    appServer = eval("win."+selenium.jsxNamespace); 
 
  if (appServer) {
    var jsxwin = appServer.getAppWindow(name);
  } else {
    var jsxwin = jsx3.GO(name);
  }
  
  if (jsxwin && (jsxwin instanceof jsx3.gui.Window) ) {    
    try {
      this.browserbot.selectWindow(jsxwin.getId().replace(/\./g,""));
      this.browserbot.jsxroot = PageBot.JSXWINDOWS;
    } catch(e) {
      e.description  = "selectJsxWindow : " + e + ". Popup blocked?";
      LOG.error(e);
      throw e;
    }
  }
  LOG.debug("browserbot.jsxroot=" + this.browserbot.jsxroot);
}


PageBot.prototype.findByJsxName = function(jsxname, inWindow) {
/**
 * findByJsxName - find jsx object in body using its jsxname
 *  @param value {String} JSX object jsxname
 *  @return JSX object
 */
 jsxname = stripQuotes(jsxname);
  var appServer = selenium._jsxappname; // set by jsxopen
  var appWindow = this.getCurrentWindow();
  if (!window.top.jsx3) {
  window.top.jsx3 = appWindow.jsx3
  }
  var jsxobj = null;

   if (jsx3) {
    selenium.jsxversion = jsx3.getVersion();
    var ancestor = this.jsxroot;

    LOG.debug('** findByJsxName = ' + jsxname + ',ancestor= ' + ancestor);
	  if (jsxname.indexOf("/") != -1) // there's a forward slash in there.
      jsxobj = this.findByJsxDom(jsxname, inWindow);
    else {  
    //NOTE: getJSXByName() does not return the same object as findDescendants(), which access the assoc array directly
    var objAncestor;
    if (selenium.jsxNamespace) // handle app server with dot notation like "eg.portletA.APP"  
      appServer = eval("appWindow."+selenium.jsxNamespace); 
    if (appServer) {
      objAncestor = appServer.getJSXByName(ancestor);
      jsxobj = (objAncestor) ? objAncestor.getDescendantOfName(jsxname) : null;	 
    } else {
	    objAncestor = jsx3.GO(ancestor); // This could be undefined.
      jsxobj = (objAncestor) ? objAncestor.findDescendants(
            function(objJSX) {
              return (objJSX.getName() == jsxname);
            }
         ,false,false,false,true) : null;
    }
    
    } // jsxdom locator
    if (jsxobj && storedVars) {
      storedVars['LASTJSXNAME'] = jsxobj.getName();
    }
    // set this no matter if it was found or not, jsxobj could be null.
    storedVars['LASTJSXOBJ'] = jsxobj;
   } // endif jsx3 
   LOG.debug("jsxobj = " + jsxobj);
   return jsxobj;
}


PageBot.prototype.findByJsxNameAndType = function(jsxname, jsxtype, inWindow) {
/**
  * findByJsxNameAndType - find jsx object in body using its jsxname and its jsxtype. This is the preferred locator since it is more specific based on name & type.
 *  @param jsxname {String} JSX object jsxname
 *  @param jsxtype {String} JSX object class type
 *  @return JSX object
  */
  jsxname = stripQuotes(jsxname);
  jsxname = jsxname.trim();
  var appServer = selenium._jsxappname; // set by jsxopen
  var appWindow = this.getCurrentWindow(); // topWindow should be renamed app under test window, autWindow.
  if (!window.top.jsx3) {
  window.top.jsx3 = appWindow.jsx3;
  }
  
  var jsxobj = null;

  var type = eval(jsxtype); // is this jsxtype loaded?
  
  if (jsx3 && type) {
    selenium.jsxversion = jsx3.getVersion();
    var ancestor = this.jsxroot;

    if (jsxname.indexOf("/") != -1) // there's a forward slash in there.
      jsxobj = this.findByJsxDom(jsxname, inWindow);
    else {  
      LOG.debug('** findByJsxNameAndType jsxname=' + jsxname  + ',type='+ jsxtype + ',parent=' + ancestor);
    var objAncestor;
    if (selenium.jsxNamespace) // handle app server with dot notation like "eg.portletA.APP"  
      appServer = eval("appWindow."+selenium.jsxNamespace); 
    if (appServer) {
      LOG.debug('namespace defined='  + appServer);
      objAncestor = appServer.getJSXByName(ancestor);
    } else {
      objAncestor = jsx3.GO(ancestor);
    }
   
    jsxobj = (objAncestor) ? objAncestor.findDescendants(
              function(objJSX) {
                return ((objJSX.getName() == jsxname) && objJSX.instanceOf(jsxtype) );
              },
    false,false,false,true) : null;
    }
    
    if (jsxobj && storedVars) {
      storedVars['LASTJSXNAME'] = jsxobj.getName();
    }
    // set this no matter if it was found or not
    storedVars['LASTJSXOBJ'] = jsxobj;
  } //end if jsx3
	return jsxobj;
}

PageBot.prototype.findByJsxText = function(text, inWindow) {
/**
 * findByJsxText - find jsx object in body using its jsxtext with glob or regexp pattern maching. This is the generic any object with this text pattern locator.
 *  @param value {String} JSX object jsxtext
 *  @param root {String} Root block name
 *  @return JSX object
 */
 text = stripQuotes(text);
  var appServer = selenium._jsxappname; // set by jsxopen
  LOG.debug('findByJsxText =' + text  );
  var appWindow = this.getCurrentWindow();
  if (!window.top.jsx3) {  
  window.top.jsx3 = appWindow.jsx3;
  }

  var jsxobj = null;

  if (jsx3){
    selenium.jsxversion = jsx3.getVersion();
    var ancestor = this.jsxroot;
    if (selenium.jsxNamespace) // handle app server with dot notation like "eg.portletA.APP"  
      appServer = eval("appWindow."+selenium.jsxNamespace); 
      
    if (appServer) {
       // There should always be a root block per namespace app. 
       var objAncestor = appServer.getJSXByName(ancestor);
       jsxobj = (objAncestor) ? objAncestor.findDescendants(
          function(objJSX) {
              return (objJSX.getText && PatternMatcher.matches(text, objJSX.getText()) );
          }
       ,false,false,false,true) : null;
    } else {
        jsxobj = jsx3.GO(ancestor).findDescendants(function(objJSX) {
            return (objJSX.getText && PatternMatcher.matches(text, objJSX.getText())  );
        },false,false,false,true);
    }
    if (jsxobj && storedVars) {
      storedVars['LASTJSXNAME'] = jsxobj.getName();  
    }
    storedVars['LASTJSXOBJ'] = jsxobj;
  } //endif jsx3
  return jsxobj;
}

PageBot.prototype.findByJsxTextAndType = function(text, jsxtype) {
/**
 * findByJsxTextAndType - find jsx object in body using its jsxtext with glob or regexp pattern maching
 *  @param text {String} JSX object jsxtext
 *  @param jsxtype {String} JSX object class type
 *  @return JSX object
 */
 text = stripQuotes(text);
  var appServer = selenium._jsxappname; // set by jsxopen
  var appWindow = this.getCurrentWindow();
  if (!window.top.jsx3) {  
  window.top.jsx3 = null;
  window.top.jsx3 = appWindow.jsx3;
  }
  
  var jsxobj = null;
  var JsxNamespace = selenium.jsxNamespace;
  var type = eval(jsxtype); // is this jsxtype loaded?
  
  if (jsx3 && type) {
    selenium.jsxversion = jsx3.getVersion();
    var ancestor = this.jsxroot;
    LOG.debug('findByJsxTextAndType =' + text  + ',type='+ jsxtype  + ",ancestor=" + ancestor);
    if (selenium.jsxNamespace) // handle app server with dot notation like "eg.portletA.APP"  
      appServer = eval("appWindow."+selenium.jsxNamespace); 
    if (appServer) {
       var objancestor = appServer.getJSXByName(ancestor);
       jsxobj = (objancestor) ? objancestor.findDescendants(
          function(objJSX) {
              return (objJSX.getText && PatternMatcher.matches(text, objJSX.getText()) && objJSX.instanceOf(jsxtype) );
          }
       ,false,false,false,true): null;
    } else {
      jsxobj = jsx3.GO(ancestor).findDescendants(function(objJSX) {
         return (objJSX.getText && PatternMatcher.matches(text, objJSX.getText()) && objJSX.instanceOf(jsxtype) );
       },false,false,false,true);
     }
    if (jsxobj && storedVars) {
     storedVars['LASTJSXNAME'] = jsxobj.getName();
    }
    storedVars['LASTJSXOBJ'] = jsxobj;
  } //endif jsx3
	 return jsxobj;
};

PageBot.prototype.findByJsxValue = function(value, inWindow) {
/**
 * findAllByJsxValue - find all jsx object in body using its jsxvalue with glob or regexp pattern maching
 *  @param value {String} JSX object jsxvalue
 *  @return JSX object
 */
 value = stripQuotes(value);
  var appServer = selenium._jsxappname; // set by jsxopen
  LOG.debug('findByJsxValue='+ jsxtype );
  var appWindow = this.getCurrentWindow();
  if (!window.top.jsx3) {  
  window.top.jsx3 = null;
  window.top.jsx3 = appWindow.jsx3;
  }

  var jsxobj = null;

  if (jsx3) {
    selenium.jsxversion = jsx3.getVersion();
    if (selenium.jsxNamespace) // handle app server with dot notation like "eg.portletA.APP"  
      appServer = eval("appWindow."+selenium.jsxNamespace); 
      
    if (appServer) {
       var ancestor = appServer.getJSXByName(this.jsxroot);
       jsxobj = ancestor.findDescendants(
          function(objJSX) {
            return (objJSX.getValue && PatternMatcher.matches(value, objJSX.getValue()));
       },false,false,false,true);   
    } else {
      jsxobj = jsx3.GO(this.jsxroot).findDescendants(function(objJSX) {
        return (objJSX.getValue && PatternMatcher.matches(value, objJSX.getValue()) );
      },false,false,false,true);
    }
    if (jsxobj && storedVars) {
      storedVars['LASTJSXNAME'] = jsxobj.getName();
    }
    storedVars['LASTJSXOBJ'] = jsxobj;
  } //endif jsx3
  return jsxobj;
};

PageBot.prototype.findByJsxDom = function (dompath, inWindow) {
/**
 * GI DOM path locator.  gi=jsxname/[@jsxtext="Menu"]/child[1]/jsx3.gui.Splitter/jsx3.gui.TextBox[1]
   .jsx3.gui.Splitter
    #mytemplategui/jsx3.gui.Select
 *  
 * Template.Block subclass can use .com.tibco.ux.SlideOut or [@jsxtype="com.tibco.ux.SlideOut"] 
 * Custom type  "::customtype/
 * @param text {String} dom path
 * @param inWindow {String} window object of application under test
 * @return objJSX (Object) jsx object located by jsx dom path.
 */
 var ExpChildNode = /^child\[(\d+)\]/;
 var ExpTypeJsx = /^(jsx3\.[^\[]*)(\[(\d+)\])?/i;
 var ExpTypeAny = /^\.([^\[]+)(\[(\d+)\])?/i;
 var ExpProperty = /^\[@(.*)\]/;
 LOG.debug('findByJsxDom='+  dompath);
 var appWindow = this.getCurrentWindow();
 if (!window.top.jsx3) { 
 window.top.jsx3 = null;
 window.top.jsx3 = appWindow.jsx3;
 }
 
 var appServer = selenium._jsxappname; // set by jsxopen
 if (selenium.jsxNamespace) // handle app server with dot notation like "eg.portletA.APP"  
  appServer = eval("appWindow."+selenium.jsxNamespace); 
      
 var tokens=dompath.split(/\//); // use forward slash to separate the object
 var empty = "";
 var singleSlash = (tokens[0] == empty && tokens[1] != empty);
 var doubleSlash = (tokens[0] == empty && tokens[1] == empty); 
 var start = (doubleSlash) ? 2 : (singleSlash) ? 1 : 0;
 LOG.debug("start at index = " + start );
 
 // Always get the root objJSX
 var root = (singleSlash) ? "JSXBODY" : this.jsxroot;
 var objJSX = (appServer) ?  objJSX = appServer.getJSXByName(root) : objJSX = jsx3.GO(root);
 LOG.debug("root=" + root + "obj=" +objJSX);
 // get subsequent using dom path
 for (var i=start; objJSX && i < tokens.length; i++) {
    var childname = tokens[i];
    if (ExpChildNode.test(childname)) 
    {
    /* childname=child[index] */
      var index = parseInt(RegExp.$1);
      objJSX = objJSX.getChild(index);
    } 
    else if (ExpTypeJsx.test(childname) || ExpTypeAny.test(childname) ) 
    {
    /* childname=jsx3.gui.Type | jsx3.gui.Type[index]  */   
      LOG.debug('type=' + childname + " reg$1=" + RegExp.$1 + " reg$2="+ RegExp.$2 + " reg$3" + RegExp.$3);
      var type = RegExp.$1;
      var index = RegExp.$3;
      if (index && index != "") {
        // the index-nth child of type, exact type only.
        var all = objJSX.getDescendantsOfType(type, true); // search only direct children
        if (all && all[index])
          objJSX = all[index]; 
      } else {
        objJSX = objJSX.getFirstChildOfType(childname, true);
      }
    } 
    else if (ExpProperty.test(childname))
    {
    /*[@attribute=value], attribute=jsxname,jsxtext,jsxtype,jsxvalue etc." */
      var locator = RegExp.$1; 
      if (/(.+)=(.+)/.test(locator)) {
        var property = RegExp.$1;
        var value = stripQuotes(RegExp.$2);
        LOG.debug("property=" + property + ",value=" + value);
        objJSX = objJSX.findDescendants(
            function(jsxobj) {
              return ( jsxobj[property] && PatternMatcher.matches(jsxobj[property], value));
            }
         ,false,false,false,true);
      } else {
      /* [@attribute] exist */
        objJSX = objJSX.findDescendants(
            function(jsxobj) {
              return ( jsxobj[property] );
            }
        ,false,false,false,true);
      }
    } 
    else if (/^\*$/.test(childname)) 
    {
    // foo/*/bar skip to next node
    continue;
      //var childname = items[++i]; 
      // bDepthFirst, not direct bChildrenOnly (allows backtrack)
      //objJSX = objJSX.getDescendantOfName(childname, true, false); 
    } else if (childname.length > 0) {
    /* descendant of name */
      LOG.debug("find name=" + childname);
      if (singleSlash) // must be direct child
        objJSX = objJSX.getDescendantOfName(childname, true, true); 
      else // double slash root search
        objJSX = objJSX.getDescendantOfName(childname, true, false); 
    } 
    else 
    { 
      // no name?, a double slash between nodes?
      continue;
    }       
  } // end for loop
 
    if (objJSX && storedVars) {
      storedVars['LASTJSXNAME'] = objJSX.getName();
    }
    storedVars['LASTJSXOBJ'] = objJSX; 
  return objJSX;
}

PageBot.prototype.findByJsxSelector = function (s, inWindow) {
/**
 * findByJsxSelector - find jsx object using a selector expression, New to GI 3.8.
 *  @param value {String} JSX object jsxtext
 *  @param root {String} Root block name
 *  @return JSX object
 */
  var appServer = selenium._jsxappname; // jsxopen
  var appWindow = this.getCurrentWindow();
  if (!window.top.jsx3) {
  window.top.jsx3 = appWindow.jsx3;
  }
  var objRoot = null;
  var objJSX = null;
  
  LOG.debug(">>>>PageBot.findByJsxSelector (" + s + ")" );
  if (jsx3) {    
    selenium.jsxversion = jsx3.getVersion();
    if (selenium.jsxNamespace) { // setNamespace command can change which app server to use.
        appServer = eval("appWindow."+selenium.jsxNamespace);
    }
    if (appServer) { // app server maybe set by jsxopen or setNamespace
        objRoot = appServer.getJSXByName(this.jsxroot);
    } else {
        objRoot = jsx3.GO(this.jsxroot);
    }
    if (objRoot && objRoot.selectDescendants) {
      objJSX = objRoot.selectDescendants(s, true);
      LOG.debug("root=" + objRoot + ", descendant = " + objJSX);
      if (objJSX) storedVars['LASTJSXNAME'] = objJSX.getName();
      storedVars['LASTJSXOBJ'] = objJSX;    
    }
  }
  return objJSX;
}

PageBot.prototype.findJsxObject = function(locator, inWindow) {
    var locatorType = 'gi';
    var locatorString = locator;

    // If there is a locator prefix, use the specified strategy
    var result = locator.match(/^([A-Za-z]+)=(.+)/);
    if (result) {
        locatorType = result[1].toLowerCase();
        locatorString = result[2];
    }        
    if (/^jsxselector/.test(locatorType) )
        return this.findByJsxSelector(locatorString, inWindow);
    else
    if (locatorType == "gi" || /^jsx/.test(locatorType) )
        return this.findByJsxDom(locatorString, inWindow);
     
    return null;
}

/** Locate element using JSX selector implementation.
    Select objects from the DOM using a CSS3-like selection syntax. This method considers the DOM tree whose root is this object. The following constructs are supported:

    * jsx3_gui_ClassName - matches objects by their exact class. Replace "." with "_" in the selector.
    * * - matches any object
    * #id - matches objects whose name equals id
    * .class-name - matches objects for which getClassName() is defined and returns a string that contains the token class-name
    * :first and :last - matches objects that are their parents' first and last children
    * :nth(n) and nth-child(n) - matches objects whose child index is equal to n
    * :instanceof(ClassName) - matches objects that are instances of the class or interface ClassName
    * [prop="value"] and [prop*="value"] - matches objects whose value for field prop equals value
    * or, with "*", contains value. The quotes around value are optional. [getter()="value"] and [getter()*="value"] - matches objects whose return value for method getter equals value
    * or, with "*", contains value. The quotes around value are optional. AB - matches objects that match both A and B
    * A B - matches descendants of objects matching A that match B
    * A > B - matches immediate children of objects matching A that match B
 *  @param text {String} CSS3 like selector string. e.g. "#jsxname"
 *  @param inDocument {Object} current document object
 *  @param inWindow {Object} current document object
 *  @return HTML element
 */
PageBot.prototype.locateElementByJsxSelector = function(selector, inDocument, inWindow) {
 LOG.debug('>>>>locateElementbyGISelector'  + selector);
 
 var objJSX = this.findByJsxSelector(selector, inWindow);
 return (objJSX) ? objJSX.getRendered() : null; 
}
PageBot.prototype.locateElementByJsxSelector.prefix = "jsxselector";


PageBot.prototype.locateElementByJsxLookup = function(text, inDocument, inWindow) {
/** Locate by actionable element - This is a generic locator using jsxlookups implementation.
 *  @param text {String} gi=jsxname|jsxtext[,subtype[,id][,index][,row.column]]
 *  @param inDocument {Object} current document object
 *  @param inWindow {Object} current document object
 *  @return HTML element
 */
	var name = text.trim();
  var type, item, col;
  var lookPattern = /([^,]*),([^,]*),?(.*)?/;
	var cellPattern = /(\d+)\.(\d+)/;

  if (match = text.match(lookPattern)) {
    name = match[1].trim();
    type = match[2].trim();
    if ( match[3] ) {
      item = match[3].trim();
      if (match2 = item.match(cellPattern) ) {
        item = match2[1]; col = match2[2];
      }
    }
  }
  var objJSX = this.findByJsxDom(name, inWindow);
  if (!objJSX) return null;

  LOG.debug(objJSX + ", type = " + type + ", item="+ item + ", col=" + col);
	return (!col) ? getActionableObject(objJSX, type, item) : getActionableObject(objJSX, type, item, col);
};
PageBot.prototype.locateElementByJsxLookup.prefix = "gi";

PageBot.prototype.locateElementByJsxName = function(jsxname, inDocument, inWindow) {
/** Locate element by jsxname - This is a generic locator for all jsx components
 *  @param jsxname {String} jsxname of the object
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
 var oJSX =  this.findByJsxName(jsxname, inWindow);
 return (oJSX) ? getActionableObject(oJSX) : null;
};

PageBot.prototype.locateElementByJsxText = function(text, inDocument, inWindow) {
/** Locate element by jsxtext - This is a generic locator for all jsx components
 *  @param text {String} jsxtext of the object
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
 var oJSX =  this.findByJsxText(text, inWindow);
 return (oJSX) ? getActionableObject(oJSX) : null;
};

PageBot.prototype.locateElementByJsxAlertCaption = function(text, inDocument, inWindow) {
/**
 * LocateElementByJsxAlertCaption - locate alert box by caption text
 * Caption ext can be glob, regexp, or exact text pattern.
 *  @param text {String} Text pattern in alert caption
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxAlertCaption =" + text );
   return this.locateElementByJsxDialogCaption(text, inDocument, inWindow);
};

PageBot.prototype.locateElementByJsxAlertText = function(text, inDocument, inWindow) {
/** Locate alert box by alert text in body
 * Alert text can be glob, regexp, or exact text pattern.
 *  @param text {String} Text pattern in Alert body
 *  @param inDocument {Object} current document object
 *  @return HTML element *
 *
*/
   LOG.debug("locateElementByJsxAlertText =" + text );
   // alert belong to system root, unless spawn from a dialog object, which is rare
   var oBlock = this.findByJsxText(text, inWindow);
   var alertbox = oBlock.getAncestorOfType('jsx3.gui.Dialog');

   return (alertbox) ? getActionableObject(alertbox) : null;

};



PageBot.prototype.locateElementByJsxButtonName = function(text, inDocument, inWindow) {
/** Locate Button and ImageButton
 *	Provides a object-oriented interface for a standard command button.
 * ImageButton
 *	An object-oriented interface onto a GUI button made of various image files.
 *
 * jsx3.gui.Button and ImabeButton by name (exact name)
 */
   LOG.debug("locateElementByButton jsxname=" + text );

   var oButton = this.findByJsxNameAndType(text, "jsx3.gui.Button", inWindow);
   if (!oButton && jsx3.gui.ToolbarButton ) // must be tbb button?
      oButton = this.findByJsxNameAndType(text, "jsx3.gui.ToolbarButton", inWindow);
   if (!oButton && jsx3.gui.ImageButton ) // must be image button?
      oButton = this.findByJsxNameAndType(text, "jsx3.gui.ImageButton", inWindow);

   //LOG.debug("jsx button = " + oButton);

   return (oButton != null) ? oButton.getRendered() : null;

};

PageBot.prototype.locateElementByJsxButtonText = function(text, inDocument, inWindow) {
/**
 * Locate jsx3.gui.Button and ImageButton by label text by pattern (glob, regex, exact)
 *  @param text {String} Text pattern in Block
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxButtonText text = " + text);
   var oButton = this.findByJsxTextAndType(text, "jsx3.gui.Button", inWindow);
   if (!oButton) // must be tbb button?, image button have no text.
      oButton = this.findByJsxTextAndType(text, "jsx3.gui.ToolbarButton", inWindow);
   return (oButton) ? oButton.getRendered() : null;
};


PageBot.prototype.locateElementByJsxBlockName = function(name, inDocument, inWindow) {
/**
 * Block
 *	This class provides a container-based, object-oriented approach to creating static html objects (basically this class creates "DIV" objects).
 * jsx3.gui.Block  (Same for Dialog) -- find by jsxname
 *
 *  @param name {String} Block jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
 * note: can be located with locator = "//DIV[@label="+ name + "]";
 */
   LOG.debug("locateElementByJsxBlockName jsxname =" + name );

   var oBlock = this.findByJsxNameAndType(name, "jsx3.gui.Block", inWindow) ;

   return (oBlock) ? oBlock.getRendered() : null;
}

PageBot.prototype.locateElementByJsxDateName = function(name, inDocument, inWindow) {
/**	Locate jsx.gui.DatePicker by jsxname
 *	A form element that allows for the selection of an arbitrary date by showing a navigable calendar.
 *  @param name {String} DatePicker jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxDateName jsxname =" + name );

   var oBlock = this.findByJsxNameAndType(name, "jsx3.gui.DatePicker", inWindow) ;

   return (oBlock) ? oBlock.getRendered() : null;
};

PageBot.prototype.locateElementByJsxDateIcon = function(name, inDocument, inWindow) {
/**	Locate jsx.gui.DatePicker icon by jsxname. New in 3.2.0
 *	A form element that allows for the selection of an arbitrary date by showing a navigable calendar
 * when the icon element is clicked.
 *  @param name {String} DatePicker jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxDateIcon jsxname =" + name );

   var objDatePicker = this.findByJsxNameAndType(name, "jsx3.gui.DatePicker", inWindow) ;
   var elmIcon = null;
   if (objDatePicker) {
    LOG.debug("jsx3.gui.DatePicker = " + objDatePicker);
    elmIcon = getActionableObject(objDatePicker, 'icon');
   }

   return elmIcon;
};

PageBot.prototype.locateElementByJsxDateInput = function(name, inDocument, inWindow) {
/**	Locate jsx.gui.DatePicker input box by jsxname. New 3.2.0
 *	A form element that allows for the selection of an arbitrary date by showing a navigable calendar
 * when the icon element is clicked.
 *  @param name {String} DatePicker jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxDateInput jsxname =" + name );

   var objDatePicker = this.findByJsxNameAndType(name, "jsx3.gui.DatePicker", inWindow) ;
   var elmInput = null;
   if (objDatePicker) {
    LOG.debug("jsx3.gui.DatePicker = " + objDatePicker);
    elmInput = getActionableObject(objDatePicker, 'textbox');
    //LOG.debug('date input =' + getOuterHTML(elmInput));
   }
   return elmInput;
};

PageBot.prototype.locateElementByJsxDateDay = function(text, inDocument, inWindow) {
/**	Locate day element of jsx.gui.DatePicker by 'jsxname,day'
 *	A form element that allows for the selection of an arbitrary date by showing a navigable calendar. <TD class=normal id=_jsx_testDatePicker_3_2006-0-1 >
 *  @param text {String} jsxname,day where 'today' is a special value to select current day date.
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxDateDay text =" + text );

   var params = text.split(",");
   var jsxName = params[0];
   var day = params[1];
   var today = new Date();

   var objCal = this.findByJsxNameAndType(jsxName, "jsx3.gui.DatePicker", inWindow) ;
   LOG.debug("datepicker = " + objCal);
   if (objCal) {
    if (!objCal.getDate()) {
     objCal.setDate(today); // current date
    }

    if (day == 'today') {
       objCal.setDate(today); // current date
       day = today.getDay();
    }
    var year = objCal.getDate().getFullYear();
    var month = objCal.getDate().getMonth();//+1;
    var dateString = year.toString() + "-" + month.toString() + "-" + day;
    LOG.debug('date string = ' + dateString + ' actual month is =' + month);

    return getActionableObject(objCal, 'day', dateString);
   }
};

PageBot.prototype.locateElementByJsxDateNextYear = function(jsxName, inDocument, inWindow) {
/**	Locate next year icon element of jsx.gui.DatePicker by 'jsxname'
 *  @param jsxname {String} jsxname of the DatePicker
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxDateNextYear jsxname =" + jsxName );

   var objCal = this.findByJsxNameAndType(jsxName, "jsx3.gui.DatePicker", inWindow) ;

    return (objCal) ? getActionableObject(objCal, "upyear") : null;
};

PageBot.prototype.locateElementByJsxDatePrevYear = function(jsxName, inDocument, inWindow) {
/**	Locate previous year icon element of jsx.gui.DatePicker by 'jsxname'
 *  @param jsxname {String} jsxname of the DatePicker
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
    LOG.debug("locateElementByJsxDatePrevYear jsxname =" + jsxName );
    var objCal = this.findByJsxNameAndType(jsxName, "jsx3.gui.DatePicker", inWindow) ;

    return (objCal) ? getActionableObject(objCal, "downyear") : null;
};

PageBot.prototype.locateElementByJsxDateNextMonth = function(jsxName, inDocument, inWindow) {
/**	Locate next month icon element of jsx.gui.DatePicker by 'jsxname'
 *  @param jsxname {String} jsxname of the DatePicker
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
    LOG.debug("locateElementByJsxDateNextMonth jsxjsxName =" + jsxName );
    var objCal = this.findByJsxNameAndType(jsxName, "jsx3.gui.DatePicker", inWindow) ;

    return (objCal) ? getActionableObject(objCal, "upmonth") : null;
};

PageBot.prototype.locateElementByJsxDatePrevMonth = function(jsxName, inDocument, inWindow) {
/**	Locate previous month icon element of jsx.gui.DatePicker by 'jsxname'
 *  @param jsxname {String} jsxname of the DatePicker
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
    LOG.debug("locateElementByJsxDatePrevMonth jsxjsxName =" + jsxName );
    var objCal = this.findByJsxNameAndType(jsxName, "jsx3.gui.DatePicker", inWindow) ;

    return (objCal)  ? getActionableObject(objCal, "downmonth") : null;
};

PageBot.prototype.locateElementByJsxDialogCaption = function(text, inDocument, inWindow) {
/** Locate  jsx3.gui.Dialog by CaptionText
 *	This class is used to generate a popup window/dialog box object.
 *   var locator = "//SPAN[text()="+ name + "]";
 *  @param text {String} Dialog caption text pattern
 *  @param inDocument {Object} current document object
 *  @return HTML element
*/
   LOG.debug("locateElementByJsxDialogCaption =" + text );
   var captionBlock = this.findByJsxTextAndType(text, "jsx3.gui.WindowBar", inWindow);

   return (captionBlock) ? getActionableObject(captionBlock.getAncestorOfType("jsx3.gui.Dialog") ) : null;
 };

PageBot.prototype.locateElementByJsxDialogName = function(name, inDocument, inWindow) {
/** Locate Dialog jsx3.gui.Dialog by jsxname
 *	This class is used to generate a popup window/dialog box object.
 * *  @param text {String} Dialog jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
*/
   //LOG.debug("locateElementByJsxDialogName jsxname = " + name );
   var dlg = this.findByJsxNameAndType(name, "jsx3.gui.Dialog", inWindow );
   return (dlg) ? getActionableObject(dlg) : null;
};

PageBot.prototype.locateElementByJsxDialogBody = function(name, inDocument, inWindow) {
/** Locate Dialog Body element
 *  @param text {String} Dialog jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
*/
   LOG.debug("locateElementByJsxDialog body jsxname =" + name );
   var oBlock = this.findByJsxNameAndType(name, "jsx3.gui.Dialog", inWindow );
   return (oBlock) ? oBlock.getRendered().childNodes[1] : null;
};

// Removed List/Grid deprecated control locators

PageBot.prototype.locateElementByJsxMatrixName = function(text, inDocument, inWindow) {
/** Locate List by jsxname
 *   The jsx3.gui.List class supports sorting, resizing, reordering, selection, discontinuous selection, key and mouse navigation, etc.
 * SPAN[class=jsx30list label=jsxname]
 *
 *  @param text {String} list jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxMatrixName name = " + text);

   var jsxElement = null;
   var jsxMatrix = this.findByJsxNameAndType(text, 'jsx3.gui.Matrix', inWindow);

   if (jsxMatrix != null) {
    jsxElement = getActionableObject(jsxMatrix);
   }
   return jsxElement;
};

PageBot.prototype.locateElementByJsxMatrixVScroller = function(text, inDocument, inWindow) {
/** Locate List by jsxname
 *   The jsx3.gui.List class supports sorting, resizing, reordering, selection, discontinuous selection, key and mouse navigation, etc.
 * SPAN[class=jsx30list label=jsxname]
 *
 *  @param text {String} list jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxMatrixName name = " + text);

   var jsxElement = null;
   var jsxMatrix = this.findByJsxNameAndType(text, 'jsx3.gui.Matrix', inWindow);

   if (jsxMatrix != null) {
    jsxElement = getActionableObject(jsxMatrix, 'vscroller');
   }
   return jsxElement;
};

PageBot.prototype.locateElementByJsxMatrixHScroller = function(text, inDocument, inWindow) {
/** Locate List by jsxname
 *   The jsx3.gui.List class supports sorting, resizing, reordering, selection, discontinuous selection, key and mouse navigation, etc.
 * SPAN[class=jsx30list label=jsxname]
 *
 *  @param text {String} list jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxMatrixName name = " + text);

   var jsxElement = null;
   var jsxMatrix = this.findByJsxNameAndType(text, 'jsx3.gui.Matrix');

   if (jsxMatrix != null) {
    jsxElement = getActionableObject(jsxMatrix, 'hscroller');
   }
   return jsxElement;
};

PageBot.prototype.locateElementByJsxMatrixCellIndex = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix cell with  jsxname.rowIndex.columnIndex
 * List row event : focus, blur
 *  @param text {String} Matrix jsxname.rowindex.colindex
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxMatrixCellIndex name = " + text);

   var mtxJsxName;
   var rowIndex;
   var colIndex;

   var jsxElement = null;
   var params = text.split(".");
   if ( params.length == 3 ) {
    mtxJsxName = params[0];
    rowIndex = params[1];
    colIndex = params[2];
   } else if (params.length == 4 ) {
       mtxJsxName = params[0] + '.' + params[1]; // put the parent.childname back together
       rowIndex = params[2];
       colIndex = params[3];
   }

   LOG.debug('matrix is = ' + mtxJsxName + " rowIndex=" + rowIndex + " colIndex="+ colIndex);

   var jsxMatrix = this.findByJsxNameAndType(mtxJsxName,'jsx3.gui.Matrix', inWindow);
   jsxElement = getActionableObject(jsxMatrix, 'cellbyindex', rowIndex, colIndex);
   //LOG.debug('matrix row = ' + getOuterHTML(jsxElement));
   return jsxElement;

};

PageBot.prototype.locateElementByJsxMatrixCellId = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix cell with Matrix jsxname.record_jsxid.column_index
 * List row event : focus, blur
 *  @param text {String} Matrix jsxname.record_jsxid.column_index
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
    LOG.debug("locateElementByJsxMatrixCellId locator = " + text);

   var params = text.split(".");
   var mtxJsxName = params[0];
   var cellJsxid = params[1];
   var colIndex = params[2];
   if (params.length == 4 ) {
        mtxJsxName = params[0] + '.' + params[1]; // put the parent.childname back together
        cellJsxid = params[2];
        colIndex = params[3];
   }

   LOG.debug("mtxname = " + mtxJsxName + " jsxid= " + cellJsxid + " colindex = " + colIndex);

   var jsxMatrix = this.findByJsxNameAndType(mtxJsxName,'jsx3.gui.Matrix', inWindow);
   //LOG.debug('matrix is = ' + jsxMatrix);
   var element = getActionableObject(jsxMatrix, 'cellbyjsxid', cellJsxid, colIndex);
   //LOG.debug('matrix row = ' + (element) ? getOuterHTML(element): "jsxid "+ cellJsxid + " not found!");
   return (element) ? element : null ; // cell is the selectable element

};

PageBot.prototype.locateElementByJsxMatrixCellText = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix cell  with jsxname,text_pattern
 *
 *  @param text {String} Matrix jsxname,text_pattern
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
    text = stripQuotes(text);

   LOG.debug('locateElementByJsxMatrixCellText text = "' + text +'"');

   var params = text.split(/,/);
   var jsxName = params[0];
   var cellText = stripQuotes(params[1]);
   var elmCell = null;
   var jsxList = this.findByJsxNameAndType(jsxName,'jsx3.gui.Matrix', inWindow);
   LOG.debug('matrix is = ' + jsxList + ' jsxname=' + jsxName + ' celltext='+cellText);

   var matrixRows = getActionableObject(jsxList, 'rows');
   for (var i=0; matrixRows && (i < matrixRows.length); i++) {
       var currentRow = matrixRows[i];
       for (var j=0; j < currentRow.childNodes.length; j++) {
           var currentCell = currentRow.childNodes[j];
           var elementText = getText(currentCell);
            //LOG.debug(cellText +'=element text=' + elementText);
            if (PatternMatcher.matches(cellText, elementText) ) {
                 //LOG.debug('cell =  ' + getOuterHTML(currentCell));
                return currentCell;
            }
       }
   }

   return elmCell;
};

PageBot.prototype.locateElementByJsxMatrixHeaderIndex = function(text, inDocument, inWindow) {
/* Locate Matrix column header by jsxname and column index
 *
 *  @param text {String} jsxname,column index
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxMatrixHeaderIndex = " + text);

   var params = text.split(",");
   var jsxName = params[0];
   var colIndex = parseInt(params[1]);

   var jsxElement = null;
   var jsxMatrix = this.findByJsxNameAndType(jsxName, 'jsx3.gui.Matrix', inWindow);

   if (jsxMatrix != null) {
    LOG.debug('matrix = ' + jsxMatrix);
    jsxElement = getActionableObject(jsxMatrix, 'column', colIndex);
    //LOG.debug('column=' + getOuterHTML(jsxElement));
   }
   return jsxElement;
};

PageBot.prototype.locateElementByJsxMatrixRowIndex = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix row with list jsxname,record jsxid
 * List row event : focus, blur
 *  @param text {String} Matrix jsxname,record jsxid
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var params = text.split(",");
   if (params[1]) {
      var mtxJsxName = params[0];
      var rowIndex = params[1] - 1; // row zero is actually 1

		  if (rowIndex < 0)
		     rowIndex = 1;
		
		   var jsxMatrix = this.findByJsxNameAndType(mtxJsxName,'jsx3.gui.Matrix', inWindow);
		   //LOG.debug('matrix is = ' + jsxMatrix);
		   var element = getActionableObject(jsxMatrix, 'cellbyindex', rowIndex, 0);
		   //LOG.debug('matrix row = ' + element.innerHTML);
		   return (element) ? element : null; // cell is the selectable element
   }
};

PageBot.prototype.locateElementByJsxMatrixRowId = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix row with list jsxname,record jsxid
 * List row event : focus, blur
 *  @param text {String} Matrix jsxname,record jsxid
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var params = text.split(",");
   if (params[1]) {
	   var mtxJsxName = params[0];
	   var jsxId = params[1];
	
	   var jsxMatrix = this.findByJsxNameAndType(mtxJsxName,'jsx3.gui.Matrix', inWindow);
	   //LOG.debug('matrix is = ' + jsxMatrix);
	   var element = getActionableObject(jsxMatrix, 'cellbyjsxid', jsxId, 0);
	   //LOG.debug('matrix row = ' + jsx3.html.getOuterHTML(element));
	   return (element) ? element : null;
   }
};

PageBot.prototype.locateElementByJsxMatrixRowText = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix row with list jsxname,record jsxid
 * List row event : focus, blur
 *  @param text {String} Matrix jsxname,record jsxid
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var params = text.split(",");
   var mtxJsxName = params[0];
   var rowText = params[1];

   var jsxList = this.findByJsxNameAndType(mtxJsxName,'jsx3.gui.Matrix', inWindow);
   LOG.debug('matrix is = ' + jsxList);
   var matrixRows = getActionableObject(jsxList, 'rows');
   for (var i=0; matrixRows && (i < matrixRows.length); i++) {
       var currentRow = matrixRows[i];
       //LOG.debug('matrix row = ' + currentRow.innerHTML);
       var elementText = getText(currentRow);
        LOG.debug(rowText +'=element text=' + elementText);
        if (PatternMatcher.matches(rowText, elementText) ) {
          // found the first row with given text pattern
          return currentRow.childNodes[0]; // matrix cell is the selectable element
        }
   }
   return null; // no matching text row found

};


PageBot.prototype.locateElementByJsxMatrixTreeItemText = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix TreeItem by text label.
 *  Tree item event : click
 *  @param text {String} Matrix jsxname,text
 *  @param inDocument {Object} current document object
 *  @return HTML element (the text label node, functional equivalent with icon node)
 */
   var params = text.split(",");
   var mtxJsxName = params[0];
   var nodeText = params[1];
   var row = null;

   var jsxList = this.findByJsxNameAndType(mtxJsxName,'jsx3.gui.Matrix', inWindow);
   LOG.debug('matrix is = ' + jsxList);
   var matrixRows = getActionableObject(jsxList, 'rows');
   for (var i=0; matrixRows && (i < matrixRows.length); i++)
   {
       var objRow = matrixRows[i];
       var objGUI = objRow.childNodes[0]; // cell node
       while(objGUI && objGUI.getAttribute &&  objGUI.getAttribute("jsxtype") != "plusminus" &&
                objGUI.getAttribute("jsxtype") != "paged")
                objGUI = objGUI.childNodes[0];
       textNode = objGUI.parentNode.childNodes[2];
       //LOG.debug('matrix row = ' + currentRow.innerHTML);
       var elementText = getText(textNode);
        LOG.debug(nodeText +'=element text=' + elementText);
        if (PatternMatcher.matches(nodeText, elementText) ) {
          return textNode; // found tree item with matching text pattern
        }

   }
   //LOG.debug('row ' + jsx3.html.getOuterHTML(row));
   return null; // matrix cell is the selectable element
}

PageBot.prototype.locateElementByJsxMatrixTreeItemIndex = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix TreeItem by text label.
 *  Tree item event : click
 *  @param text {String} Matrix jsxname,text
 *  @param inDocument {Object} current document object
 *  @return HTML element (the text label node, functional equivalent with icon node)
 */
   var params = text.split(",");
   var jsxName = params[0].trim();  // matrix jsxname
   var jsxIndex = params[1].trim();    // matrix item index

   var row = null;
   var jsxList = this.findByJsxNameAndType(jsxName,'jsx3.gui.Matrix', inWindow);
   LOG.debug('matrix is = ' + jsxList);
   var matrixRows = getActionableObject(jsxList, 'rows');
       var objRow = matrixRows[jsxIndex];
       var objGUI = objRow.childNodes[0]; // cell node
       while(objGUI && objGUI.getAttribute &&  objGUI.getAttribute("jsxtype") != "plusminus" &&
                objGUI.getAttribute("jsxtype") != "paged")
                objGUI = objGUI.childNodes[0];
       textNode = objGUI.parentNode.childNodes[2];
   //LOG.debug('row ' + jsx3.html.getOuterHTML(row));
   return textNode; // matrix cell is the selectable element
}

PageBot.prototype.locateElementByJsxMatrixTreeItemId = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Matrix TreeItem with  jsxname,record jsxid
 * List row event : focus, blur
 *  @param text {String} Matrix jsxname,record jsxid
 *  @param inDocument {Object} current document object
 *  @return HTML element (the icon node)
 */    
    var params = getNameId(text);//text.split(",");
    var jsxName = params.name;  // matrix jsxname
    var jsxId = params.id;    // matrix item id
    LOG.debug('locateElementByJsxMatrixTreeItemId jsxname=' + jsxName + ",jsxid="+jsxId);

    var jsxMtx = this.findByJsxNameAndType(jsxName,'jsx3.gui.Matrix', inWindow);
    if (!jsxMtx)
      return null;
    else
        LOG.debug('matrix='+jsxMtx);

    var element = getActionableObject(jsxMtx, 'icon', jsxId);
    //if (element != null)
    //  LOG.debug('item icon = ' + jsx3.html.getOuterHTML(element));
    return (element) ? element : null;
 };

PageBot.prototype.locateElementByJsxMenuText = function(text, inDocument, inWindow) {
/**
 * Locate jsx3.gui.Menu element by menu label text (glob|regex pattern)
 * @param {String} text Label text of the menu
 * @param inDocument {Object} current document object
 * @return HTML element
 */
   var oBlock = this.findByJsxTextAndType(text, "jsx3.gui.Menu", inWindow) ;
   LOG.debug("jsx3.gui.Menu caption = " + oBlock.getText());

   return  (oBlock != null) ? oBlock.getRendered() : null;
};

PageBot.prototype.locateElementByJsxMenuName = function(jsxname, inDocument, inWindow) {
/**
 * Locate Menu by jsxname. Note xpath locator=//span[@class='jsx30toolbarbutton' and @label='imagemenu']
 * Menu - this class is used to create menus, similar in functionality to system menus used for by the OS.
 *  @param jsxname {String} jsxname of Menu
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxMenuName = " + jsxname);
   var jsxMenu = this.findByJsxNameAndType(jsxname, "jsx3.gui.Menu", inWindow);

   //LOG.debug("jsx3.gui.Menu caption = " + jsxMenu.getText() + " id = " + jsxMenu.getId());

   return (jsxMenu != null) ? jsxMenu.getRendered() : null;
};

PageBot.prototype.locateElementByJsxMenuWindowId = function (hwID, inDocument, inWindow) {
/* Locate the actual drop down Menu Element By JsxHeavyWeightId (1,2,3,etc...).
 * Use this locator to verify that Menu expand properly
 */
   // IE bug trigger resize when there's none but dynamic element inserted to DOM
   //jsx3.gui.Event.unsubscribeAll(jsx3.gui.Event.RESIZE);

   var PREFIX = "jsx30curvisiblemenu_";
   return inDocument.getElementById(PREFIX + hwID);
}

PageBot.prototype.locateElementByJsxMenuItemText = function(text, inDocument, inWindow) {
  LOG.debug("locateElementByMenuItem Text =" + text  );
  var params = text.split(",");
  var jsxName = params[0].trim();  // menu jsxname
  var jsxText = params[1].trim();    // menu item text

  LOG.debug("jsxname = " + jsxName + " text = " + jsxText);
  var jsxMenu = this.findByJsxNameAndType(jsxName, "jsx3.gui.Menu", inWindow);
  // get all jsxids in the list
  LOG.debug("menu = " + jsxMenu);
  //LOG.debug("menu items length ="+ getActionableConstants(jsxMenu));

  var elmItem = null;
  var subMenuItems = getActionableObject(jsxMenu, 'items');
  //LOG.debug("menu items length ="+ subMenuItems.length);
  for (var i = 0; i < subMenuItems.length && !elmItem ; i++) {
      //LOG.debug('item ['+ i + '] = ' + getOuterHTML(subMenuItems[i]));
      var elementText = getText(subMenuItems[i]);
      //LOG.debug(jsxText +'=element text=' + elementText);
      if (PatternMatcher.matches(jsxText, elementText) ) {
       elmItem = subMenuItems[i]; // found the row with given text pattern
      }
  }
  return elmItem;

};

PageBot.prototype.locateElementByJsxMenuItemIndex = function(nameId, inDocument, inWindow) {
/** Locate Menu Item locator by Menu jsxname and Item index (1 based). This returns the outside DIV instead of TD element
 * @param text locator defined by jsxname,jsxid. For example "menu,1"
 * @param inDocument {Object} current document object
 * @return HTML element
 */
   var params = nameId.split(",");
   var jsxName = params[0];  // menu jsxname
   var jsxIndex = parseInt(params[1]) - 1;    // menu item jsxid

    LOG.debug("locateElementByJsxId name =" + jsxName + " id = "+ jsxIndex  );

    var jsxMenu = this.findByJsxNameAndType(jsxName, "jsx3.gui.Menu", inWindow);

    LOG.debug("menu id = " + jsxMenu.getId() );

   var elmMenuItem = getActionableObject(jsxMenu, 'itembyindex', jsxIndex);
    if (elmMenuItem)
      LOG.debug("elm menu item =" + elmMenuItem);
   return elmMenuItem;
};

PageBot.prototype.locateElementByJsxMenuItemId = function(nameId, inDocument, inWindow) {
/** Locate Menu Item locator by Menu jsxname and Item jsxid. This returns the outside DIV instead of TD element
 * @param text locator defined by jsxname,jsxid. For example "menu,1"
 * @param inDocument {Object} current document object
 * @return HTML element
 */
   var params = nameId.split(",");
   var jsxName = params[0];  // menu jsxname
   var jsxId = params[1];    // menu item jsxid

    LOG.debug("locateElementByJsxId name =" + jsxName + " id = "+ jsxId  );

    var jsxMenu = this.findByJsxNameAndType(jsxName, "jsx3.gui.Menu", inWindow);

    LOG.debug("menu id = " + jsxMenu.getId() );

   var locator =  jsxMenu.getId() + jsxId; // 3.1.0 menu item id
    LOG.debug("3.1.x locator =" + locator  );
   var elmMenuItem = inDocument.getElementById(locator);
   if (!elmMenuItem) {
       LOG.debug ('getActionableObject on id=' + jsxId);
      elmMenuItem = getActionableObject(jsxMenu, 'itembyjsxid', jsxId);
   }
   return elmMenuItem;
};

PageBot.prototype.locateElementByJsxRadioName = function(text, inDocument, inWindow) {
/** Locate RadioButton by the jsxname of Radio input
 *  @param text {String} Radio jsxname
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxRadioName text = " + text);
   var jsxObj = this.findByJsxNameAndType(text, "jsx3.gui.RadioButton", inWindow);
   return (jsxObj != null) ? jsxObj.getRendered() : null;
};

PageBot.prototype.locateElementByJsxRadioText = function(text, inDocument, inWindow) {
/** Locate RadioButton by the text label of the radio
 *  @param text {String} Radio jsxtext
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxRadioText text = " + text);
   var jsxObj = this.findByJsxTextAndType(text, "jsx3.gui.RadioButton", inWindow);

   //LOG.debug("jsx3.gui.RadioButton = " + jsxObj);

   return (jsxObj != null) ? jsxObj.getRendered() : null;
};

PageBot.prototype.locateElementByJsxRadioValue = function(text, inDocument, inWindow) {
/** Locate RadioButton by the value attribute of Radio input
 *  @param text {String} Radio jsxvalue
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxRadioValue value = " + text);
   var jsxObj = this.findByJsxValue(text);

   //LOG.debug("jsx3.gui.RadioButton = " + jsxObj);

   return (jsxObj != null) ? jsxObj.getRendered() : null;
};

/* Locate Select element by jsxname
 *	This class is used to create a DHTML version of the standard windows select box.
 *  @param text {String} jsxname of Select
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
PageBot.prototype.locateElementByJsxSelectName = function(text, inDocument, inWindow) {
   LOG.debug("locateElementByJsxSelect name = " + text);
   // init jsx3 object in case this is first locator called
   var jsxObj =  this.findByJsxNameAndType(text, 'jsx3.gui.Select', inWindow);

   return (jsxObj != null) ? jsxObj.getRendered() : null;
};

/* Locate Select element by jsxname
 *	This class is used to create a DHTML version of the standard windows select box.
 *  @param text {String} jsxname of Select
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
PageBot.prototype.locateElementByJsxComboInputName = function(text, inDocument, inWindow) {
   LOG.debug("locateElementByJsxComboInput name = " + text);
   // init jsx3 object in case this is first locator called

   var jsxObj =  this.findByJsxNameAndType(text, 'jsx3.gui.Select', inWindow);

   //LOG.debug("select obj = " + jsxObj);
   var inputElement = getActionableObject(jsxObj, 'textbox');
   return inputElement;
};

/* Removed - JsxSelectWindow locator 
 * Locate the drop down window of a select/combo control
 */

PageBot.prototype.locateElementByJsxSelectItemId = function(nameId, inDocument, inWindow) {
/* Locate Select Item by select jsxname and select record jsxid
 *  @param nameId {String} jsxname,jsxid of select item
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var jsxnid = getNameId(nameId);
   var jsxElement = null;

   LOG.debug("locateElementByJsxSelectItemId name =" + jsxnid.name + " id = "+ jsxnid.id  );

   var jsxObj = this.findByJsxNameAndType(jsxnid.name, "jsx3.gui.Select", inWindow);
   if (jsxObj) {
    //LOG.debug("Select element id = " + jsxObj.getId() );
    var locator =  jsxObj.getId() + jsxnid.id; // old 3.1.x item id
   //LOG.debug("locator =" + locator  );
    jsxElement = inDocument.getElementById(locator);
    if (!jsxElement) {
         jsxElement = getActionableObject(jsxObj, 'itembyjsxid', jsxnid.id);
    }
   }
   return jsxElement;
};


PageBot.prototype.locateElementByJsxSelectItemIndex = function(nameId, inDocument, inWindow) {
    /* Locate Select Item by select jsxname and select item index (1 based)
     *  @param nameId {String} jsxname,index of Select item
     *  @param inDocument {Object} current document object
     *  @return HTML element
     */
   var params = nameId.split(",");
   var jsxName = params[0];  // menu jsxname
   var index = params[1];    // menu item jsxid
   if (index > 0)
     index = index - 1;     // 0 based index
   LOG.debug("locateElementByJsxSelectItemIndex name =" + jsxName + " index = "+ index  );

   var jsxObj = this.findByJsxNameAndType(jsxName, "jsx3.gui.Select", inWindow);
   //LOG.debug("Select control= " + jsxObj.getId() );

   var jsxElement = getActionableObject(jsxObj, 'itembyindex', index);
   return jsxElement;
};

PageBot.prototype.locateElementByJsxSelectItemText = function(jsxname, inDocument, inWindow) {
/* Locate Select Item by select jsxname and select item text
 *  @param jsxname {String} jsxname,text of Select item
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementBySelectItem Text =" + jsxname  );
   var params = jsxname.split(",");
   var jsxName = params[0];  // menu jsxname
   var jsxText = params[1];    // item label text

   LOG.debug(" name =" + jsxName + " text = "+ jsxText  );

   var jsxSelect = this.findByJsxNameAndType(jsxName, "jsx3.gui.Select", inWindow);
   LOG.debug("select obj = " + jsxSelect);

  // get all jsxids in the Select
   var item = null;

    var recids  =  jsxSelect.getXML().selectNodes('//record');
    while (recids.hasNext() && !item ) {
      var itemJsxId = recids.next().getAttribute('jsxid');
      // find row element by listId+recordId
      var itemId = jsxSelect.getId() +  itemJsxId;
      LOG.debug("itemId=" + itemId);
      var element = inDocument.getElementById(itemId);
      if (!element) // 3.2.0
          element = getActionableObject(jsxSelect, 'itembyjsxid', itemJsxId)
      // check each child element text
      var elementText = getText(element);//.childNodes[1]); // childNodes[0]=<img> childNodes[1]=<span>text</span>
      LOG.debug(jsxText +'=element text=' + elementText);
      if (PatternMatcher.matches(jsxText, elementText) ) {
         return element;
      }
    }//while

  return item;

};

PageBot.prototype.locateElementByJsxSliderName = function(text, inDocument, inWindow) {
/**
 * Slider
 *	GUI control provides a draggable slider.
 *  @param text {String} jsxname of Slider
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxSlider name = " + text);
   // init jsx3 object in case this is first locator called

   var jsxObj =  this.findByJsxNameAndType(text, 'jsx3.gui.Slider', inWindow);
   //LOG.debug("slider obj = " + jsxObj);
   return (jsxObj != null) ? jsxObj.getRendered() : null;
}

PageBot.prototype.locateElementByJsxSliderHandle = function(text, inDocument, inWindow) {
/**
 * Locate the handle of slider, a GUI control provides a draggable slider.
 *  @param text {String} jsxname of Slider
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   LOG.debug("locateElementByJsxSlider handle with name = " + text);
   var jsxObj =  this.findByJsxNameAndType(text, 'jsx3.gui.Slider', inWindow);
   //LOG.debug("slider obj = " + jsxObj);
   return getActionableObject(jsxObj, 'handle');
 };

PageBot.prototype.locateElementByJsxSplitterName = function(text, inDocument, inWindow) {
/*
 *	This class manages layouts by providing a container that will paint its first two child GUI objects
 *	 separated by a 'splitter' (either vertical or horizontal).
 *  @param text {String} jsxname of Splitter
 *  @param inDocument {Object} current document object
 *  @return HTML element
*/ 
   LOG.debug("locateElementByJsx Splitter name = " + text);

   var jsxObj =  this.findByJsxNameAndType(text, 'jsx3.gui.Splitter', inWindow );

   return getActionableObject(jsxObj, 'bar');
};

PageBot.prototype.locateElementByJsxStackText = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Stack by stack text label text pattern(glob | regex | exact)
 *  @param text {String} text label on the Stack
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var jsxObj =  this.findByJsxTextAndType(text, 'jsx3.gui.Stack', inWindow);
   return (jsxObj != null) ? jsxObj.getRendered() : null;
};

PageBot.prototype.locateElementByJsxStackName = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Stack by stack jsxname (exact match)
 * --TODO, the actionable tag is not on top level div/span,
 *   it's actually under the first cell of child table element???
 *  @param text {String} jsxname of Stack
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   if ((text.indexOf('"') == 0) || text.indexOf("'") == 0)
      text = text.slice(1, -1);
   LOG.debug("locateElementByJsxStack name = " + text);

   var jsxObj =  this.findByJsxNameAndType(text, 'jsx3.gui.Stack', inWindow );

   LOG.debug("stack obj = " + jsxObj);
   // actionable element is in a table row 0 cell 0
   return (jsxObj != null) ? jsxObj.getRendered() : null;
};

PageBot.prototype.locateElementByJsxTabName = function(text, inDocument, inWindow) {
/** Locate Tab by jsxname
 *	jsx3.gui.Tab instances are always bound to a parent "jsx3.gui.TabbedPane" instance that contains them.
 *  @param text {String} jsxname of Tab
 *  @param inDocument {Object} current document object
 *  @return HTML element
*/
   LOG.debug("locateElementByJsxTab name = " + text);

   var jsxObj =  this.findByJsxNameAndType(text, 'jsx3.gui.Tab', inWindow );
   //LOG.debug("Tab obj = " + jsxObj);

   return (jsxObj != null) ? jsxObj.getRendered() : null;

};

PageBot.prototype.locateElementByJsxTabText = function(text, inDocument, inWindow) {
/** Locate Tab by tab text label
 *	jsx3.gui.Tab instances are always bound to a parent "jsx3.gui.TabbedPane" instance that contains them.
 *  @param text {String} jsxname of Tab
 *  @param inDocument {Object} current document object
 *  @return HTML element
*/
   var jsxObj =  this.findByJsxTextAndType(text, 'jsx3.gui.Tab', inWindow);
   LOG.debug("Tab obj = " + jsxObj);

   return (jsxObj != null) ? jsxObj.getRendered() : null;

};

PageBot.prototype.locateElementByJsxTreeName = function(text, inDocument, inWindow) {
/** Locate Tree, which is a DHTML-based navigational trees (similar to the tree structure used by Windows Explorer with folders and files).
 * jsx3.gui.Tree by jsxname
 *  @param text {String} jsxname of Tree
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var jsxObj =  this.findByJsxNameAndType(text, 'jsx3.gui.Tree', inWindow);

   //LOG.debug("tree obj = " + jsxObj);

   return (jsxObj != null) ? jsxObj.getRendered() : null;


}

PageBot.prototype.locateElementByJsxTreeItemText = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Tree item by Record jsxid and Tree jsxname
 *  @param text {String} jsxname,jsxid of Tree item
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var params = text.split(",");
   var jsxName = params[0];  // tree jsxname
   var jsxText = params[1];    // tree item jsxid

   LOG.debug("locateElementByJsxTreeItemText name =" + jsxName + " jsxid = "+ jsxText  );

    var jsxTree = this.findByJsxNameAndType(jsxName, 'jsx3.gui.Tree', inWindow);

    LOG.debug("tree = " + jsxTree );

   var jsxItems = getActionableObject(jsxTree, 'items'); // get all tree items
   var jsxElement = null;
   for (var i = 0; (i < jsxItems.length) && !jsxElement; i++) {
       var itemLabel = getText(jsxItems[i].childNodes[2]);
       //LOG.debug("expected = "+ jsxText + " label=" + itemLabel);
       if (PatternMatcher.matches(jsxText, itemLabel))
         jsxElement = jsxItems[i].childNodes[2]; // use the label, this has the dragid.
   }
   return (jsxElement) ? jsxElement : null;

};

PageBot.prototype.locateElementByJsxTreeItemIndex = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Tree item by Tree jsxname and index
 *  @param text {String} jsxname,index of Tree item
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var params = text.split(",");
   var jsxName = params[0].trim();  // tree jsxname
   var jsxindex = params[1].trim();    // tree item jsxid

   LOG.debug("locateElementByJsxTreeItemId name =" + jsxName + " index = "+ jsxindex  );

   var jsxTree = this.findByJsxNameAndType(jsxName, 'jsx3.gui.Tree', inWindow);
   // itembyindex returns the toggler+icon+label parentNode, the caption. 
   var jsxElement = getActionableObject(jsxTree, 'labelbyindex', jsxindex); // get the label node for drag-drop

   return (jsxElement) ? jsxElement : null;

};

PageBot.prototype.locateElementByJsxTreeItemId = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.Tree item by Record jsxid and Tree jsxname
 *  @param text {String} jsxname,jsxid of Tree item
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var params = text.split(",");
   var jsxName = params[0];  // tree jsxname
   var jsxId = params[1];    // tree item jsxid

   LOG.debug("locateElementByJsxTreeItemId name =" + jsxName + " jsxid = "+ jsxId  );

   var jsxTree = this.findByJsxNameAndType(jsxName, 'jsx3.gui.Tree', inWindow);

   LOG.debug("tree = " + jsxTree );

   var locator =  jsxTree.getId() + '_' + jsxId;
   //LOG.debug("locator =" + locator  );
   var jsxElement = getActionableObject(jsxTree, 'labelbyjsxid', jsxId);

   return (jsxElement) ? jsxElement : null;

}


PageBot.prototype.locateElementByJsxTextboxName = function(text, inDocument, inWindow) {
/** Locate jsx3.gui.TextBox by jsxname (exact).
 *	This jsx3.gui.TextBox class allows integration of a standard HTML text input into the JSX DOM.
 *  @param text {String} jsxname of textbox
 *  @param inDocument {Object} current document object
 *  @return HTML input element
*/
  LOG.debug("locateElementByJsxTextboxName = " + text);

  var jsxText =  this.findByJsxNameAndType( text, "jsx3.gui.TextBox", inWindow );

  return (jsxText != null) ? jsxText.getRendered() : null;
};

// TODO -- reduce code
PageBot.prototype.locateElementByJsxTimePickerHours = function(text, inDocument, inWindow) {
    var jsxTPicker = this.findByJsxNameAndType(text, "jsx3.gui.TimePicker", inWindow);
    var inputElement = getActionableObject(jsxTPicker, 'hour');
    return inputElement;
};

PageBot.prototype.locateElementByJsxTimePickerMinutes = function(text, inDocument, inWindow) {
    var jsxTPicker = this.findByJsxNameAndType(text, "jsx3.gui.TimePicker", inWindow);
    var inputElement = getActionableObject(jsxTPicker, 'minute');
    return inputElement;
};

PageBot.prototype.locateElementByJsxTimePickerSeconds = function(text, inDocument, inWindow) {
    var jsxTPicker = this.findByJsxNameAndType(text, "jsx3.gui.TimePicker", inWindow);
    var inputElement= getActionableObject(jsxTPicker, 'second');
    return inputElement;
};

PageBot.prototype.locateElementByJsxTimePickerMillis = function(text, inDocument, inWindow) {
    var jsxTPicker = this.findByJsxNameAndType(text, "jsx3.gui.TimePicker", inWindow);
    var inputElement= getActionableObject(jsxTPicker, 'milli');
    return inputElement;
}

PageBot.prototype.locateElementByJsxTimePickerAmPm = function(text, inDocument, inWindow) {
    var jsxTPicker = this.findByJsxNameAndType(text, "jsx3.gui.TimePicker", inWindow);
    var inputElement= getActionableObject(jsxTPicker, 'ampm');
    return inputElement;
}

PageBot.prototype.locateElementByJsxTimePickerSpinUp = function(text, inDocument, inWindow) {
    var jsxTPicker = this.findByJsxNameAndType(text, "jsx3.gui.TimePicker", inWindow);
    var inputElement= getActionableObject(jsxTPicker, 'spinup');
    return inputElement;
}

PageBot.prototype.locateElementByJsxTimePickerSpinDown = function(text, inDocument, inWindow) {
    var jsxTPicker = this.findByJsxNameAndType(text, "jsx3.gui.TimePicker", inWindow);
    var inputElement= getActionableObject(jsxTPicker, 'spindown');

    return inputElement;
}
PageBot.prototype.locateElementByJsxToolbarButtonName = function(text, inDocument, inWindow) {
/**
 * ToolbarButton
 *	This class provides a standard interface for creating toolbar buttons.
 *  jsx3.gui.ToolbarButton (also used on dialog box min/max/close buttons )
 *  @param text {String} jsxname of ToolbarButton
 *  @param inDocument {Object} current document object
 *  @return HTML element
 */
   var oButton = this.findByJsxNameAndType( text, "jsx3.gui.ToolbarButton", inWindow );

   //LOG.debug("jsxtoolbarbutton = " + oButton);

   return (oButton != null) ? oButton.getRendered() : null;
};

PageBot.prototype.locateElementByJsxToolbarButtonText = function(text, inDocument, inWindow) {
/**
 * toolbarButton by button text (pattern: glob, regexp)
 *  @param text {String} jsxname of ToolbarButton
 *  @param inDocument {Object} current document object
 *  @return HTML element
*/
   var oButton = this.findByJsxTextAndType(text, 'jsx3.gui.ToolbarButton', inWindow);
   return (oButton != null) ? oButton.getRendered() : null;
};

// Internal function used by typeJsxTextbox command
PageBot.prototype.replaceJsxText = function(jsxelement, text, jsxobj)
{
    if (jsxelement) {
        //LOG.debug('obj =' + jsxobj.getName()  +'text = ' + text);
        if   ( Number(jsx3.getVersion().split(".")[1]) < 7 &&
        jsx3.gui.DatePicker && jsxobj && jsxobj.instanceOf(jsx3.gui.DatePicker)) {
            try {
                jsxelement = getActionableObject(jsxobj, "textbox");
                dateToSet = new Date(text);
                triggerEvent(jsxelement, 'focus', false);
                triggerEvent(jsxelement, 'select', true);
                jsxobj.setDate(dateToSet);
                LOG.debug("new date = " +jsxobj.getDate());
                triggerEvent(jsxelement, 'change', false);               
            } catch (ex) {
                this.replaceText(jsxelement, text);
            }
        } else {		
         this.replaceText(jsxelement, text); //focus, select, change
        }
		jsxelement.blur();
		triggerEvent(jsxelement, 'blur', false);
   }

}

// Original -- $Id: includeCommand.js 166 2006-12-11 22:03:45Z rob $
/* Modified by Darren Hwang, 2007 */
/*extern document, window, XMLHttpRequest, ActiveXObject */
/*extern Selenium, htmlTestRunner, LOG, HtmlTestCaseRow, testFrame, storedVars, URLConfiguration */

/**
 * add the content of another test to the current test
 * target receives the page address (from selenium tests root)
 *
 * nested include works
 *
 * example of use
 * in the test :
 * | store            | 3445                | userId    |
 * | store            | joe                 | name      |
 * | // Third column contains time out value        |
 * |include           | testpiece.html      | 5000  |
 *
 * where * testpiece.html contains
 *
 * | this is a piece of test                     |
 * |open              | myurl?userId=${userId}|  |
 * |verifyTextPresent | ${name}               |  |

 * as selenium reach the include commande, it will load
 * testpiece.html into you current test and your test will become

 * | store            | 3445                | userId    |
 * | store            | joe                 | name      |
 * |included          | testpiece.html          |  |
 * |open              | myurl?userId=${userId}  |  |
 * |verifyTextPresent | ${name}                 |  |

 *
 * Original Authors
 * *author Alexandre Garel
 * *author Robert Zimmermann
 *  Version: 2.1

 * Modified 2007-08-15  -- GITAK, dhwang
 * - Removed variable replacement
 * - Removed show/hide feature
 * - Fixed IE7 XMLHttpRequest permission denied issue.
 * - Fixed HTA run issue
 * - Fixed Absolute path in test=C:/abs_path/blah/testsuite.html URL parameter issue
 * - Decorate include command with timeout
 * Mod 2008
 * - Use the prepareUrl() implementation fom Include 2.3.
 */

Selenium.prototype.doIncluded = function(locator, paramString) {
    // Includ+ed+, do nothing, as rows are already included
};


function IncludeCommand() {
    this.targetRow = null;
}

IncludeCommand.EXPANDED   = "included"; // this was the old replacement in pre 2.1? --dhwang
IncludeCommand.LOG_PREFIX = "IncludeCommand: ";

IncludeCommand.prototype.postProcessIncludeCommandRow = function(includeCmdRow) {
    /**
     * Command name is changed from 'include' to 'included' to avoid another inclusion during a second pass
     *
     * @param includeCmdRow TR DOM-element, the source of the current execution
     */
    var lastInclRow = this.targetRow;
    (includeCmdRow.getElementsByTagName("td"))[0].firstChild.nodeValue = IncludeCommand.EXPANDED;

    // removed the fold/unfold trick -- dhwang
};

IncludeCommand.extendSeleniumExecutionStack = function(newRows) {
    /**
     * Put the new commands into the current position of the selenium execution stack
     *
     * @param newRows Array of HtmlTestCaseRows to be inserted in seleniums' execution stack
     */
    try {
        //(rz WEB.DE) changed to work with selenium 0.8.0
        // Leave previously run commands as they are
        var seleniumCmdRowsPrev = htmlTestRunner.currentTest.htmlTestCase.commandRows.slice(0, htmlTestRunner.currentTest.htmlTestCase.nextCommandRowIndex);
        var seleniumCmdRowsNext = htmlTestRunner.currentTest.htmlTestCase.commandRows.slice(htmlTestRunner.currentTest.htmlTestCase.nextCommandRowIndex);
        var newCommandRows = seleniumCmdRowsPrev.concat(newRows);
        htmlTestRunner.currentTest.htmlTestCase.commandRows = newCommandRows.concat(seleniumCmdRowsNext);
    } catch(e) {
        LOG.error(IncludeCommand.LOG_PREFIX + "Error adding included commandRows. exception=" + e);
        throw new Error("Error adding included commandRows. exception=" + e);
    }
};

IncludeCommand.prototype.injectIncludeTestrows = function(includeCmdRow, testDocument, testRows) {
    /**
     * Insert new (included) commad rows into current testcase (inject them)
     *
     * @param includeCmdRow TR Element of the include commad row wich called this include extension (from here the included rows have to be inserted)
     * @param testDocument DOM-document of the current testcase (needed to copy included command rows)
     * @param testRows prepared testrows to be included
     * @return newRows Array of HtmlTestCaseRow objects ready to be used by selenium
     */
    this.targetRow = includeCmdRow;
    var newRows = new Array();

    // TODO: use selenium methods to get to the inner test-rows (tr-elements) of an testcase.
    //       here it is the testcase to be included
    // first element is empty and first row is the title => let's begin at i=2
    for (var i = 2 ; i < testRows.length; i++) {
        var newRow = testDocument.createElement("tr");
        var newText = testRows[i];
        // inserting
        this.targetRow = this.targetRow.parentNode.insertBefore(newRow, this.targetRow.nextSibling);
        // innerHTML permits us not to interpret the rest of html code
        // note: innerHTML is to be filled after insertion of the element in the document
        // note2 : does not work with internet explorer
        try {
            this.targetRow.innerHTML = newText;
        } catch (e) {
            // doing it the hard way for ie
            // parsing column, doing column per column insertion
             LOG.debug(newText);
            // remove < td>
            newText = newText.replace(/<\s*td[^>]*>/ig,"");
            //Lance: remove </tbody>
            newText = newText.replace(/<\/\s*tbody*>|<br>/ig,"");
            // split on </td>
            var testCols = newText.split(/<\/\s*td[^>]*>/i);
            // first element is empty -> j=1
            for (var j = 0 ; j < testCols.length; j++) {
                var newCol = testDocument.createElement("td");
                var colText = testCols[j];
                newCol = this.targetRow.appendChild(newCol);
                newCol.innerHTML = colText;
            }
        }
        // TODO try to use original HtmlTestCase class instead copying parts of it
        if (newRow.cells.length >= 3) {
            var seleniumRow = new HtmlTestCaseRow(newRow);
            seleniumRow.addBreakpointSupport();
            newRows.push(seleniumRow);
        }
    }
    //LOG.debug(IncludeCommand.LOG_PREFIX + "end with some table magic");
    return newRows;
};


IncludeCommand.prepareTestCaseAsText = function(responseAsText) {
    /**
     * Prepare the HTML to be included in as text into the current testcase-HTML
     * Strip all but the testrows (tr)
     * Stripped will be:
     *  - whitespace (also new lines and tabs, so be careful wirt parameters relying on this),
     *  - comments (xml comments)
     * Replace variable according to include-parameters
     * note: the include-variables are replaced literally. selenium does it at execution time
     * also note: all selenium-variables are available to the included commands, so mostly no include-parameters are necessary
     *
     * @param responseAsText table to be included as text {String}
     * @return testRows array of tr elements (as string!) containing the commands to be included
     *
     * TODO:
     *  - selenium already can handle testcase-html. use selenium methods or functions instead
     *  - find better name for requester
     */
    // LOG.debug(IncludeCommand.LOG_PREFIX +
    //    "removing new lines, carret return and tabs from response in order to work with regexp");
    // removing new lines, carret return and tabs from response in order to work with regexp
    var pageText = responseAsText.replace(/\r|\n|\t/g,"");
    // remove comments
    // begin comment, not a dash or if it's a dash it may not be followed by -> repeated, end comment
    pageText = pageText.replace(/<!--(?:[^-]|-(?!->))*-->/g,"");
    // find the content of the test table = <[spaces]table[char but not >]>....< /[spaces]table[chars but not >]>
    var testText = pageText.match(/<\s*table[^>]*>(.*)<\/\s*table[^>]*>/i)[1];

    // removes all  < /tr>
    // in order to split on < tr>
    testText = testText.replace(/<\/\s*tr[^>]*>/ig,"");
    // split on <tr>
    var testRows = testText.split(/<\s*tr[^>]*>/i);
    // LOG.debug(IncludeCommand.LOG_PREFIX + "about to return testRows");
    return testRows;
};

IncludeCommand.responseIsSuccess = function(status) {
/* succuess status == 2XX or 0 or undefined */
    return status == undefined
        || status == 0
        || (status >= 200 && status < 300);
}

IncludeCommand.getIncludeDocumentBySynchronRequest = function(includeUri) {
    /**
     * Prepare and do the XMLHttp Request synchronous as selenium should not continue execution meanwhile
     *
     * note: the XMLHttp requester is returned (instead of e.g. its text) to let the caller decide to use xml or text
     *
     * selenium-dependency: uses extended String from htmlutils
     *
     *
     * @param includeUri URI to the include-document (document has to be from the same domain)
     * @return XMLHttp requester after receiving the response
     */
    var url = IncludeCommand.prepareUrl(includeUri, document.location);
    // the xml http requester to fetch the page to include
    var requester = IncludeCommand.newXMLHttpRequest();
    if (!requester) {
        throw new Error("XMLHttp requester object not initialized");
    }
    requester.open("GET", url, false); // synchron mode ! (we don't want selenium to go ahead)
    requester.send(null);

    if (!this.responseIsSuccess(requester.status)) {
        throw new Error("Error while fetching " + url + " server response has status = " + requester.status + ", " + requester.statusText );
    }
    return requester;
};

// include 2.3 prepareUrl
IncludeCommand.prepareUrl = function(includeUrl) {
    // Construct absolute URL to get include document
     // using selenium-core handling of urls (see absolutify in htmlutils.js)

    var prepareUrl;
    // htmlSuite mode of SRC? TODO is there a better way to decide whether in SRC mode?
    if (htmlTestRunner.controlPanel.getBaseUrl() != null) {
        LOG.debug(IncludeCommand.LOG_PREFIX + "we seem to run in SRC, do we?");
        preparedUrl = absolutify(includeUrl, htmlTestRunner.controlPanel.getTestSuiteName());
    } else {
        preparedUrl = absolutify(includeUrl, selenium.browserbot.baseUrl);
    }
    LOG.info(IncludeCommand.LOG_PREFIX + "using url to get include '" + preparedUrl + "'");
    return preparedUrl;
};

IncludeCommand.newXMLHttpRequest = function() {
    // Cannot use prototype.js or xmlxtras.js because we want IE to use ActiveX
    var requester = 0;
    var exception = '';
    // see http://developer.apple.com/internet/webcontent/xmlhttpreq.html
    try {
        // Check for IE/ActiveX first
        if(window.ActiveXObject) {
            try {
                requester = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e) {
                requester = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } // Reorder to avoid using Native XMLHTTP on IE7, which is more restrictive -- dhwang
        // native XMLHttpRequest object
        else if(window.XMLHttpRequest) {
            requester= new XMLHttpRequest();
        }

    }
    catch(e) {
        throw new Error("Your browser has to support XMLHttpRequest in order to use include \n" + e);
    }
    return requester;
};


IncludeCommand.prototype.doInclude = function(fileName) {
    // ask selenium for the current row (<tr> Element of the include command)

    var currentSelHtmlTestcase = testFrame.getCurrentTestCase(); //htmlTestRunner.currentTest.htmlTestCase; --dhwang
    var includeCmdRow = currentSelHtmlTestcase.commandRows[currentSelHtmlTestcase.nextCommandRowIndex - 1].trElement;

    if (!includeCmdRow) {
        throw new Error("includeCommand: failed to find include-row in source test table");
    }

    var reqResponse = IncludeCommand.getIncludeDocumentBySynchronRequest(fileName);

    // removed paramsArray -- dhwang
    var includedTestCaseHtml = IncludeCommand.prepareTestCaseAsText(reqResponse.responseText);
    var testDocument = testFrame.getDocument();

    // member method? because targetRow member is set
    var newRows = this.injectIncludeTestrows(includeCmdRow, testDocument, includedTestCaseHtml);

    IncludeCommand.extendSeleniumExecutionStack(newRows);

    // member method? because targetRow member is accessed
    this.postProcessIncludeCommandRow(includeCmdRow);
};


Selenium.prototype.doInclude = function(fileName, timeout) {
    //LOG.debug(IncludeCommand.LOG_PREFIX + "modified from v2.1 -- dhwang");
    if (isNaN(parseInt(timeout))) {
        timeout = Selenium.DEFAULT_TIMEOUT;;
    }     
    var includeCommand = new IncludeCommand();
    Selenium.decorateFunctionWithTimeout(includeCommand.doInclude, timeout);
    includeCommand.doInclude(fileName);
};

/*===================================================*/
//Extended commands for recorder playback.

Selenium.prototype._doRecorderAction = function (strAction, objTarget, value) {
  // process special json value
  for (var f in value) {
    var vf = value[f];
    if (typeof(vf) == "string") {
      if (match = vf.match(/^JSX\((.*)\)$/))
        value[f] = this.browserbot.findJsxObject(match[1]);
      else if (match = value[f].match(/^XML\((.*)\)$/))
        value[f] = (new jsx3.xml.Document()).loadXML(match[1]);
      else if (vf.match(/^new Date/)) {
	    value[f] = eval(vf);
	  }
    }
  }

  var ctx = {};
	for (var f in value) {
	  ctx[f] = value[f];
	  LOG.debug("ctx[" + f + "]=" + value[f]);
	}
	ctx.subject = strAction;
	if (ctx.objEVENT) {
	  ctx.objEVENT.currentTarget = 1;
	  ctx.objEVENT = jsx3.gui.Event.wrap(ctx.objEVENT);
	}
    LOG.info("action " + strAction + " ctx=" + ctx);

	if (objTarget.replayEvent) {
	  objTarget.replayEvent(ctx);
	} else {
	  var fct = recorder._getReplayFunction(objTarget, strAction);
	  if (fct) {
      LOG.debug("replay function =" + fct);
      fct.apply(objTarget, [ctx]);
	  } else {
	  LOG.info("doEvent " + strAction + " ctx=" + ctx);
      objTarget.doEvent(strAction, ctx);
	  }
	}
}

/*
* _doJsxAction : dispatch recorder commands 
*/
Selenium.prototype.doJsxAction = function (locator, value) {
    LOG.debug("dojsxaction " + locator);
    var locatorType;
    var locatorString = locator;
    var result = locator.match(/^([A-Za-z]+)=(.+)/);
    if (result) {
        locatorType = result[1].toLowerCase();
        locatorString = result[2];
    }        

    var objJSX = this.browserbot.findByJsxSelector(locatorString);
    if (objJSX) {
      try {
        value = eval("var tmp = " + value + "; tmp");
      } catch (e) {
        throw new Error("Bad action value: " + value);
      }
      var action = currentTest.currentRow.getCommand().command;
      var match;
      if (match = action.match(/^(do_)(.*)/) ) {
           action = match[2];
      } 
      this._doRecorderAction(action, objJSX, value);
    }
};

Selenium.prototype.doJsxwait_sleep = function (timeout) {
  return function(target, value) {
        if (timeout) timeout = parseInt(timeout);
        else timeout = this.defaultTimeout;
		    LOG.debug("sleep_long, " + timeout);
        this._isAwake = false;
        jsx3.sleep(function() {selenium._isAwake = true;}, "sleep", this );
        var terminationCondition = function () {
            return this._isAwake;// sleep queue empty
        };
      return Selenium.decorateFunctionWithTimeout(terminationCondition, timeout);
  }
};

Selenium.prototype._sleepQueueEmpty = function(strName) {
    jsx3.unsubscribe(jsx3.QUEUE_DONE, this, "_sleepQueueEmpty");
    this._isQueueEmpty = true;
};
  
Selenium.prototype.doJsxwait_sleeplong = function (timeout) {
  return function(target, value) {
        if (timeout) timeout = parseInt(timeout);
        else timeout = this.defaultTimeout;
		    LOG.debug("sleep_long, " + timeout);
        this._isQueueEmpty = false;
        jsx3.subscribe(jsx3.QUEUE_DONE, this, "_sleepQueueEmpty");
        jsx3.sleep(function() {});
        var terminationCondition = function () {
            return this._isQueueEmpty;// sleep queue empty
        };
      return Selenium.decorateFunctionWithTimeout(terminationCondition, timeout);
  }
};

// Override the default getCommandHandler to handle unregistered recorder actions
CommandHandlerFactory.prototype.getCommandHandler = function(command) {
  var cmd;
  if (this.handlers[command]) {
      return this.handlers[command];
  }
  if (match = command.match(/^(do_)(.*)/) ) {
     cmd = match[2];
  }   
  var handler = this.handlers[cmd]; // registered actions
  if (!handler && match) {
    LOG.debug("unregistered command " + cmd + ", return doJsxAction");
    handler = this.handlers["jsxAction"];
  }
  return handler;
};

// Allow registration of recorder JSX commands
CommandHandlerFactory.prototype._registerJsxActions = function(seleniumApi) {
  for (var i = 0; i < recorder.actions.length; i++) {
    var actionName = recorder.actions[i];
    var actionMethod = seleniumApi.doJsxAction;
    var actionBlock = fnBind(actionMethod, seleniumApi);
    this.registerAction(actionName, actionBlock, false);
  }
}

// Recorder value need evaluation create custom predicate assertion method
CommandHandlerFactory.prototype._jsxAssertionFromPredicate = function(predicateBlock) {
  return function(target, value) {
    try {
      if (value && value !== "") { value =  eval("var tmp = " + value + "; tmp"); }
    } catch (e) {
      Assert.fail("Bad action value: " + value);
    }
    value = "exact:" + value;
    LOG.debug("assert jsx predicate, " + value);
    var result = predicateBlock(target, value);
    if (!result.isTrue) {
        Assert.fail(result.message);
    }
  };
}

CommandHandlerFactory.prototype._jsxwaitActionForPredicate = function (predicateBlock) {
  // Convert into a jsxwait_blah(target, value) function.
  return function(target, value) {
      var terminationCondition = function () {
        try {
          if (value != null && value !== "") value = stripQuotes(value);
		  return predicateBlock(target, value).isTrue;
        } catch (e) {
          // Treat exceptions as meaning the condition is not yet met.
          // Useful, for example, for waitForValue when the element has
          // not even been created yet.
          return false;
        }
      };
    return Selenium.decorateFunctionWithTimeout(terminationCondition, this.defaultTimeout);
  };

}
// Register jsxassert_ and jsxwait_ commands
CommandHandlerFactory.prototype._registerJsxAssert = function(seleniumApi) {
  for (var functionName in recorder._VERBS) {
    var match = /^(jsxget|jsxdo)_(.+)$/.exec(functionName);
    if (match) {
      var accessMethod = recorder._VERBS[functionName];
      var accessBlock = fnBind(accessMethod, seleniumApi);
      //console.debug("register " + functionName);
      var baseName = match[2];
      var isBoolean = (match[1] == "jsxdo");

      this.registerAccessor(functionName, accessBlock);
      var predicateBlock = this._predicateForAccessor(accessBlock, true, isBoolean);

      var assertBlock = this._jsxAssertionFromPredicate(predicateBlock);
      this.registerAssert("jsxassert_" + baseName, assertBlock, true);

      // make into wait commands     
      var waitForActionMethod = this._jsxwaitActionForPredicate(predicateBlock);
      var waitForActionBlock = fnBind(waitForActionMethod, seleniumApi);
      this.registerAction("jsxwait_" + baseName, waitForActionBlock, false, true);
    }
  }
}
// Override the default registration method
CommandHandlerFactory.prototype.registerAll = function(seleniumApi) {
      this._registerAllAccessors(seleniumApi);
      this._registerAllActions(seleniumApi);
      this._registerAllAsserts(seleniumApi);
      this._registerJsxActions(seleniumApi);
      this._registerJsxAssert(seleniumApi);
}

var recorder = classCreate();
recorder.actions = ["jsxmenu", "jsxtoggle", "jsxchange",
   "jsxexecute", "jsxaftermove", "jsxafterresize", "jsxselect", 
   "jsxafterreorder", "jsxaftersort", "jsxbeginmask", "jsxaftercommit", "jsxshow"];

   recorder._REPLAY = {
    "jsx3.gui.Block": {
      jsxmenu: function(e) {
        var rv = this.doEvent(e.subject, e);
        if (rv !== false) {
          var objMenu = e.objMENU;
          if (rv && rv.objMENU)
            objMenu = rv.objMENU;
          objMenu.showContextMenu(e.objEVENT, this);
        }
      },
      jsxbeginmask: function(e) {
        this.replayMask(e);
        this.doEvent(e.subject, e);
      }
    },
    "jsx3.gui.CheckBox": {
      jsxtoggle: function(e) {
        this.setChecked(e.intCHECKED);
        this.doEvent(e.subject, e);
      }
    },
    "jsx3.gui.ColorPicker": {
      jsxchange: function(e) {
        this.setValue(e.intRGB);
        this.doEvent(e.subject, e);
      }
    },
    "jsx3.gui.DatePicker": {
      jsxchange: function(e) {
        if (this.doEvent(e.subject, e) !== false)
          this.setDate(e.newDATE);
      }
    },
    "jsx3.gui.Dialog": {
      jsxaftermove: function(e) {
        this.setDimensions(e.intL, e.intT, null, null, true);
        this.doEvent(e.subject, e)
      },
      jsxafterresize: function(e) {
        this.setDimensions(null, null, e.intW, e.intW, true);
        this.doEvent(e.subject, e)
      }
    },
    "jsx3.gui.ImageButton": {
      jsxtoggle: function(e) {
        if (this.doEvent(e.subject, e) !== false)
          this.setState(e.intSTATE);
      }
    },
    "jsx3.gui.Matrix": {
      jsxselect: function(e) {
        if (this.getSelectionModel() == jsx3.gui.Matrix.SELECTION_MULTI_ROW) {
          var jsxids = e.strRECORDIDS;
          this.setValue(jsxids);
        }
        else
          this.setValue(e.strRECORDID);
        this.doEvent(e.subject, e);
      },
      jsxafterreorder: function(e) {
        var col = this.getChild(e.intOLDINDEX);
        var before = this.getChild(e.intOLDINDEX < e.intNEWINDEX ? e.intNEWINDEX + 1 : e.intNEWINDEX);

        if (before)
          this.insertBefore(col, before, true);
        else
          this.adoptChild(col, true);

        this.doEvent(e.subject, e);
      },
      jsxaftersort: function(e) {
        this.setSortPath(e.strSORTPATH);
        this.setSortType(e.strSORTTYPE);
        this.doSort(e.intDIRECTION);
        this.doEvent(e.subject, e);
      },
      jsxafterresize: function(e) {
        if (this.doEvent(e.subject, e) !== false)
          this.getChild(e.intCOLUMNINDEX).setWidth(e.vntWIDTH);
      },
      jsxafterappend: function(e) {
        var o = {};
        var attr = e.objRECORDNODE.getAttributeNames();
        for (var i = 0; i < attr.length; i++)
          o[attr[i]] = e.objRECORDNODE.getAttribute(attr[i]);

        e.objRECORDNODE = this.insertRecord(o, this.getRenderingContext() || "jsxroot", true);
        this.doEvent(e.subject, e);
      },
      jsxaftercommit: function(e) {
        var col = e.objCOLUMN;
        col.setValueForRecord(e.strRECORDID, e.strVALUE);
        this.redrawCell(e.strRECORDID, col);
        this.doEvent(e.subject, e);
      },
      jsxtoggle: function(e) {
        this.toggleItem(e.strRECORDID, e.bOPEN);
        this.doEvent(e.subject, e);
      }
    },
    "jsx3.gui.Menu": {
      jsxmenu: function(e) {
        // QUESTION: not sure what to do here...
        this.doEvent(e.subject, e);
      },
      jsxexecute: function(e) {
        this.repaint();
        this.doEvent(e.subject, e);
      }
    },
    "jsx3.gui.RadioButton": {
      jsxselect: function(e) {
        if (this.doEvent(e.subject, e) !== false)
          this.setSelected(1); // jsx3.gui.RadioButton.SELECTED
      }
    },
    "jsx3.gui.Select": {
      jsxselect: function(e) {
        if (this.doEvent(e.subject, e) !== false)
          this.setValue(e.strRECORDID);
      }
    },
    "jsx3.gui.Slider": {
      jsxchange: function(e) {
        if (this.doEvent(e.subject, e) !== false)
          this.setValue(e.fpVALUE);
      }
    },
    "jsx3.gui.Splitter": {
      jsxafterresize: function(e) {
        this.setSubcontainer1Pct(e.fpPCT1, true);
        this.doEvent(e.subject, e);
      }
    },
    "jsx3.gui.Stack": {
      jsxshow: function(e) {
        this.doShow();
      }
    },
    "jsx3.gui.Tab": {
      jsxshow: function(e) {
        this.doShow();
      }
    },
    "jsx3.gui.Table": {
      jsxchange: function(e) {
        if (this.getSelectionModel() == jsx3.gui.Table.SELECTION_MULTI_ROW)
          this.setValue(e.strRECORDIDS);
        else
          this.setValue(e.strRECORDID);
        this.doEvent(e.subject, e);
      },
      jsxaftersort: function(e) {
        this.setSortPath(e.strSORTPATH);
        this.setSortType(e.strSORTTYPE);
        this.doSort(e.intDIRECTION);
        this.doEvent(e.subject, e);
      }
    },
    "jsx3.gui.TextBox": {
      jsxchange: function(e) {
        if (this.doEvent(e.subject, e) !== false)
          this.setValue(e.strVALUE);
      }
    },
    "jsx3.gui.TimePicker": {
      jsxchange: function(e) {
        if (this.doEvent(e.subject, e) !== false)
          this.setDate(e.newDATE);
      }
    },
    "jsx3.gui.ToolbarButton": {
      jsxchange: function(e) {
        this.setState(this.getState() === 0 ? 1 : 0);
        this.doEvent(e.subject, e);
      }
    },
    "jsx3.gui.Tree": {
      jsxchange: function(e) {
        this.setValue(e.newVALUE);
        this.doEvent(e.subject, e);
      },
      jsxtoggle: function(e) {
        this.toggleItem(e.strRECORDID, e.bOPEN);
        this.doEvent(e.subject, e);
      }
    }
  };

  /** @private @jsxobf-clobber */
  recorder._getReplayFunction = function(objTarget, strAction) {
    var c = objTarget.getClass();
    var fct = null;
    LOG.debug("strAction = " + strAction);
    while (c && !fct) {
      LOG.debug('_REPLAY[' + c.getName() + ']');
      var struct = recorder._REPLAY[c.getName()];
      if (struct)
        fct = struct[strAction];

      c = c.getSuperClass();
    }
    
    return fct;
  };

    /** @private @jsxobf-clobber */
  recorder._VERBS = {
    jsxdo_exists: function(locator) {
      var o = selenium.browserbot.findJsxObject(locator);
      if (o && o.getRendered() && o.getRendered().getAttribute("jsxdomholder") != "1") {
        return true;
       } else {
        return false;
	   }
	},
    jsxget_value: function(locator, value) {
      var target = selenium.browserbot.findJsxObject(locator);
      return (target) ? target.getValue().toString() : Assert.fail(locator + " not found");
    },
    jsxget_checked: function(locator, value) {
      var target = selenium.browserbot.findJsxObject(locator);
      return (target) ? target.getChecked().toString() : Assert.fail(locator + " not found");
    },
    jsxget_selected: function(locator, value) {
      var target = selenium.browserbot.findJsxObject(locator);
      return (target) ? target.getSelected().toString() : Assert.fail(locator + " not found");
    },
    jsxget_state: function(locator, value) {
      var target = selenium.browserbot.findJsxObject(locator);
      return (target) ? target.getState().toString() : Assert.fail(locator + " not found");
    },
    jsxget_front: function(locator, value) {
      var target = selenium.browserbot.findJsxObject(locator);
      return (target & target.isFront()) ? "true" : "false"; // Visibility not equal
    },
    jsxget_eval: function(locator, value) {
      try {
        var target = selenium.browserbot.findJsxObject(locator);
        var server  = target.getServer();
        var rv = jsx3.eval(value, {server:s});
        if (!rv)
        throw new Error("Eval returned false: " + rv);
        return rv;
      } catch (e) {
        Assert.fail("Eval failed : " + e.message); 
      }
    }
};  