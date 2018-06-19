const sortProps = (dependencies) => {

    var sortedObject = {};
    let sortedKeys = Object.keys(dependencies).sort();
        
    for(var i = 0; i < sortedKeys.length; i++){
        sortedObject[sortedKeys[i]] = dependencies[sortedKeys[i]]
    }
    
    return sortedObject;

}

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

        console.log('_______________\n', dependencies);
        console.log('_______________\n', devDependencies);

        // sort package properties
        let sortedDependencies = sortProps(dependencies);
        let sortedDevDependencies = sortProps(devDependencies);

        // assing sorted dependencies
        config.dependencies = sortedDependencies;
        config.devDependencies = sortedDevDependencies;

        // return new configuration
        return config;

    }

}