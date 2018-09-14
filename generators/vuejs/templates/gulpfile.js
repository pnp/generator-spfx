const { VueLoaderPlugin } = require('vue-loader');

const plugin = new VueLoaderPlugin();
const loaderConfig = {
    test: /\.vue$/,
    use: [{
        loader: 'vue-loader',
        options: {
            esModule: true,
        }
    }]
};

// Merge custom loader to web pack configuration
build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {

        generatedConfiguration.plugins.push(plugin);
        generatedConfiguration.resolve.alias['vue$$'] = 'vue/dist/vue.esm.js';
        generatedConfiguration.module.rules.push(loaderConfig);

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