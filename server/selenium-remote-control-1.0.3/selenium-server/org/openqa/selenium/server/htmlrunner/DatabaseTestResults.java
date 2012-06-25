/*
Copyright 2008 TIBCO Software Inc.

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
package org.openqa.selenium.server.htmlrunner;

import org.apache.commons.logging.Log;
import org.openqa.jetty.log.LogFactory;

import java.util.*;
import java.util.Date;
import java.util.regex.Pattern;
import java.io.IOException;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.sql.*;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * GITAK database report of the GITestRunner derived from Selenium HTMLRunner (aka TestRunner, FITRunner)
 *
 * @author Darren Hwang
 */
public class DatabaseTestResults {
    static Log log = LogFactory.getLog(DatabaseTestResults.class);

    private final String totalTime;
    private final String numTestTotal;
    private final String numTestPasses;
    private final String numTestFailures;
    private final String seleniumVersion;
    private final String seleniumRevision; // not used?
    private final String logUrl;
    //private final HTMLSuiteResult suite;

    private final List<String> testFailed;
    private final List<String> testPassed;
    private final String timestamp;
    private final Date runTime;

    static Connection ctn;
    private String productName;
    private String productBuild;
    private String runtimePlatform;
    private String productVersion;
    private String dbCategory;

    public DatabaseTestResults(String postedSeleniumVersion, String postedSeleniumRevision,
                               String postedTotalTime,
                               String postedNumTestTotal, String postedNumTestPasses,
                               String postedNumTestFailures,
                               // String postedNumCommandPasses, String postedNumCommandFailures, String postedNumCommandErrors,
                               //List<String> postedTestTables,
                               List<String> postedTestFailed,
                               List<String> postedTestPassed
                               ) {

        //suite = new HTMLSuiteResult(postedSuite);
        totalTime = postedTotalTime;
        numTestTotal = postedNumTestTotal;
        numTestPasses = postedNumTestPasses;
        numTestFailures = postedNumTestFailures;
        testFailed = postedTestFailed;
        testPassed = postedTestPassed;
        seleniumVersion = postedSeleniumVersion;
        seleniumRevision = postedSeleniumRevision;
        productName = System.getProperty("product.name", "gi");
        productVersion = System.getProperty("product.version", "1.0.0");
        productBuild = System.getProperty("product.build", "1.0.0V1");
        runtimePlatform = System.getProperty("gitak.system", System.getProperty("os.name") + "-" + System.getProperty("os.version"));
        dbCategory = System.getProperty("database.category", "functional");
        // This property is set by the -htmlSuite option 4th parameter
        String filename = System.getProperty("htmlSuite.resultFilePath");
        // After the last slash should be the filename
        int lastslash = filename.lastIndexOf("/") > 0 ? filename.lastIndexOf("/"): filename.lastIndexOf("\\");
        if (lastslash > 0)
            filename = filename.substring(lastslash+1);
        logUrl =  productName + "/" +  productBuild + "/" + runtimePlatform + "/" + filename;
        timestamp = String.valueOf(new Date().getTime());
        runTime = new Date();
    }

    public long getTotalTime() {
        return Long.parseLong(totalTime);
    }

    public static void qaSqlExecute(String statement) {
        try {
            sqlExecute("oracle.jdbc.driver.OracleDriver", statement);
            //System.out.println("createRootElement" + sqlstmt); // debug

         } catch (Exception ex) {
            //ex.printStackTrace();
             log.error(ex.getMessage());
        }
    }

    public static Object[][] sqlExecute(String driver, String statement) throws SQLException
    {
        Statement stmt = null;
        //ResultSet rst = null; // for Select query
        Object[][] result = null;
        try {
            Class.forName(driver);
            if (ctn == null) return result;

            stmt = ctn.createStatement();

            log.debug("\nSQL: " + statement );

            stmt.execute(statement);
            int updateCount = stmt.getUpdateCount();

            //String upperSqlStr = (statement.toUpperCase()).trim();
            log.debug( "Number of rows affected = " + updateCount );

            stmt.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.print( e.getMessage() );
            if (stmt != null) stmt.close();
        }
        return result;
    }

   public String formatDateTime(java.util.Date thisDate) {
        String format = "yyyy/MM/dd-HH:mm:ss";
        SimpleDateFormat sformat = new SimpleDateFormat(format);
        if (thisDate == null) thisDate = new java.util.Date();
        String dateString;
       dateString = sformat.format(thisDate);
       return dateString;
    }

