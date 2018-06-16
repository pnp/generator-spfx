module.exports = {
    // Glue generator
    'main': require.resolve('../generators/main'),
    // Add additional addons
    'addons': require.resolve('../generators/addons'),
    // SPFx
    'spfx': require.resolve('@microsoft/generator-sharepoint/lib/generators/app')
}