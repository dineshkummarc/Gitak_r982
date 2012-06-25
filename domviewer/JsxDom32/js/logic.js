jsx3.require('jsx3.xml.Document');
jsx3.require('jsx3.gui.Dialog');
jsx3.require('jsx3.gui.StackGroup');
jsx3.require('jsx3.gui.Matrix');
jsx3.require('jsx3.gui.Tree');
jsx3.require('jsx3.gui.Splitter');
jsx3.require('jsx3.gui.BlockX');

 jsx3.lang.Package.definePackage(
   "tibco.qa.jsxdom",                           // the full name of the package to create
   function(jsxdom) {                  // name the argument of this function
     jsxdom.dispDom = function (objButton) {
        var objTree = objButton.getServer().getJSXByName('treeJsxDom');
        var contBlock = objTree.getParent();
        contBlock.showMask('Building DOM Tree, please wait...');
        objTree.resetCacheData();
        setTimeout( function () {jsxdom.buildDomTree(objButton.getServer().getBodyBlock(),null, false);}, 100);
         
     }   

     jsxdom.dispObjProperties = function (objTree, objRecordId) {
      var objRecord = objTree.getRecord(objRecordId);
      var objId = objRecord.jsxid;
      var objJSX = objTree.getServer().getJSXById(objId);

      var objGrid = objTree.getServer().getJSXByName('gridProps');
      objGrid.resetCacheData();
      var otype = objJSX.getClass().getName();
      var orec = new Object();
      orec.propName = 'jsxtype';
      orec.propValue = otype;
      objGrid.insertRecord(orec, null, false);

      for (p in objJSX) {
       if ( (objJSX[p] != null) && (typeof(objJSX[p]) != "function") ) {
        var o = new Object();
        o.jsxid = "grid_dom_" + jsx3.xml.CDF.getKey();
        o.propName = p;
        o.propValue = objJSX[p].toString();
        //jsx3.log('p='+p+'/obj[p]='+objJSX[p].toString());
        objGrid.insertRecord(o,null,false);
       }
      }
        objGrid.repaint();      
     };

     // define a static method like this:
     jsxdom.dispObjXml = function (objTree,objRecordId) {
      var objRecord = objTree.getRecord(objRecordId);
      var xmlDisp = objTree.getServer().getJSXByName('xmlBlock'); // blockX
       xmlDisp.resetXmlCacheData();
       if (objRecord.xmlString)
        xmlDisp.setXMLString(objRecord.xmlString);
       else
        xmlDisp.clearXmlData();
       xmlDisp.repaint();
     };

     jsxdom.buildDomTree = function (objJSX,strParentId,bNoEmbed) {
       var name = objJSX.getName(); 
       if (name  === 'rootJsxDom' || name === "dlgJsxDom") return;
       var objTree = objJSX.getServer().getJSXByName('treeJsxDom');

       //create record object (will become a record node in the CDF)
       var o = new Object();

       //is this a null object? (is this a new component?)
       if(strParentId == null) { 
         o.jsxid = "rootid";
         o.jsxtext = "JSXBODY";
         o.jsximg = "JSX/images/tbb/default.gif";
         o.jsxopen = "1";
         var bFirst = true
       } else {
         var bFirst = false;
         // determine the persistence 
         var intPersist = objJSX.getPersistence();
     
         //build out the style
         var strStyle = "";
         if (intPersist == jsx3.app.Model.PERSISTNONE || bNoEmbed) {
           strStyle = "font-style:italic;color:#215483;";
         } else if(intPersist == jsx3.app.Model.PERSISTREF) {
           //ref
           strStyle = "font-style:italic;color:blue;";
         } else if(intPersist == jsx3.app.Model.PERSISTREFASYNC) {
           //ref-async
           strStyle += "font-style:italic;color:green;";
         }
     
         //assume the tree should stay open by default
         o.jsxid = objJSX.getId();
         o.jsxopen = "1";
         o.objText = objJSX.getText();
         o.jsxtext = name;
         o.objName = name;
         o.jsxstyle = strStyle;
        
         if (objJSX.instanceOf(jsx3.xml.CDF) ) {
             o.xmlString = objJSX.getXML().getXML(); // xml.document->xml::string
             o.jsximg = "JSX/images/tbb/default.gif";
         }
       }
     
       //insert; recurse to populate descendants
       objTree.insertRecord(o,strParentId,false);
       
       if (intPersist == null || intPersist == jsx3.app.Model.PERSISTNONE || intPersist == jsx3.app.Model.PERSISTEMBED) {
         var objKids = new jsx3.util.List(objJSX.getChildren()).iterator();
         //var maxLen = objKids.length;
     
         while (objKids.hasNext()) {           
            var nextChild = objKids.next();

            jsxdom.buildDomTree(nextChild, o.jsxid,  (intPersist == jsx3.app.Model.PERSISTNONE || bNoEmbed)); 
         }
       }

       objTree.repaint();
       objTree.getParent().hideMask();
     }; // end buildTree    

     jsxdom.injectedAPI = {
        $     : function(id) { return document.getElementById(id) },
        $$    : function() { if(document.querySelectorAll) return document.querySelectorAll.apply(document, arguments) },
        $x    : function(xpath, contextNode) {if(document.evaluate) return Util.getElementsByXPath(xpath, contextNode);},
        keys  : function(o) { var a = []; for (k in o) a.push(k); return a; }, 
        values: function(o) { var a = []; for (k in o) try {a.push(o[k])} catch(e) {}; return a; }
    };

    jsxdom.doEvaluate = function(strScript, objContext, objConsole) {
      if (strScript != null && strScript !== "") {
        /* @jsxobf-bless */
        var __api = objContext;
        for (var __f in jsxdom.injectedAPI)
          __api[__f] = jsxdom.injectedAPI[__f];
        
        return eval("with (__api) { " + strScript + " }");
      }
    };

    jsxdom.doEval = function (objJSX) {
      // Import all DOM nodes in the active component editor to the current scope
      var context = {};
      var server = objJSX.getServer();
      if (server) {
        server.getBodyBlock().findDescendants(function(x) {
          var n = x.getName();
          if (n && !context[n] && jsx3.util.isName(n)) {
            context[n] = x;
          }
        }, false, false, false, true);
      }

       var result = "undefined";
       try {
        result = jsxdom.doEvaluate(server.getJSXByName('txtScript').getValue(), context); 
        } catch (ex) {
          result = ex.message;
        }
        objJSX.getServer().getJSXByName('txtResult').setValue(result).repaint();   
    };

    jsxdom.doCopy = function (objJSX, column) {
        var mtx = objJSX.getContextParent();
        var recid = objJSX.getContextRecordId();
        var record = mtx.getRecord(recid);
        if (column == 1)
            jsx3.html.copy(record.propName);
        else
            jsx3.html.copy(record.propValue);
    };
   }
 );