    public boolean getDbReportOption() {
        String dboption = System.getProperty("gitak.reportdb", "false");
        return dboption.equalsIgnoreCase("true");
    }

    public synchronized String createSqlTestCaseDescription(String setName, String caseId, String description) {
    
        MessageFormat mf = new MessageFormat("insert into tsi_tests_tc_desc(PRODUCT_NAME, CATEGORY, CASE_ID, SET_NAME, VARIANT_SEQ, CASE_DESC) values(''{0}'', ''{1}'', ''{2}'', ''{3}'', 1, ''{4}'')");

        String desc;
        
        desc = description.replace('\u0000', ' ');
        desc = desc.replace('"', '^');
        desc = desc.replace('\'', '^');
        
        if (setName.length() > 29)
          setName = setName.substring(0,27);   // column size = 30
        if (caseId.length() > 39)
          caseId = caseId.substring(0,37); // column size = 40
        if (desc.length() > 500) {
           int start = desc.length() - 495;
           desc = desc.substring(start,desc.length()) + "...";
        }

        Object[] caseRecord = {productName, dbCategory, caseId, setName, desc};
        return mf.format(caseRecord);
    }

    public synchronized String createSqlTestCaseStatement(String runId, String setName, String caseId, boolean testPassed, String message) {
        MessageFormat mf = new MessageFormat("insert into tsi_tests_case(RUN_ID, SET_NAME, CASE_ID, VARIANT_SEQ, " +
                "TEST_RESULT, IS_MANUAL, NOTE) values(''{0}'', ''{1}'', ''{2}'', 1, ''{3}'', ''N'', ''{4}'')");
        String testResult = "PASSED";
        String note = "";

        if (!testPassed) {
            testResult = "FAILED";
            note = message.replace('\u0000', ' ');
            note = note.replace('"', ' ');
            note = note.replace('\'', ' ');
        }
        if (setName.length() > 29)
        setName = setName.substring(0,27);   // column size = 30
        if (caseId.length() > 39)
        caseId = caseId.substring(0,37); // column size = 40
        if (note.length() > 200) {
           int start = note.length() - 195;
           note = note.substring(start,note.length()) + "...";
        }

        Object[] caseRecord = {runId, setName, caseId, testResult, note};
        return mf.format(caseRecord);
    }

    public String[] splitTestString(String result, String REGEX) {
        //String REGEX = "|";
        Pattern p = Pattern.compile(REGEX);
        return p.split(result);
    }

    private void connectDatabase() {
        try {
            log.info("Writing result to database...");
            Class.forName("oracle.jdbc.driver.OracleDriver");

            String uid = System.getProperty("database.username");
            String passwd = System.getProperty("database.password");
            String url = System.getProperty("database.url");
            ctn = DriverManager.getConnection(url, uid, passwd);
        }
        catch (Exception e) {
            e.printStackTrace();
            log.error(e);
        }
    }

    private void closeDatabase() {
        try { // close connection when done.
            ctn.close();
        } catch (SQLException e) {
            e.printStackTrace();
            log.error(e);
        }
    }

