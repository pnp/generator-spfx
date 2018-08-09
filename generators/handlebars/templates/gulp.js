const loaderConfig = {
    test: /\.hbs/,
    loader: "handlebars-template-loader"
};

build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        
        generatedConfiguration.module.rules.push(loaderConfig);

        return generatedConfiguration;

    }
});