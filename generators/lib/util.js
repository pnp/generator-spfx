module.exports = {

    mergeAddons: (addonConfig, requestedLibraries, config) => {

        let dependencies = config.dependencies;
        let devDependencies = config.devDependencies;

        for (let key in addonConfig) {

            if (requestedLibraries.indexOf(key)) {
                // inject dependencies
                if (addonConfig[key].dependencies) {

                    for (let depend in addonConfig[key].dependencies) {

                        dependencies[depend] = addonConfig[key].dependencies[depend];

                    }

                }
                // inject dev dependencies
                if (addonConfig[key].devDependencies) {

                    for (let depend in addonConfig[key].devDependencies) {

                        devDependencies[depend] = addonConfig[key].devDependencies[depend];

                    }
                }
                // adding dev dependencies
            }
        }

        // sort package properties
        let sortedDependencies = Object.keys(dependencies).sort();
        let sortedDevDependencies = Object.keys(devDependencies).sort();

        // assing sorted dependencies
        config.dependencies = sortedDependencies;
        config.devDependencies = sortedDevDependencies;

        // return new configuration
        return config;

    }

}