module.exports = {
    // Add additional addons
    'addons': require.resolve('../generators/addons'),
    // Angular Elements
    'angularelements': require.resolve('../generators/angularelements'),
    // CI CD scaffolding
    'devops': require.resolve('../generators/devops'),
    // Handlebars
    'handlebars': require.resolve('../generators/handlebars'),
    //VueJs
    'vuejs': require.resolve('../generators/vuejs'),
    // SPFx
    'spfx': require.resolve('@microsoft/generator-sharepoint/lib/generators/app/index.js')
}
