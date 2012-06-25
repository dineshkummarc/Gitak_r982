/*
 * Modified by TIBCO Software Inc., © 2007
 * General Interface Test Automation Kit (GITAK) 0.8
 */

/*

This is an experiment in creating a "selenese" parser that drastically
cuts down on the line noise associated with writing tests in HTML.

The 'parse' function will accept the follow sample commands.

test-cases:
    //comment
    command "param"
    command "param" // comment
    command "param" "param2"
    command "param" "param2" // this is a comment

   /////////////////////////// GITAK
    * Add selenese syntax
    |command|param|param2|
    * Add include extension
   /////////////////////////// dhwang
    TODO:
1) Deal with multiline parameters
2) Escape quotes properly
3) Determine whether this should/will become the "preferred" syntax 
   for delivered Selenium self-test scripts
*/

// from the include extension by alexg and rz
function newXMLHttpRequest()  {
    var requester = 0
    var exception = ''
    try {
		// Check for IE/ActiveX first, workaround IE7 native XMLHttpRequest restrictions -- GITAK
        if(window.ActiveXObject)    {
            try {
                requester = new ActiveXObject("Msxml2.XMLHTTP.4.0")
            } catch (e){
                try {
                    requester = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                }
                catch(e) {
                    requester = new ActiveXObject("Microsoft.XMLHTTP")
                }
            }
        } // if IE
		else if(window.XMLHttpRequest) {
            requester= new XMLHttpRequest()
        }
    } // try
    catch(e) {
        exception = e
    }
    if ( ! requester ) {
        throw new Error("Failed to create XMLHttpRequest, exception = " + exception )
    }

    return requester
}

// split the search key, taken from htmlutil.js
function getQueryParameter(searchKey, queryString) {
        var str = queryString
        if (str == null) return null;
        var clauses = str.split('&');
        for (var i = 0; i < clauses.length; i++) {
            var keyValuePair = clauses[i].split('=', 2);
            var key = unescape(keyValuePair[0]);
            if (key == searchKey) {
                return unescape(keyValuePair[1]);
            }
        }
        return null;
}

