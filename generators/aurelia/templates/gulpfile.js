// Merge custom loader to web pack configuration

const { AureliaPlugin } = require("aurelia-webpack-plugin");



build.configureWebpack.mergeConfig({

    additionalConfiguration: (generatedConfiguration) => {
        generatedConfiguration.module.rules[0].issuer = {
          test: /\.[tj]s$/i,
        };
  
        var rule1 = { test: /\.css$/i,issuer: [{ test: /\.html$/i }], use: "css-loader"} ;
        generatedConfiguration.module.rules.push(rule1)
  
        var rule2 = { test: /\.ts$/i, use: "ts-loader" };
        generatedConfiguration.module.rules.push(rule2);
        
        generatedConfiguration.plugins.push(new AureliaPlugin(
        {
          aureliaApp: undefined
        }));
      
        // Fix for SPFx 1.10.0, since it is missing the lib configuration
        if(!generatedConfiguration.resolve.modules.includes('lib'))
        {
          generatedConfiguration.resolve.modules.push('lib');
        }
        return generatedConfiguration;
      }

});