    public void write() throws IOException {
       // insert Database TestSuiteName
        String setname = "";// TODO - implement suite.getName()?
        String runId = productName.toUpperCase() + timestamp;
        String bTcDesc = System.getProperty("database.tc_desc", "false");
        String username= System.getProperty("gitak.username", System.getProperty("user.name"));
        String hostname= System.getProperty("gitak.hostname");
        if (hostname == null) {
            try {
                InetAddress addr = InetAddress.getLocalHost();
                hostname = addr.getHostName();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }

        if (this.getDbReportOption()) {
           this.connectDatabase();

           String sqlstmt = "INSERT INTO tsi_tests_run(RUN_ID, HOSTNAME, PLATFORM, USER_NAME, " +
                "START_TIME, END_TIME, PRODUCT_NAME, PRODUCT_VERSION, PRODUCT_BUILD, CATEGORY, STATUS, " +
                "NUM_TC_STARTED, NUM_TC_PASSED, NUM_TC_FAILED, NUM_TC_MANUAL, NUM_TC_UNCERTAIN, LOG_URL, " +
                "NOTE, T_TESTS_VERSION) VALUES(" +
                "'"  + runId +
                "', '" + hostname +
                "', '" + runtimePlatform +
                "', '"+ username + "', " +
                //"to_date('" + formatDateTime(runTime) + "', 'yyyy/mm/dd-hh24:mi:ss'), " +
                " SYSDATE," +
                // "to_date('" + formatDateTime(null) + "', 'yyyy/mm/dd-hh24:mi:ss'), " +
                " SYSDATE," +
                " '" + productName +       // PDMS predefine product acronym
                "', '" + productVersion  + // Version id like 3.5.1.7
                "', '" + productBuild +    // Top level label, use full version id like 3.5.1V7
                "', '"+ dbCategory + // -Ddatabase.category=ui for PDMS UI test category
                "', 'COMPLETED', " + 
                numTestTotal + ", " + numTestPasses+ ", "+  numTestFailures +", 0, 0, '"+ logUrl +"', null, '"+ this.seleniumVersion +"' )";
            qaSqlExecute(sqlstmt);


            if (testPassed.size() > 0) {
                String[] split= splitTestString(testPassed.get(0), "::");
                setname = split[0];
            } else if (testFailed.size() > 0) {
                String[] split= splitTestString(testFailed.get(0), "::");
                setname = split[0];
            }
            if (setname.length() > 27) {
                setname = setname.substring(0,27); // set_name column size = 30
            }
            log.info("Test Suite = "+setname);
            String sqlset = "INSERT INTO tsi_tests_set(RUN_ID, SEQ_NO, SET_NAME, OWNER," +
                "START_TIME, END_TIME, NUM_TC_STARTED, NUM_TC_PASSED, NUM_TC_FAILED, NUM_TC_MANUAL, NUM_TC_UNCERTAIN, LOG_URL, NOTE) " +
                " VALUES('" + runId + "', null, '"+setname+"', '"+ username + "', " +
                //"to_date('" + formatDateTime(runTime) + "', 'yyyy/mm/dd-hh24:mi:ss'), " +
                " SYSDATE, SYSDATE, 0, 0, 0, 0, 0, null, null)";
            qaSqlExecute(sqlset);


            for (String aTestFailed : testFailed) {
                String tfail = aTestFailed.replace("\u00a0", "&nbsp;");
                // parse failed test string and insert to Database
                String[] values = splitTestString(tfail, "\\|");
                if (values.length > 0) {
                    String[] names = splitTestString(values[0], "::");
                    String testSet = names[0];
                    String testCase = names[1];
                    if (bTcDesc.equals("true") && names.length > 2) {
                        String testDesc = names[2];
                        log.info("Test Desc -->" + testDesc);
                        String descStmt = this.createSqlTestCaseDescription(testSet, testCase, testDesc);
                        qaSqlExecute(descStmt);
                    }
                    qaSqlExecute(this.createSqlTestCaseStatement(runId, testSet, testCase, false, tfail));
                }
            }

            for (String aTestPassed : testPassed) {
                String tpass = aTestPassed.replace("\u00a0", "&nbsp;");
                String[] names = splitTestString(tpass, "::");
                String testSet = names[0];
                String testCase = names[1];
                if (bTcDesc.equals("true") && names.length > 2) {
                    String testDesc = names[2];
                    log.info("Test Desc -->" + testDesc);
                    String descStmt = this.createSqlTestCaseDescription(testSet, testCase, testDesc);
                    qaSqlExecute(descStmt);
                }
                String stmt = this.createSqlTestCaseStatement(runId, testSet, testCase, true, null);

                qaSqlExecute(stmt);
            }
        // Update runtime with actual elapsed time from posted result
        runTime.setTime(runTime.getTime() + this.getTotalTime());

        // Updating test set/suite to close
        String updateSet = "update tsi_tests_set set seq_no=0, owner=''{0}'', end_time=to_date(''{1}'',''yyyy/mm/dd-hh24:mi:ss'')," +
        " num_tc_passed={2}, num_tc_failed={3} where run_id=''{4}'' and set_name=''{5}''";  // update ? log_url=''
        Object[] setVal = {username, formatDateTime(runTime), numTestPasses, numTestFailures, runId, setname };
        qaSqlExecute(MessageFormat.format(updateSet, setVal));

        // Updating test run to close
        String updateRun = "update tsi_tests_run set end_time=to_date(''{0}'',''yyyy/mm/dd-hh24:mi:ss''), status=''COMPLETED''," +
        " NUM_TC_PASSED={1}, NUM_TC_FAILED={2} where run_id = ''{3}''";
        Object[] runVal = {formatDateTime(runTime), numTestPasses, numTestFailures, runId};
        qaSqlExecute(MessageFormat.format(updateRun, runVal));

        closeDatabase();
      } // if this.getDbReportOption
    }
}
