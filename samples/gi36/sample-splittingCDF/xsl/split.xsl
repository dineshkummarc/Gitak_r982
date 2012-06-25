<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- xsl:output method="html" omit-xml-declaration="yes"/ -->
  <xsl:param name="size">Medium</xsl:param>

  <xsl:template match="/">
    <data jsxid="jsxroot">
      <xsl:for-each select="//record[@size=$size]">
        <xsl:copy-of select="."/>
      </xsl:for-each>
    </data>
  </xsl:template>

</xsl:stylesheet> 