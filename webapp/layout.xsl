<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<xsl:template match="ignore">
		<xsl:apply-templates/>
	</xsl:template>
	<xsl:template match="legend">
	</xsl:template>
	<xsl:template match="button">
		<button type="button" class="btn btn-default" >
			<xsl:copy-of select="@*" />
			<xsl:apply-templates/>
		</button>
	</xsl:template>
	<xsl:template match="*[@ui-layout]">
		<span style="color:red">
			IGNORAR TAG <xsl:value-of select="name(.)"/>
		</span>
	</xsl:template>
	<xsl:template match="input[@ui-layout]">
		<div class="input-group">
			<xsl:copy-of select="@ng-hiden|@ng-show"/>
			<!--
			<xsl:if test=".[@placeholder|@title]">
				<span class="input-group-addon">
					<xsl:value-of select="@placeholder|@title"/>
				</span>
			</xsl:if>
			-->
			<input type="{type}" class="form-control">
				<xsl:copy-of select="@*"/>
			</input>
			
			<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
		</div>
	</xsl:template>
	<xsl:template match="select[@ui-layout]">
		<span class="input-group"> 
			<xsl:copy-of select="@ng-hiden|@ng-show"/>
			<!--
			<xsl:if test=".[@placeholder|@title]">
				<span class="input-group-addon">
					<xsl:value-of select="@placeholder|@title"/>
				</span>
			</xsl:if>
			-->
			<!--input/-->
			<a data-toggle="dropdown" href="#" class="form-control">
				<span class="form-control-staticx">
					{{<xsl:value-of select="@ng-model"/>}}
					<span class="caret"></span>
				</span>
			</a>
			<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
			<select size="10" class="dropdown-menu">
				<xsl:copy-of select="@*"/>
				<xsl:copy-of select="option"/>
			</select>
		</span>
		
		
	</xsl:template>
	<xsl:template match="div[@ui-layout]">
		<div>
			<ul class="nav nav-pills">
				<xsl:for-each select="fieldset/legend">
					<li>
						<a href="#{../@id}">
							<xsl:apply-templates/>
						</a>
					</li>
				</xsl:for-each>
			</ul>
			<div class="tab-content">
				<xsl:for-each select="fieldset">
					<div id="{@id}" class="tab-pane fade in active">
						<xsl:apply-templates/>
					</div>
					**************
				</xsl:for-each>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="span[@ui-layout]">
		<div class="row form-horizontal">
			<xsl:for-each select="input|select|button">
				<label class="col-sm-1 control-label">
					<xsl:value-of select="@placeholder|@title"/>
				</label>
				<div class="col-md-3">
					<xsl:apply-templates select="."/>
				</div>
			</xsl:for-each>
		</div>
	</xsl:template>
	
</xsl:stylesheet>