// Code from the include extension by alexg and rz
function getIncludeText(locator) {
    // the xml http requester to fetch the page to include
    var requester = newXMLHttpRequest();
    var baseUrl = "";

    if (!locator.match(/\//) && !locator.match(/http:/)){
	    var search = document.location.search.substr(1);
        if (browserVersion.isHTA) {
           search = htmlTestRunner.controlPanel.queryString;
        }
        var subdir = getQueryParameter('test', search);
        LOG.debug('subdir='+subdir);

        if (subdir && subdir.indexOf("/") > -1)		{
            var idx = subdir.lastIndexOf("/");
            subdir = subdir.substring(0, idx + 1); //skip over the ?test= part
            //LOG.debug('subdir='+subdir);
        }
        urlpat = /^([^?\n]+\/).+$/;
        baseUrl = document.location.href;
        //LOG.debug('baseUrl='+baseUrl);
        baseUrl = baseUrl.match(urlpat)[1];
        // Fix absolute path in URL parameter. e.g. test=C:/gitak/tests/ or test=/abspath/test/ --dhwang
        if (subdir.match(/^[a-z|A-Z]:/) || subdir.match(/^\//) ) {
            LOG.debug( "file:// + subdir =" + subdir);
            baseUrl = "file://" + subdir;// file url?
        } else if (subdir.match(/^http:/) || subdir.match(/^https:/) || subdir.match(/^file:/)) {
          //subdirLocation = parseUrl(subdir);
          baseUrl = subdir;
        }
        else
            baseUrl = baseUrl + subdir;

        LOG.debug(IncludeCommand.LOG_PREFIX +
            "include URL seems to be relative determined baseUrl='" + baseUrl + "'");
    }
    var url = baseUrl + locator;
    //LOG.debug('Url='+url);

    requester.open("GET", url, false);
    requester.send(null);
    if ( requester.status != 200 && requester.status !== 0 ) {
        throw new Error("Error while fetching " + url + " server response has status = " + requester.status + ", " + requester.statusText );
    }

    return requester;


}

// included text rows
// TODO -  skip HTML marked up lines
function makeTableRow(rowtext) {
    if (!rowtext || rowtext.trim().length <= 0) return;
    var command_pattern = / *(\w+) *"([^"]*)" *(?:"([^"]*)"){0,1}(?: *(\/\/ *.+))*/i;
    var command_pattern2 = /^ *\|(.*)\|(.*)\|(.*){0,1}\|(?: *(\/\/ *.+))*/i;
    var comment_pattern = /^ *(\/\/ *.+)/

    var new_line = "";
    LOG.debug('row='+rowtext);
    result = rowtext.match(command_pattern);
    if (result != null) {
    new_line = "<tr><td>" + (result[1] || '&nbsp;') + "</td>" +
               "<td>" + (result[2] || '&nbsp;') + "</td>" +
               "<td>" + (result[3] || '&nbsp;') + "</td>" +
               "<td>" + (result[4] || '&nbsp;') + "</td></tr>\n";

    }
    result = rowtext.match(command_pattern2);
    if (result != null) {
        new_line = "<tr><td>" + (result[1] || '&nbsp;') + "</td>" +
                       "<td>" + (result[2] || '&nbsp;') + "</td>" +
                       "<td>" + (result[3] || '&nbsp;') + "</td>" +
                       "<td>" + (result[4] || '&nbsp;') + "</td></tr>\n";
    }
    result = rowtext.match(comment_pattern);
    if (result != null) {
        new_line = '<tr><td rowspan="1" colspan="4">' +
                   (result[1] || '&nbsp;') +
                   '</td></tr>';
    }
    return new_line;

}

function separse(doc) {
    // Get object
    if (doc.getElementById)
        script = doc.getElementById('testcase'); // use <script id="testcase" type="text/selenese">
    lines = script.text.split('\n');


    var command_pattern = / *(\w+) *"([^"]*)" *(?:"([^"]*)"){0,1}(?: *(\/\/ *.+))*/i;
    var command_pattern2 = /^ *\|(.*)\|(.*)\|(.*){0,1}\|(?: *(\/\/ *.+))*/i;
    var comment_pattern = /^ *(\/\/ *.+)/

    // Regex each line into selenium command and convert into table row.
    // eg. "<command> <quote> <quote> <comment>"
    var new_test_source = '';
    var new_line        = '';
    for (var x=0; x < lines.length; x++) {
        result = lines[x].match(command_pattern);
        if (result != null) {
            if (result[1].trim() == 'include') {
                var pageText = "";
                var testText = "";
                var req = getIncludeText(result[2]); // include | file.html | in selenese
                if (req && req.responseText){
                  pageText = req.responseText;
                 }
                inclines = pageText.split('\n');
                for (var inc=0; inc < inclines.length && inclines[inc]; inc++) {
                    LOG.debug(inclines[inc]);
                    new_line = makeTableRow(inclines[inc]);

                    if (new_line && new_line.trim().length > 0) {
                        LOG.debug('newline = '+ new_line);
                        new_test_source += new_line;
                    }
                }
            } else {
                new_line = "<tr><td>" + (result[1] || '&nbsp;') + "</td>" +
                           "<td>" + (result[2] || '&nbsp;') + "</td>" +
                           "<td>" + (result[3] || '&nbsp;') + "</td>" +
                           "<td>" + (result[4] || '&nbsp;') + "</td></tr>\n";
                new_test_source += new_line;
            }
        }
        result = lines[x].match(command_pattern2);
        if (result != null) {
            new_line = "<tr><td>" + (result[1] || '&nbsp;') + "</td>" +
                           "<td>" + (result[2] || '&nbsp;') + "</td>" +
                           "<td>" + (result[3] || '&nbsp;') + "</td>" +
                           "<td>" + (result[4] || '&nbsp;') + "</td></tr>\n";
            new_test_source += new_line;
        }
        result = lines[x].match(comment_pattern);
        if (result != null) {
            new_line = '<tr><td rowspan="1" colspan="4">' +
                       (result[1] || '&nbsp;') +
                       '</td></tr>';
            new_test_source += new_line;
        }
    }

    // Create HTML Table        
    body = doc.body
     // += why keep the old text? modified to not keep the old text... -- dhwang,
    body.innerHTML = '<table class="selenium" id="testtable" >'+
                      new_test_source +
                      '</table>';

}


