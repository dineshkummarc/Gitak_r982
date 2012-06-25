/**
 * Defines the package for this application.
 */
jsx3.lang.Package.definePackage("eg.localization", function(localization) {
 
  var LOG = jsx3.util.Logger.getLogger(localization.jsxpackage.getName());
  var Locale = jsx3.util.Locale;

  /** {jsx3.app.Server} */
  eg.localization.APP;

  /**
   * Function is executed when user select the language on the tools menu.
   * @param objMenu {jsx3.gui.Menu}
   * @param strID {String} the CDF record ID of the execute menu record.
   */
  localization.doLoadLocalizeResource = function(objMenu, strID) {
    var objServer = eg.localization.APP;

    var locale = strID != "-1" ? Locale.valueOf(strID) : null;
    LOG.info("Setting application locale to " + locale + ".");
    objServer.setLocale(locale);           // Set the locale of the server to the selected locale
    objServer.reloadLocalizedResources();  // We need to tell the server to reload any localized properties

    /* Reset the CDF cache of the menu since dynamic properties are used in the source XML file. */
    objMenu.resetXmlCacheData();
    /* Menus cache their dropdown HTML content, so clear this. */
    objMenu.clearCachedContent();

    /* Repaint the smallest region of the app that is localized. */
    objServer.getJSXByName('blkApp').repaint();
  }

   localization.doLaunchDialog = function(objButton) {
            objButton.getServer().getJSXByName('blkApp').load('components/dlgLocal.xml');
       }

});
