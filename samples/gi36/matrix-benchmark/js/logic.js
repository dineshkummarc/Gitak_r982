
var matrixTests = [
  {name:"Load classes", fct: function(objServer) {
    jsx3.require("jsx3.gui.Matrix");
  }},
  {name:"Load component file", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.load("components/matrix.xml", false);
  }},
  {name:"Initial paint", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    pane.paintChild(matrix);
  }},
  {name:"Repaint data", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.repaintData();
  }},
  {name:"Reset XSL", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.resetXslCacheData();
    matrix.getXSL();
  }},
  {name:"Resize width", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    pane.setWidth(500, true);
  }},
  {name:"Resize height", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    pane.setHeight(350, true);
  }},
  {name:"Resize", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    pane.setWidth(300, false);
    pane.setHeight(300, true);
  }},
  {name:"Add column", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);

    var col = new jsx3.gui.Matrix.Column("newColumn");
    col.setPath("jsxid");
    col.setText("New column");
    matrix.setChild(col);
    matrix.paintChild(col);
  }},
  {name:"Remove column", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);

    var col = matrix.getChild("newColumn");
    matrix.removeChild(col);
  }},
  {name:"Add 3 columns", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);

    for (var i = 0; i < 3; i++) {
      var col = new jsx3.gui.Matrix.Column("newColumn" + i);
      col.setPath("jsxid");
      col.setText("New column #" + i);
      matrix.setChild(col);
    }
    matrix.repaint();
  }},
  {name:"Repaint data (5)", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.repaintData();
  }},
  {name:"Repaint (5)", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.repaint();
  }},
  {name:"Reset XSL (5)", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.resetXslCacheData();
    matrix.getXSL();
  }},
  {name:"Remove 3 columns", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);

    // introduce new removeChildren method param to help this use case
    if (matrix.removeChildren.jsxmethod.getArity() > 0) {
      matrix.removeChildren([2, 3, 4]);
    } else {
      for (var i = 0; i < 3; i++) {
        var col = matrix.getChild("newColumn" + i);
        matrix.removeChild(col);
      }
    }
  }},
  {name:"Hide column", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.getChild(0).setDisplay(jsx3.gui.Block.DISPLAYNONE, true);
  }},
  {name:"Show column", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.getChild(0).setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true);
  }},
  {name:"Sort", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.setSortPath("jsxtext");
    matrix.doSort();
  }},
  {name:"Set column width", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.getChild(0).setWidth(200, true);
  }},
  {name:"Insert record", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.insertRecord({jsxid:"new1", jsxtext:"Inserted Record #1"}, "jsxroot", true);
  }},
  {name:"Insert before", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.insertRecordBefore({jsxid:"new2", jsxtext:"Inserted Record #2"}, "UK", true);
  }},
  {name:"Remove record", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.deleteRecord("UK", true);
  }},
  {name:"Reorder columns", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    matrix.insertBefore(matrix.getChild(1), matrix.getChild(0), true);
  }},
  {name:"Destroy", fct: function(objServer) {
    var pane = objServer.getJSXByName("matrixPane");
    var matrix = pane.getChild(0);
    pane.removeChild(matrix);
  }}
];

var runningTests = null;
var runningServer = null;
var totalTime = null;

function runMatrix(objBtn) {
  var objServer = objBtn.getServer();

  runningServer = objServer;
  runningTests = matrixTests.concat();
  totalTime = 0;
  
  window.setTimeout(runNextTestCase, 500);
};

function runNextTestCase() {
  var pane = runningServer.getJSXByName("logPane");

  if (runningTests != null && runningTests.length > 0) {
    var test = runningTests.shift();
    var t1 = new Date();
    test.fct(runningServer);
    var time = new Date() - t1;

    pane.setText((pane.getText() || "") + "<b>" + test.name + "</b>: " + time + "ms<br/>", true);

    totalTime += time;
    window.setTimeout(runNextTestCase, 500);
  } else {
    pane.setText((pane.getText() || "") + "<br/><b>Total</b>: " + totalTime + "ms<br/>", true);
  }
};

function runList(objBtn) {
  var objServer = objBtn.getServer();
};

function reset(objBtn) {
  var objServer = objBtn.getServer();

  var pane = objServer.getJSXByName("logPane");
  pane.setText("", true);

  var mPane = objServer.getJSXByName("matrixPane");
  mPane.removeChildren();

  delete jsx3.gui.Matrix.Column;
  delete jsx3.gui.Matrix;
  delete jsx3.xml.Cacheable;
};
