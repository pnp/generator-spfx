// Merge custom loader to web pack configuration

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const vuePlugin = new VueLoaderPlugin();
const themedStyleLoader = require.resolve('@microsoft/loader-load-themed-styles');

<% if (tsLint) { %>
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
    const forkTsPlugin = new ForkTsCheckerWebpackPlugin({
        vue: true,
        tslint: true,
        formatter: 'codeframe',
        checkSyntacticErrors: false,
        watch: '/src/**/*.vue'
    });
<% } %>

    build.configureWebpack.mergeConfig({

        additionalConfiguration: (generatedConfiguration) => {

            const loadersConfigs = [{
                test: /\.vue$/, // vue
                use: [{
                    loader: 'vue-loader'
                }]
            }, {
                resourceQuery: /vue&type=script&lang=ts/, // typescript
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true
                }
            }, {
                resourceQuery: /vue&type=style.*&lang=scss/, // scss
                use: [{
                    loader: themedStyleLoader,
                    options: {
                        async: true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[local]_[sha1:hash:hex:8]'
                    }
                },
                    'sass-loader'
                ]
            }];

            generatedConfiguration.plugins.push(vuePlugin);
        <% if (tsLint) { %>
                generatedConfiguration.plugins.push(forkTsPlugin);
        <% } %>
                generatedConfiguration.module.rules.push(...loadersConfigs);

            return generatedConfiguration;

        }

    });

// register custom watch for Vue.JS files
// copy of '.vue' files will be handled by 'copy-static-assets.json'
gulp.watch('./src/**/*.vue', event => {
    // copy empty index.ts onto itself to launch build procees
    gulp.src('./src/index.ts')
        .pipe(gulp.dest('./src/'));

});
