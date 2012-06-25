/*
 * Created on Feb 25, 2006
 *
 */
/*
 * Modified by TIBCO Software Inc., � 2008
 * General Interface Test Automation Kit (GITAK)
 */
package org.openqa.selenium.server.htmlrunner;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Vector;

import org.apache.commons.logging.Log;
import org.openqa.jetty.http.HttpContext;
import org.openqa.jetty.http.HttpException;
import org.openqa.jetty.http.HttpHandler;
import org.openqa.jetty.http.HttpRequest;
import org.openqa.jetty.http.HttpResponse;
import org.openqa.jetty.log.LogFactory;
import org.openqa.jetty.util.StringUtil;

/**
 * Handles results of HTMLRunner (aka TestRunner, FITRunner) in automatic mode.
 *  
 * @author Dan Fabulich
 * @author Darren Cotterill
 * @author Ajit George
 *
 */
@SuppressWarnings("serial")
public class SeleniumHTMLRunnerResultsHandler implements HttpHandler {
    static Log log = LogFactory.getLog(SeleniumHTMLRunnerResultsHandler.class);
    
    HttpContext context;
    List<HTMLResultsListener> listeners;
    boolean started = false;
    
    public SeleniumHTMLRunnerResultsHandler() {
        listeners = new Vector<HTMLResultsListener>();
    }
    
    public void addListener(HTMLResultsListener listener) {
        listeners.add(listener);
    }
    
    public void handle(String pathInContext, String pathParams, HttpRequest request, HttpResponse res) throws HttpException, IOException {
        if (!"/postResults".equals(pathInContext)) return;
        request.setHandled(true);
        log.info("Received posted results");
        String result = request.getParameter("result");
        if (result == null) {
            res.getOutputStream().write("No result was specified!".getBytes());
        }
        String seleniumVersion = request.getParameter("selenium.version");
        String seleniumRevision = request.getParameter("selenium.revision");
        String totalTime = request.getParameter("totalTime");
        String numTestTotal = request.getParameter("numTestTotal");
        String numTestPasses = request.getParameter("numTestPasses");
        String numTestFailures = request.getParameter("numTestFailures");
        String numCommandPasses = request.getParameter("numCommandPasses");
        String numCommandFailures = request.getParameter("numCommandFailures");
        String numCommandErrors = request.getParameter("numCommandErrors");
        String suite = request.getParameter("suite");
        String logString = request.getParameter("log");
        String userAgent = request.getParameter("userAgent");
        String globalVars = request.getParameter("storedVars");
        String jsxVersion = request.getParameter("jsxVersion");
        int numTotalTests = Integer.parseInt(numTestTotal);
        
        List<String> testTables = createTestTables(request, numTotalTests);
// GITAK
        List<String> testFailed = createTestsFailed(request, Integer.parseInt(numTestFailures));
        List<String> testPassed = createTestsPassed(request, Integer.parseInt(numTestPasses));
// GITAK

        HTMLTestResults results = new HTMLTestResults(seleniumVersion, seleniumRevision,
                result, totalTime, numTestTotal, numTestPasses, numTestFailures, numCommandPasses,
                numCommandFailures, numCommandErrors, suite, userAgent, testTables, logString, globalVars, jsxVersion);
        // GITAK database reporting
        DatabaseTestResults dbresults = new DatabaseTestResults(seleniumVersion, seleniumRevision,
                totalTime, numTestTotal, numTestPasses, numTestFailures,
                //numCommandPasses, numCommandFailures, numCommandErrors, testTables,
                testFailed, testPassed);
        dbresults.write();

        for (Iterator<HTMLResultsListener> i = listeners.iterator(); i.hasNext();) {
            HTMLResultsListener listener = i.next();
            listener.processResults(results);
            i.remove();
        }
        processResults(results, res);
    }
    
    /** Print the test results out to the HTML response */
    private void processResults(HTMLTestResults results, HttpResponse res) throws IOException {
        res.setContentType("text/html");
        OutputStream out = res.getOutputStream();
        Writer writer = new OutputStreamWriter(out, StringUtil.__ISO_8859_1);
        results.write(writer);
        writer.flush();
    }
    
    private List<String> createTestTables(HttpRequest request, int numTotalTests) {
        List<String> testTables = new LinkedList<String>();
        for (int i = 1; i <= numTotalTests; i++) {
            String testTable = request.getParameter("testTable." + i);
            //System.out.println("table " + i);
            //System.out.println(testTable);
            testTables.add(testTable);
        }
        return testTables;
    }
// GITAK , passed-failed tests result per test case
    private List<String> createTestsFailed(HttpRequest request, int numFailed) {
        List<String> failedTables = new LinkedList<String>();
        log.info("Number tests failed = " + numFailed);
        for (int i = 0; i < numFailed; i++) {
            String test = request.getParameter("failed." + i);
            //System.out.println("failed: " + i);
            //System.out.println(test);
            failedTables.add(test);
        }
        return failedTables;
    }

    private List<String> createTestsPassed(HttpRequest request, int numPassed) {
        List<String> passedTables = new LinkedList<String>();
        log.info("Number tests passed = " + numPassed);
        for (int i = 0; i < numPassed; i++) {
            String test = request.getParameter("passed." + i);
            //System.out.println("passed: " + i);
            //System.out.println(test);
            passedTables.add(test);
        }
        return passedTables;
    }

// GITAK
    public String getName() {
        return SeleniumHTMLRunnerResultsHandler.class.getName();
    }

    public HttpContext getHttpContext() {
        return context;
    }

    public void initialize(HttpContext c) {
        this.context = c;
        
    }

    public void start() throws Exception {
        started = true;
    }

    public void stop() throws InterruptedException {
        started = false;
    }

    public boolean isStarted() {
        return started;
    }
}
