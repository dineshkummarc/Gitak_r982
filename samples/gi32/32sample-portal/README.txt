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
portlet Communication; version 2.0
JSX version: 3.1.0

This sample application demonstrates how to instantiate two GI application instances in a single HTML page, 
and communicate between them. Each GI instance or server has its own name space. 

Each GI Application can also define javascript package with set of javascript functions to avoid method names collison.

Furthermore, functions loaded by one instance are available to another instance. 
In this simple application, dragging rows of data from one portlet into another will render that data as a pie chart.
There are two projects included in this zip file, along with a launch page to demonstrate the behavior.
To install, simply unzip the attached .zip file into your JSXAPPS/ folder. Then move the html launch page up one level (as a peer to GI_Builder.html). Double-clicking the launch page will open the two "portlets".
