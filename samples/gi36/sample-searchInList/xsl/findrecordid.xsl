<?xml version='1.0'?>
<!--
Selects the jsxid as string based on parameters searchedtext and resultindex.
For example, if resultindex is 5 and searchedtext is 'Content',
selects the fifth record descendant of the document root if that 
descendant has a jsxtext attribute containing 'Content'.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:param name="searchedtext">Content</xsl:param>
 <xsl:param name="resultindex">1</xsl:param>
 <xsl:output method="xml" omit-xml-declaration="yes"/>
  <xsl:template match="/">
    <JSX_FF_WELLFORMED_WRAPPER>
        <xsl:for-each select="//record[contains(@jsxtext,$searchedtext)]">
           <xsl:if test="position()=$resultindex" >
              <xsl:value-of select="@jsxid"/>
           </xsl:if>
        </xsl:for-each>
    </JSX_FF_WELLFORMED_WRAPPER>
 </xsl:template>
 </xsl:stylesheet>