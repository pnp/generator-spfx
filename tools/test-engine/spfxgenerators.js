module.exports = [
    require.resolve('@microsoft/generator-sharepoint/lib/generators/app'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/applicationCustomizer'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/commandSet'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/component'),

    require.resolve('@microsoft/generator-sharepoint/lib/generators/onPrem19ApplicationCustomizer'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/onPrem19CommandSet'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/onPrem19Component'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/onPrem19Extension'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/onPrem19FieldCustomizer'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/onPrem19Webpart'),

    require.resolve('@microsoft/generator-sharepoint/lib/generators/extension'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/fieldCustomizer'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/onPremComponent'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/onPremWebpart'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/solution'),
    require.resolve('@microsoft/generator-sharepoint/lib/generators/webpart'),
]
