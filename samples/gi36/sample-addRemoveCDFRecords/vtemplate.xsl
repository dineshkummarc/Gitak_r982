<xsl:template match="record" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<div>
<xsl:choose>
<xsl:when test="{0} &lt; 10">
<xsl:attribute name="style"> background-color: yellow;</xsl:attribute>
</xsl:when>
</xsl:choose>
$<xsl:value-of select="{0}"/>
</div>
</xsl:template>