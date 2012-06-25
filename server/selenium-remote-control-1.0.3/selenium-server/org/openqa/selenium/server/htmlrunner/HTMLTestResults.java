/*
 * Modified by TIBCO Software Inc., � 2008
 * General Interface Test Automation Kit (GITAK) 0.9
 */
/*
 * Copyright 2004 ThoughtWorks, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
package org.openqa.selenium.server.htmlrunner;

import java.io.*;
import java.net.*;
import java.text.*;
import java.util.*;

/**
 * A data model class for the results of the Selenium HTMLRunner (aka TestRunner, FITRunner)
 * 
 * @author Darren Cotterill
 * @author Ajit George
 */
public class HTMLTestResults {
    private final String result;
    private final String totalTime;
    private final String numTestTotal;
    private final String numTestPasses;
    private final String numTestFailures;
    private final String numCommandPasses;
    private final String numCommandFailures;
    private final String numCommandErrors;
    private final String seleniumVersion;
    private final String seleniumRevision;
    private final String log;
    private final String userAgent; // gitak extended
    private final String storedVars; // gitak extended
    private final String giVersion; // gitak extended
    private final HTMLSuiteResult suite;

    private static final String HEADER = "<html>\n" +
    "<head><style type='text/css'>\n" +
    "body, table {\n" + 
    "    font-family: Verdana, Arial, sans-serif;\n" + 
    "    font-size: 12;\n" + 
    "}\n" + 
    "\n" + 
    "table {\n" + 
    "    border-collapse: collapse;\n" + 
    "    border: 1px solid #ccc;\n" + 
    "}\n" + 
    "\n" + 
    "th, td {\n" + 
    "    padding-left: 0.3em;\n" + 
    "    padding-right: 0.3em;\n" + 
    "}\n" + 
    "\n" + 
    "a {\n" + 
    "    text-decoration: none;\n" + 
    "}\n" + 
    "\n" + 
    ".title {\n" + 
    "    font-style: italic;\n" + 
    "}\n" + 
    "\n" + 
    ".selected {\n" + 
    "    background-color: #ffffcc;\n" + 
    "}\n" + 
    "\n" + 
    ".status_done {\n" + 
    "    background-color: #eeffee;\n" + 
    "}\n" + 
    "\n" + 
    ".status_passed {\n" + 
    "    background-color: #ccffcc;\n" + 
    "}\n" + 
    "\n" + 
    ".status_failed {\n" + 
    "    background-color: #ffcccc;\n" + 
    "}\n" + 
    "\n" + 
    ".breakpoint {\n" + 
    "    background-color: #cccccc;\n" + 
    "    border: 1px solid black;\n" + 
    "}\n" +
    "</style><title>Test suite results</title></head>\n" + 
    "<body>\n<h1>Test suite results </h1>";
    private static final String SUMMARY_HTML =  
            "\n\n<table>\n" +
            "<tr>\n<td>result:</td>\n<td>{0}</td>\n</tr>\n" +
            "<tr>\n<td>totalTime:</td>\n<td>{1}</td>\n</tr>\n" +
            "<tr>\n<td>numTestTotal:</td>\n<td>{2}</td>\n</tr>\n" +
            "<tr>\n<td>numTestPasses:</td>\n<td>{3}</td>\n</tr>\n" +
            "<tr>\n<td>numTestFailures:</td>\n<td>{4}</td>\n</tr>\n" +
            "<tr>\n<td>numCommandPasses:</td>\n<td>{5}</td>\n</tr>\n" +
            "<tr>\n<td>numCommandFailures:</td>\n<td>{6}</td>\n</tr>\n" +
            "<tr>\n<td>numCommandErrors:</td>\n<td>{7}</td>\n</tr>\n" +
            "<tr>\n<td>Selenium Version:</td>\n<td>{8}</td>\n</tr>\n" +
            "<tr>\n<td>Selenium Revision:</td>\n<td>{9}</td>\n</tr>\n" +
            "<tr>\n<td>User Agent:</td>\n<td>{10}</td>\n</tr>\n" +
            "<tr>\n<td>{11}</td>\n<td>&nbsp;</td>\n</tr>\n</table>";
    
    private static final String SUITE_HTML = "<tr>\n<td><a name=\"{0}\">{1}</a><br/>{2}</td>\n<td>&nbsp;</td>\n</tr>";
    
    private final List<String> testTables;

    public HTMLTestResults(String postedSeleniumVersion, String postedSeleniumRevision, 
            String postedResult, String postedTotalTime, 
            String postedNumTestTotal, String postedNumTestPasses, String postedNumTestFailures,
            String postedNumCommandPasses, String postedNumCommandFailures, String postedNumCommandErrors,
            String postedSuite, String postedAgent, List<String> postedTestTables, String postedLog,
            String postedVars, String postedJsxVersion) {

        result = postedResult;
        numCommandFailures = postedNumCommandFailures;
        numCommandErrors = postedNumCommandErrors;
        suite = new HTMLSuiteResult(postedSuite);
        totalTime = postedTotalTime;
        numTestTotal = postedNumTestTotal;
        numTestPasses = postedNumTestPasses;
        numTestFailures = postedNumTestFailures;
        numCommandPasses = postedNumCommandPasses;
        testTables = postedTestTables;
        seleniumVersion = postedSeleniumVersion;
        seleniumRevision = postedSeleniumRevision;
        log = postedLog;
        userAgent = postedAgent;
        storedVars = postedVars;
        giVersion = postedJsxVersion;
    }


