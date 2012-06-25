    jsx3.lang.Package.definePackage(
      "eg.pageCache",                //the full name of the package to create
      function(pageCache) {          //name the argument of this function
      
      /**
       * Returns the application server object which by default is the application
       * namespace as specified in Project->Deployment Options.
       *
       * @returns {jsx3.app.Server} the application server object.
       */
       pageCache.getServer = function() {
         // should be the same as namespace in Project -> Deployment Options
         return samplepageCache; 
       };

      /**
        * global hash for pre-cached web pages
        */
      var g_hash = new Object();

      /**
        * Loops to precache all web pages listed in 'mycachelist'
        */
      pageCache.doCachePages = function () {
        var strURL = ""
        //get a handle to list object
        var objList = pageCache.getServer().getJSXByName("mycachelist");
        var objRecords = objList.getXML().selectNodes("//record");
        for(var i=0;i<objRecords.getLength();i++) {
          strURL = objRecords.getItem(i).getAttribute("jsxid");
          pageCache.preCache(strURL);
        }
      }

      /**
       * Spawns an asynchronous call using the jsx3.net.Request object to fetch a given Web page
       */
      pageCache.preCache = function (strURL) {
        //open asynchronous call and register the response handler
        var obj = new jsx3.net.Request(strURL);
        // initialize the reguest. 
        obj.open("GET",strURL,true);
        // subscribe the function onPreCacheResponse to Event type EVENT_ON_RESPONSE.
        // EVENT_ON_RESPONSE is published when the response has loaded.
        obj.subscribe(jsx3.net.Request.EVENT_ON_RESPONSE,pageCache.onPreCacheResponse);
        //save the url as a property on the object (use this URL as its cache id)
        obj._url = strURL;
        //send the request.
        obj.send();
      }
      
      /**
       * Callback function that is notified when all data has been returned from the remote host.
       * @param objEvent - the event on response object
       */
      pageCache.onPreCacheResponse = function (objEvent) {
        //the server has responded; get a handle to the request object (the target "source element" for this event)
        var objHTTP = objEvent.target;
        
        //get the response text from the web site and append a 'base' tag to the head
        //the BASE element gives the base URL for dereferencing relative URLs
        var strHTML = objHTTP.getResponseText();
	var strBase = '<base HREF="' + objHTTP._url + '"/>';
   
        /*
         The /i modifier instructs the Engine to perform case-insensitive pattern matching.
         you use parentheses to group things for quantifiers, but you can also use them 
         to remember pieces of what you have already matched, so they can be backreferenced later.
         Function($1) simply concatenate strBase to the head tag that is matched in strHTML. 
          <head .. > tag will replaced with  <head .. > <base HREF="... " />
         */
        var re = /(<head[^>]*>)/i;

	//cache the final resonse in the global hash
	g_hash[objHTTP._url] = strHTML.replace(re,function($1){ return $1 + strBase });       
	        
	//update the 'cached' flag. This will let the user know that the page is ready for display
	pageCache.getServer().getJSXByName("mycachelist").insertRecordProperty(objHTTP._url,"cached","True");
        pageCache.getServer().getJSXByName("mycachelist").repaint(); 
      }
      
      /**
       * called when user dbl-clicks (executes) an item in the on-screen List of cached pages.
       * @param strURL - external website URL.
       */
      pageCache.displayCachedPage  = function (strURL) {
	//create an IFRAME and insert the html string
	var strId = "iFrameId";
	if(strURL.toUpperCase().indexOf(".PDF") != -1) {
		// function getRendered returns  a handle to the JSX GUI Object's on-screen counterpart such as a DIV, SPAN, etc.
		pageCache.getServer().getJSXByName("mycacheblock").getRendered().innerHTML = '<iframe id="' + strId + '" border="no" style="width:100%;height:100%;" src="' + strURL + '"></iframe>';
	} else {
		pageCache.getServer().getJSXByName("mycacheblock").getRendered().innerHTML = '<iframe id="' + strId + '" border="no" style="width:100%;height:100%;"></iframe>';      
		var ih = eval(strId);   	
		if (pageCache.isUndefined(ih.document)) {		
			var cacheHTML = document.getElementById(strId);    		
			cacheHTML.contentDocument.close();
			cacheHTML.contentDocument.open();
			cacheHTML.contentDocument.write(g_hash[strURL]);
			cacheHTML.contentDocument.close();
		}
		else {
		   ih.document.close();
		   ih.document.open();
		   ih.document.write(g_hash[strURL]);
		   ih.document.close();
	    }
	  }
      }

      /*
       * check if the specified object is undefined.
      */
      pageCache.isUndefined = function(a) {      
    	return typeof a == 'undefined';    
      } 
    
    // Package end
    })