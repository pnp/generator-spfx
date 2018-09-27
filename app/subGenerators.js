module.exports = {
    // Add additional addons
    'addons': require.resolve('../generators/addons'),
    // Handlebars
    'handlebars': require.resolve('../generators/handlebars'),
    //VueJs
    'vuejs': require.resolve('../generators/vuejs'),
    // SPFx
    'spfx': require.resolve('../node_modules/@microsoft/generator-sharepoint/lib/generators/app/index.js')
}