    public String getResult() {
        return result;
    }
    public String getNumCommandErrors() {
        return numCommandErrors;
    }
    public String getNumCommandFailures() {
        return numCommandFailures;
    }
    public String getNumCommandPasses() {
        return numCommandPasses;
    }
    public String getNumTestFailures() {
        return numTestFailures;
    }
    public String getNumTestPasses() {
        return numTestPasses;
    }
    public Collection getTestTables() {
        return testTables;
    }
    public String getTotalTime() {
        return totalTime;
    }
    public int getNumTotalTests() {
        return Integer.parseInt(numTestPasses) + Integer.parseInt(numTestFailures);
    }

     /**
  * Escape characters for text appearing as XML data, between tags.
  * 
  * <P>The following characters are replaced with corresponding character entities : 
  * <table border='1' cellpadding='3' cellspacing='0'>
  * <tr><th> Character </th><th> Encoding </th></tr>
  * <tr><td> < </td><td> &lt; </td></tr>
  * <tr><td> > </td><td> &gt; </td></tr>
  * <tr><td> & </td><td> &amp; </td></tr>
  * <tr><td> " </td><td> &quot;</td></tr>
  * <tr><td> ' </td><td> &#039;</td></tr>
  * </table>
  * 
  * <P>Note that JSTL's {@code <c:out>} escapes the exact same set of 
  * characters as this method. <span class='highlight'>That is, {@code <c:out>}
  *  is good for escaping to produce valid XML, but not for producing safe HTML.</span>
  */
  public static String escapeXML(String aText){
    final StringBuilder result = new StringBuilder();
    final StringCharacterIterator iterator = new StringCharacterIterator(aText);
    char character =  iterator.current();
    while (character != CharacterIterator.DONE ){
      if (character == '<') {
        result.append("&lt;");
      }
      else if (character == '>') {
        result.append("&gt;");
      }
      else if (character == '\"') {
        result.append("&quot;");
      }
      else if (character == '\'') {
        result.append("&#039;");
      }
      else if (character == '&') {
         result.append("&amp;");
      }
      else {
        //the char is not a special one
        //add it to the result as is
        result.append(character);
      }
      character = iterator.next();
    }
    return result.toString();
  }


    public void write(Writer out) throws IOException {
        out.write(HEADER);
        Object[] sumval = {result,
                totalTime,
                numTestTotal,
                numTestPasses,
                numTestFailures,
                numCommandPasses,
                numCommandFailures,
                numCommandErrors,
                seleniumVersion,
                seleniumRevision,
                userAgent,
                suite.getUpdatedSuite()};
        out.write(MessageFormat.format(SUMMARY_HTML, sumval));

        // Display storedVars in a table
        if (giVersion != null) {
            out.write("<table id=\"gitak_vars\"><tr><td>GI Version:</td><td>" + giVersion + "</td></tr>");
        } else {
            out.write("<table>");
        }

        if (storedVars != null) {
            String[] vars = storedVars.split(",");
            if (vars.length > 0)
                for (String var : vars) {
                    String[] nv = var.split("::");
                    if (nv.length > 1) {
                        String value = escapeXML(nv[1]) + " ";
                        out.write("<tr><td>" + nv[0] + "</td><td>" + value + "</td></tr>");
                    }
                }
        }
        out.write("</table>"); // End storedvars table

        for (int i = 0; i < testTables.size(); i++) {
            String table = testTables.get(i).replace("\u00a0", "&nbsp;");
            Object[] val= {suite.getSuiteTitle()+"-"+suite.getCaseName(i), suite.getHref(i), table};
            out.write(MessageFormat.format(SUITE_HTML, val));
        }
        out.write("</table><pre>\n");
        if (log != null) {
        	out.write(quoteCharacters(log));
        }
        out.write("</pre></body></html>");
        out.flush();
    }
    
    public static String quoteCharacters(String s) {
        StringBuffer result = null;
        for (int i = 0, max = s.length(), delta = 0; i < max; i++) {
            char c = s.charAt(i);
            String replacement = null;

            if (c == '&') {
                replacement = "&amp;";
            } else if (c == '<') {
                replacement = "&lt;";
            } else if (c == '>') {
                replacement = "&gt;";
            } else if (c == '"') {
                replacement = "&quot;";
            } else if (c == '\'') {
                replacement = "&apos;";
            }

            if (replacement != null) {
                if (result == null) {
                    result = new StringBuffer(s);
                }
                result.replace(i + delta, i + delta + 1, replacement);
                delta += (replacement.length() - 1);
            }
        }
        if (result == null) {
            return s;
        }
        return result.toString();
    }
    
    class UrlDecoder {

        public String decode(String string) {
            try {
                return URLDecoder.decode(string, System.getProperty("file.encoding"))
                    ;
            } catch (UnsupportedEncodingException e) {
                return string;
            }
        }
        
        public List decodeListOfStrings(List list) {
            List<String> decodedList = new LinkedList<String>();
            
            for (Iterator i = list.iterator(); i.hasNext();) {
                decodedList.add(decode((String) i.next()));
            }
            
            return decodedList;
        }
    }
}
