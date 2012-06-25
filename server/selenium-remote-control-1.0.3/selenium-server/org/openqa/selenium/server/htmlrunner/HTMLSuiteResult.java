/*
 * Created on Oct 12, 2006
 *
 */
/*
 * Modified by TIBCO Software Inc., � 2008
 * General Interface Test Automation Kit (GITAK) 0.9
 */
package org.openqa.selenium.server.htmlrunner;

import java.io.*;
import java.util.*;
import java.net.URL;

import javax.swing.text.*;
import javax.swing.text.html.*;
import javax.swing.text.html.HTML.*;
import javax.swing.text.html.HTMLEditorKit.*;

public class HTMLSuiteResult {

    //private final String originalSuite;
    private final String updatedSuite;
    private final String suiteTitle;
    private final List<String> hrefs;
    private final List<String> caseList;
    //private final String suiteTitle;
    
    public HTMLSuiteResult(String originalSuite) {
        //this.originalSuite = originalSuite;
        caseList = new ArrayList<String>();
        StringReader s = new StringReader(originalSuite);
        HTMLEditorKit k = new HTMLEditorKit();
        HTMLDocument doc = (HTMLDocument) k.createDefaultDocument();
        Parser parser = doc.getParser();
        HrefConverter p = new HrefConverter(originalSuite);
        doc.setAsynchronousLoadPriority(-1);
        try {
            parser.parse(s, p, true);
        } catch (IOException e) {
            // DGF aw, this won't really happen!  (will it?)
            throw new RuntimeException(e);
        }
        /** create anchor links. **/
        try {

            k.read(new StringReader(originalSuite), doc, 0);
            HTMLDocument.Iterator it = doc.getIterator(Tag.A);

            while (it.isValid()) {
                SimpleAttributeSet set = (SimpleAttributeSet) it.getAttributes();
                String href = (String) set.getAttribute(Attribute.HREF);
                int start = it.getStartOffset();
                int end = it.getEndOffset();
                String name = doc.getText(start, end - start);
                String uriStr = name.replaceAll("\\s", "+");
                //System.out.println("href=" + href + "text=" + uriStr);
                caseList.add(uriStr);
                // snippet.replaceFirst ("\\Q" + href + "\\E", "#" + uriStr);
                it.next();
            }
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        /* */
        suiteTitle = p.firstRows.get(0); // the first one added?
        hrefs = p.hrefList;
        StringBuilder sb = new StringBuilder();
        int previousPosition = originalSuite.length();
        for (int i = p.tagPositions.size()-1; i >= 0; i--) {
            int pos = p.tagPositions.get(i);
            String href = p.hrefList.get(i);
            String snippet = originalSuite.substring(pos, previousPosition); 
            String replaceSnippet = snippet.replaceFirst ("\\Q" + href + "\\E", "#"+ suiteTitle + "-" + caseList.get(i));

            sb.insert(0, replaceSnippet);
            previousPosition = pos;
        }
        String snippet = originalSuite.substring(0, previousPosition);
        sb.insert(0, snippet);
        updatedSuite = sb.toString();
    }
    
    public List<String> getHrefs() {
        return this.hrefs;
    }
    
    public String getHref(int i) {
        if (i >= hrefs.size()) return "";
        return hrefs.get(i);
    }
    // gitak
    public String getCaseName(int i) {
        if (i >= caseList.size()) return "";
        return caseList.get(i);
    }
    public String getSuiteTitle() {
        return this.suiteTitle;
    }
    // gitak
    public String getUpdatedSuite() {
        return this.updatedSuite;
    }

    public String getSuiteName() {
        return "";
    }

    private class HrefConverter extends ParserCallback {
        public HrefConverter(String foo) {
            this.foo = foo;
        }
        String foo;
        boolean gotFirstTable = false;
        boolean gotFirstRow = false;
        boolean gotFirstCell = false;
        public List<String> hrefList = new ArrayList<String>();
        public List<Integer> tagPositions = new ArrayList<Integer>();
        public List<String> firstRows = new ArrayList<String>();

    @Override
    public void handleText(char[] data,int pos) {
        if (this.gotFirstTable && this.gotFirstRow && this.gotFirstCell) {
         String tagtext =  new String(data);
            tagtext = tagtext.replaceAll("\\s", "+");
            firstRows.add(tagtext);
         //System.out.println("text="+tagtext);
        }
        this.gotFirstTable = false;
        this.gotFirstRow = false;
        this.gotFirstCell = false;
    }
      /*
     public void handleSimpleTag(Tag t, MutableAttributeSet a, int pos){

          if (Tag.TD.equals(t)){
              System.out.println("tr tag");
            String attClass = (String)a.getAttribute(HTML.Attribute.CLASS);
            if (attClass.matches("^title*"))   {
                String content1 = (String)a.getAttribute(HTML.Attribute.CONTENT);
                if (content1 != null){
                    System.out.println("META content1: " + content1);
                }
            }
          }
    }
    */
        @Override
        public void handleStartTag(Tag tag, MutableAttributeSet attributes, int pos) {
            if (Tag.TABLE.equals(tag) && !gotFirstTable) {
                gotFirstTable = true;
            }
            if (Tag.TR.equals(tag) && !gotFirstRow) {
                gotFirstRow=true;
            }

            if (Tag.TD.equals(tag) && !gotFirstCell) {
                gotFirstCell=true;
            }
            if (Tag.A.equals(tag)) {
                String href = (String) attributes.getAttribute(HTML.Attribute.HREF);
                //System.out.println("href="+href);
                hrefList.add(href);
                tagPositions.add(pos);
            }
        };
    }

}
