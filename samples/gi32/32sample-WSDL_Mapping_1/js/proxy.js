jsx3.lang.Package.definePackage("eg.wsdl1.proxy", function(proxy) {
    
    // switch, if true all URLs are converted to the proxied format
    proxy.PROXY = !(window.document.protocol == null) && window.document.protocol.indexOf("File") == -1;
    // the domain of my proxy host
    proxy.PROXY_HOST = "tibcotest2.tibco.com";

    // the path prefix of the proxied URLs
    proxy.PATH_PREFIX = "/proxy/";

    /**
     * Converts a non-proxied URI to a proxied URI if PROXY is true.
     * <p/>
     * <code>http://www.domain.com/service/op</code> will be converted to
     * <code>http://PROXY_HOST/PATH_PREFIX/www.domain.com/service/op</code>
     *
     * @param strURI {String} the URI to convert
     * @returns {String} the converted URI
     */
    proxy.convertURI = function(strURI) {
        if (proxy.PROXY) {
            var uri = new jsx3.net.URI(strURI);
            if (uri.getHost() != proxy.PROXY_HOST && (uri.getScheme() == "http" || uri.getScheme() == "https")) {
                return jsx3.net.URI.fromParts(
                        uri.getScheme(), null, proxy.PROXY_HOST, null, 
                        proxy.PATH_PREFIX + uri.getHost() + uri.getPath(), null, null
                    ).toString();
            } else {
                return strURI;
            }
        } else {
            return strURI;
        }
    };

    /**
     * Open all requests with this method to ensure that URLs are properly converted for proxy.
     * @param METHOD {String} The HTTP method used to open the connection. Valid values include: GET, POST, or PUT
     * @param strURL {String} The requested URL. This can be either an absolute URL, such as "http://www.TIBCO.com", or a relative URL, such as "../MyPath/MyFile".
     * @param strAsyncId {String} unique name for this request instance; this name can be used to track the request when run asynchronously. This is required for asynchronous calls
     * @param strUser {String} The name of the user for authentication. If this parameter is null ("") or missing and the site requires authentication, the native HTTP control will display a logon window
     * @param strPass {String} The password for authentication. This parameter is ignored if the user parameter is null ("") or missing.
     */
    proxy.openRequest = function(METHOD, strURL, strAsyncId, strUser, strPass) {
        var objRequest = new jsx3.net.Request(strAsyncId);
        objRequest.open(METHOD, proxy.convertURI(strURL), strAsyncId != null, strUser, strPass);
        return objRequest;
    };


    /**
     * Open all services with this method to ensure that URLs are properly converted for proxy.
     * @param strRulesURL {String} url for the rules URL to use
     * @param strOpName {String}  name of operation to call. This is only required if the rules file was generated via a WSDL
     */
    proxy.openService = function(strRulesURL, strOpName) {
        var objService = new jsx3.net.Service(strRulesURL, strOpName);
        objService.setEndpointURL(proxy.convertURI(objService.getEndpointURL()));
        return objService;
    };
});