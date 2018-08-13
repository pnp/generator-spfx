module.exports = {
    // Glue generator
    'main': require.resolve('../generators/main'),
    // Add additional addons
    'addons': require.resolve('../generators/addons'),
    // Handlebars
    'handlebars': require.resolve('../generators/handlebars'),
    // SPFx
    'spfx': require.resolve('@microsoft/generator-sharepoint/lib/generators/app'),
    

}