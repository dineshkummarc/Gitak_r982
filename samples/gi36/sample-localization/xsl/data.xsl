<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" omit-xml-declaration="yes"/>
<xsl:template match="/">
<a><xsl:value-of select="//sample"/></a>
</xsl:template>
</xsl:stylesheet>