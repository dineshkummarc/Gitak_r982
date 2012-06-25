<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<xsl:template match="/">
		<xsl:element name="data">
			<xsl:attribute name="jsxid">jsxroot</xsl:attribute>
			<xsl:for-each select="//applicant">
				<xsl:element name="record">
					<xsl:attribute name="jsxtext"><xsl:value-of select="./first_name"/><xsl:text>
						</xsl:text><xsl:value-of select="./last_name"/></xsl:attribute>
					<xsl:for-each select="@*">
						<xsl:choose>
							<xsl:when test="starts-with(name(), 'jsxid')"><xsl:attribute name="jsxid"><xsl:value-of select="generate-id()"/></xsl:attribute></xsl:when>
							<xsl:otherwise><xsl:attribute name="{name()}"><xsl:value-of select="."/></xsl:attribute>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:for-each>
					<xsl:for-each select="./*">
						<xsl:attribute name="{name()}"><xsl:value-of select="."/></xsl:attribute>
					</xsl:for-each>
				</xsl:element>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>