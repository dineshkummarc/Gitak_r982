======================================================================
General Interface Test Automation Kit Server
 with Selenium Remote Control 

======================================================================
Introduction

 The GITAK server allows you to run your GITAK HTML test suite against
 a remote webserver deployed General Interface (GI) application and collect
 the result log.
 
 Using GITAK server you can run a continous integration test cycle by 
 automating the system/function tests on a real deployment.

-- About Selenium Remote Control --
 
Selenium Remote Control provides a Selenium Server, which can automatically start/stop/control any supported browser. It works by using Selenium Core, a pure-HTML+JS library that performs automated tasks in JavaScript.

The Selenium Server communicates directly with the browser using AJAX (XmlHttpRequest). You can send commands directly to the Server using simple HTTP GET/POST requests; that means that you can use any programming language that can make HTTP requests to automate Selenium tests on the browser. To further ease this process, we provide wrapper objects for a number of mainstream programming languages (Java, .NET, Perl, Python, and Ruby).

Finally, the Selenium Server acts as a client-configured HTTP proxy, to stand in between the browser and your website. This allows a Selenium-enabled browser to run JavaScript on arbitrary websites.

The Selenium Server is great for testing complex AJAX-based web user interfaces under a Continuous Integration system. It is also an ideal solution for users of Selenium Core or Selenium IDE who want to write tests in a more expressive programming language than the Selenese HTML table format customarily used with Selenium Core.

======================================================================
Getting started

  Use Selenium-RC HTML Suite test feature to run existing GITAK HTML tests. The basic syntax for launching the server is:
  
  java -classpath "%CPATH%" org.openqa.selenium.server.SeleniumServer -htmlSuite "*iexplore"  "%WEBSERVER%" "%SUITEPATH%" "%RESULTPATH%"
  
  - Where %CPATH% is classpath that includes selenium-server.jar. 
  - The first parameter of -htmlSuite is the browser, 
	o Specify "*iexplore" for Internet Explorer (6/7) and "*firefox" for Firefox.
	o Specify the remote webserver root URL for %WEBSERVER%, like "http://test.example.com"
	o Specify the local HTML suite path for %SUITEPATH%, like "c:\workspace\tests\TestSuite.html"
	o Specify the result log file path for %RESUILTPATH%, like "c:\workspace\tests\runlog.html"

-- SeleniumServer command line options --
	
  -port <nnnn>: the port number the selenium server should use
    (default 4444)
  -timeout <nnnn>: an integer number of seconds before we should give
    up
  -interactive: puts you into interactive mode.  See the tutorial for
    more details
  -multiWindow: puts you into a mode where the test web site executes
    in a separate window, and selenium supports frames
  -forcedBrowserMode <browser>: sets the browser mode (e.g.
    "*iexplore" for all sessions, no matter what is passed to
    getNewBrowserSession
  -userExtensions <file>: indicates a JavaScript file that will be
    loaded into selenium
  -browserSessionReuse: stops re-initialization and spawning of the
    browser between tests
  -avoidProxy: By default, we proxy every browser request; set this
    flag to make the browser use our proxy only for URLs containing
    '/selenium-server'
  -firefoxProfileTemplate <dir>: normally, we generate a fresh empty
    Firefox profile every time we launch.  You can specify a directory
    to make us copy your profile directory instead.
  -debug: puts you into debug mode, with more trace information and
    diagnostics on the console
  -browserSideLog: enables logging on the browser side; logging
    messages will be transmitted to the server.  This can affect
    performance.
  -log <logFileName>: writes lots of debug information out to a log
    file
  -htmlSuite <browser> <startURL> <suiteFile> <resultFile>: Run a
    single HTML Selenese (Selenium Core) suite and then exit
    immediately, using the specified browser (e.g. "*firefox") on the
    specified URL (e.g. "http://www.google.com").  You need to specify
    the absolute path to the HTML test suite as well as the path to the
    HTML results file we'll generate.
  -proxyInjectionMode: puts you into proxy injection mode, a mode
    where the selenium server acts as a proxy server for all content
    going to the test application.  Under this mode, multiple domains
    can be visited, and the following additional flags are supported:

    -dontInjectRegex <regex>: an optional regular expression that
      proxy injection mode can use to know when to bypss injection
    -userJsInjection <file>: specifies a JavaScript file which will
      then be injected into all pages
    -userContentTransformation <regex> <replacement>: a regular
      expression which is matched against all test HTML content; the
      second is a string which will replace matches.  These flags can
      be used any number of times.  A simple example of how this could
      be useful: if you add "-userContentTransformation https http"
      then all "https" strings in the HTML of the test application will
      be changed to be "http".
  
======================================================================
Copyright

Copyright (c) 2001-2011 TIBCO Software Inc. ALL RIGHTS RESERVED.
