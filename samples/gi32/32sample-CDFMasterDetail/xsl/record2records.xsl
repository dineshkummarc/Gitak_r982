<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
  <xsl:template match="/">
    <xsl:element name="data">
      <xsl:attribute name="jsxid">jsxroot</xsl:attribute>
      <xsl:for-each select="//record/@*">
        <xsl:if test="not(starts-with(name(),'jsx'))">
            <xsl:if test="not(starts-with(name(),'recordtype'))">
                <xsl:element name="record">
                <xsl:attribute name="jsxid">
                <xsl:value-of select="generate-id()"/></xsl:attribute>
                <xsl:attribute name="jsxtext"><xsl:value-of select="name()"/></xsl:attribute>
                <xsl:attribute name="jsxvalue"><xsl:value-of select="."/></xsl:attribute>
              </xsl:element>
            </xsl:if>
        </xsl:if>
      </xsl:for-each>
      </xsl:element>
  </xsl:template>
</xsl:stylesheet>