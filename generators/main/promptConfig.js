const supportedFrameworks = [{
        name: 'Handlebars',
        value: 'handlebars'
    },
    {
        name: 'VueJS',
        value: 'vuejs'
    },
    {
        name: 'Angular Elements',
        value: 'angularelement'
    },
    {
        name: 'ReactJS',
        value: 'reactjs'
    },
    {
        name: 'Knockout',
        value: 'knockout'
    },
    {
        name: 'No Framekwork',
        value: 'noframework'
    }
];

const addon = require('./generators/addons/promptConfig').config;

const configOptions = [
    // select your framework
    {
        type: 'list',
        message: "Choose your framwork",
        name: 'framework',
        choices: supportedFrameworks
    }, addon
]



const promptConfig = {
    config: configOptions
}

module.exports = promptConfig;