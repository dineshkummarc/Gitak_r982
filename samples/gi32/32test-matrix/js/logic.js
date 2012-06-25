/* place JavaScript code here */
var currentType;
function loadMatrix(tbb, type) {    
    var containerPane = tbb.getServer().getJSXByName('paneMatrix');
    if (currentType != type) {
        containerPane.removeChildren();
       currentType = type;
       containerPane.load('components/matrix' +  type +'.xml');
    }
}

var count = 0;
function addTreeRecord(mtree, strParentRecordId) {
  var objRecord= new Object();
  objRecord.jsxid = 't' + count++;
  objRecord.jsxtext = 'new node ' + count;
  mtree.insertRecord(objRecord, strParentRecordId, true);
}