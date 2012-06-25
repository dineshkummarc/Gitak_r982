Classes:
jsx3.lang.Package
jsx3.xml.Document
jsx3.app.Server
jsx3.gui.Matrix
jsx3.gui.Slider


Methods:
jsx3.xml.Cacheable.setXSLParam()
jsx3.xml.Document.load()
jsx3.xml.Entity.getRootNode()
jsx3.xml.Entity.appendChild()
jsx3.xml.Entity.getParent()
jsx3.xml.Entity.getChild()
jsx3.gui.Painted.repaint()
jsx3.net.URIResolver.getResolver()

Constants:

Keywords:
large data
paging
slider
xslt
jsxshallowform

Description:
Data Paging; version 2.0
JSX version: 3.2.0
This sample application demonstrates how to page data from a server process into a GI data control, in this case a jsx3.gui.List. 
The browser is very efficient at managing large XML documents, N > 25,000 records, and less efficient at painting huge amounts of HTML, 
for example a list with N > 500 rows. In our use case, we imagine a server which can page 500 record data sets from a 25,000 record data source.

