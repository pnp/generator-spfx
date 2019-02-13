const pipelineOptions = [
    {
        'name': 'None',
        'value': 'none'
    },
    {
        'name': 'Azure DevOps',
        'value': 'azure'
    }
];
// generat configuration options
const configOptions = [
    // Library selection
    {
        type: 'list',
        message: 'Which pipeline configuration to include',
        name: 'continuousIntegration',
        choices: pipelineOptions
    }
]


// export options as module
module.exports = configOptions;
