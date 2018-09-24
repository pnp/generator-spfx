// Merge custom loader to web pack configuration
build.configureWebpack.mergeConfig({

    additionalConfiguration: (generatedConfiguration) => {

        const VueLoaderPlugin = require('vue-loader/lib/plugin');

        const plugin = new VueLoaderPlugin();
        const loadersConfigs = [{
            test: /\.vue$/, // vue
            use: [{
                loader: 'vue-loader'
            }]
        }, {
            resourceQuery: /vue&type=script&lang=ts/, // typescript
            loader: 'ts-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        }, {
            resourceQuery: /vue&type=style.*&lang=scss/, // scss
            use: [
                {
                    loader: require.resolve('@microsoft/loader-load-themed-styles'),
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
                'sass-loader']
        }, {
            resourceQuery: /vue&type=style.*&lang=sass/, // sass
            use: [
                {
                    loader: require.resolve('@microsoft/loader-load-themed-styles'),
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
            'sass-loader?indentedSyntax']  
        }];

        generatedConfiguration.plugins.push(plugin);
        generatedConfiguration.module.rules.push(...loadersConfigs);

        return generatedConfiguration;

    }
});

let copyVueFiles = build.subTask('copy-vue-files', function (gulp, buildOptions, done) {
    gulp.src(['src/**/*.vue'])
        .pipe(gulp.dest(buildOptions.libFolder));
    done();
});

// marker to check if custom watch is already registered
// used to prevent watch bubbling
let customWatchRegistered = false;

let watchVueFiles = build.subTask('watch-vue-files', function (gulp, buildOptions, done) {
    // register watch only on first run
    if (!customWatchRegistered) {

        // on change of *.vue files
        gulp.watch('./src/**/*.vue', event => {
            // copy empty index.ts onto itself to launch build procees
            gulp.src('./src/index.ts')
                .pipe(gulp.dest('./src/'));
        });

        // after watch is registered don't register again
        customWatchRegistered = true;

    }

    done();
});

build.rig.addPostTypescriptTask(copyVueFiles);
build.rig.addPreBuildTask(watchVueFiles);