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
    // React Plus generator to support further customisation of all react components
    'reactjs.plus': require.resolve('../generators/reactjs.plus'),
    // Knockout Plus generator to support further customisation of all react components
    'knockout.plus': require.resolve('../generators/knockout.plus'),
    // Knockout Plus generator to support further customisation of all react components
    'none.plus': require.resolve('../generators/noframework.plus'),
    // SPFx
    'spfx': require.resolve('@microsoft/generator-sharepoint/lib/generators/app/index.js')
}
