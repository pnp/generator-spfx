// Merge custom loader to web pack configuration

const { AureliaPlugin } = require("aurelia-webpack-plugin");

const themedStyleLoader = require.resolve('@microsoft/loader-load-themed-styles');


    build.configureWebpack.mergeConfig({

        additionalConfiguration: (generatedConfiguration) => {
            generatedConfiguration.module.rules[0].issuer = {
              test: /\.[tj]s$/i,
            };
      
            var rule1 = { test: /\.css$/i,issuer: [{ test: /\.html$/i }], use: "css-loader"} ;
            generatedConfiguration.module.rules.push(rule1)
      
            var rule2 = { test: /\.ts$/i, use: "ts-loader" };
            generatedConfiguration.module.rules.push(rule2);
            
            // Do we need this for IE11?
            //var rule3 = { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise' };
            //generatedConfiguration.module.rules.push(rule3);
      
            generatedConfiguration.plugins.push(new AureliaPlugin(
            {
              aureliaApp: undefined
            }));
          
            
            const lastDirName = path.basename(__dirname);
            const dropPath = path.join(__dirname, 'temp', 'stats');
           
            return generatedConfiguration;
          }

    });
