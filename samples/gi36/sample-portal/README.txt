Use sample-portal.html to run with a given version of GI specified with URL parameter, gipath.

Classes:
jsx3.chart.PieSeries
jsx3.chart.PieChart
jsx3.gui.list
jsx3.xml.CDF

Methods:
jsx3.chart.PieSeries.tooltip
jsx3.xml.CDF.insertRecord
jsx3.xml.CDF.resetData
jsx3.app.Model.getDescendantOfName
getChildNodes();
jsx3.app.Model.getParent()
jsx3.xml.Entity.getChildNodes()
parseFloat
roundTo
jsx3.CDF.getKey()
jsx3.chart.PieSeries.tooltip


Constants:



Keywords:
Drag
Drop
multi portlet
portlet communication
pie chart
package name
namespaces

Description:
portlet Communication; version 3.5
JSX version: 3.5+

This sample application demonstrates how to instantiate two GI application instances in a single HTML page, 
and communicate between them using PageBus. 

There are two projects included in this zip file, along with a launch page to demonstrate the behavior.
To install, simply unzip the attached .zip file into your JSXAPPS/ folder. Update the JSX path and Double-clicking the launch page will open the two "portlets".

Launch.html redirect to use a URL like this:
file:///C:/tibco/workspace/JSXAPPS/sample-portal/sample-portal.html?gipath=file:///C:/tibco/tibco-gi-3.6.2-pro-max


So how do we avoid using the namespace as a global variable?
In project settings define your application namespace as : eg.sample.portletA.APP
and define your code as :
[code][nobr]
jsx3.lang.Package.definePackage(
  "eg.sample.portletA",                //the full package name
  function(portletA) {          

  portletA.APP;

 ...
} );