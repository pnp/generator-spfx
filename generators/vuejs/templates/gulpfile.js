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
    return gulp.src(['src/**/*.vue'])
        .pipe(gulp.dest(buildOptions.libFolder))
});
build.rig.addPostTypescriptTask(copyVueFiles);