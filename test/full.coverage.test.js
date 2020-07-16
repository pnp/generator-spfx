let testRunner = require('../tools/test-engine/testRunner');

let onpremWebPart = [
    require('./testdefinitions/handlebars/handlebars.onprem.webpart'),
    // require('./testdefinitions/knockout/knockout.onprem.webpart'),
    // require('./testdefinitions/knockout.plus/knockout.onprem.webpart'),
    require('./testdefinitions/noframework/noframework.onprem.webpart'),
    require('./testdefinitions/noframework.plus/noframework.onprem.webpart'),
    require('./testdefinitions/reactjs/react.onprem.webpart'),
    require('./testdefinitions/reactjs.plus/react.onprem.webpart'),
    // require('./testdefinitions/vuejs/vuejs.onprem.webpart')
];

let onprem19WebPart = [
    require('./testdefinitions/handlebars/handlebars.onprem19.webpart'),
    // require('./testdefinitions/knockout/knockout.onprem19.webpart'),
    // require('./testdefinitions/knockout.plus/knockout.onprem19.webpart'),
    require('./testdefinitions/noframework/noframework.onprem19.webpart'),
    require('./testdefinitions/noframework.plus/noframework.onprem19.webpart'),
    require('./testdefinitions/reactjs/react.onprem19.webpart'),
    require('./testdefinitions/reactjs.plus/react.onprem19.webpart'),
    require('./testdefinitions/vuejs/vuejs.onprem19.webpart')
];

let spoWebPart = [
    require('./testdefinitions/handlebars/handlebars.spo.webpart'),
    // require('./testdefinitions/knockout/knockout.spo.webpart'),
    // require('./testdefinitions/knockout.plus/knockout.spo.webpart'),
    require('./testdefinitions/noframework/noframework.spo.webpart'),
    require('./testdefinitions/noframework.plus/noframework.spo.webpart'),
    require('./testdefinitions/reactjs/react.spo.webpart'),
    require('./testdefinitions/reactjs.plus/react.spo.webpart'),
    require('./testdefinitions/vuejs/vuejs.spo.webpart')
];

let spoAppCustomizer = [
    require('./testdefinitions/handlebars/handlebars.spo.appcustomizer'),
    // require('./testdefinitions/knockout/knockout.spo.appcustomizer'), // NOT AVAILABLE
    require('./testdefinitions/noframework/noframework.spo.appcustomizer'),
    require('./testdefinitions/noframework.plus/noframework.spo.appcustomizer'),
    // require('./testdefinitions/reactjs/react.spo.appcustomizer'), // NOT AVAILABLE
    require('./testdefinitions/vuejs/vuejs.spo.appcustomizer')
];

let onprem19AppCustomizer = [
    require('./testdefinitions/handlebars/handlebars.onprem19.appcustomizer'),
    // require('./testdefinitions/knockout/knockout.onprem19.appcustomizer'), // NOt AVAIlABLE
    require('./testdefinitions/noframework/noframework.onprem19.appcustomizer'),
    require('./testdefinitions/noframework.plus/noframework.onprem19.appcustomizer'),
    // require('./testdefinitions/reactjs/react.onprem19.appcustomizer'), // NOt AVAIlABLE
    require('./testdefinitions/vuejs/vuejs.onprem19.appcustomizer')
];

let spoFieldCustomizer = [
    require('./testdefinitions/handlebars/handlebars.spo.fieldcustomizer'),
    // require('./testdefinitions/knockout/knockout.spo.fieldcustomizer'),
    // require('./testdefinitions/knockout.plus/knockout.spo.fieldcustomizer'),
    require('./testdefinitions/noframework/noframework.spo.fieldcustomizer'),
    require('./testdefinitions/noframework.plus/noframework.spo.fieldcustomizer'),
    require('./testdefinitions/reactjs/react.spo.fieldcustomizer'),
    require('./testdefinitions/reactjs.plus/react.spo.fieldcustomizer'),
    require('./testdefinitions/vuejs/vuejs.spo.fieldcustomizer')
];

let onprem19FieldCustomizer = [
    require('./testdefinitions/handlebars/handlebars.onprem19.fieldcustomizer'),
    // require('./testdefinitions/knockout/knockout.onprem19.fieldcustomizer'), NOT AVAILABLE
    require('./testdefinitions/noframework/noframework.onprem19.fieldcustomizer'),
    require('./testdefinitions/noframework.plus/noframework.onprem19.fieldcustomizer'),
    require('./testdefinitions/reactjs/react.onprem19.fieldcustomizer'),
    require('./testdefinitions/reactjs.plus/react.onprem19.fieldcustomizer'),
    require('./testdefinitions/vuejs/vuejs.onprem19.fieldcustomizer')
];

let spoListViewCommandSet = [
    require('./testdefinitions/handlebars/handlebars.spo.listviewcommandset'),
    // require('./testdefinitions/knockout/knockout.spo.listviewcommandset'), NOT AVAILABLE
    require('./testdefinitions/noframework/noframework.spo.listviewcommandset'),
    require('./testdefinitions/noframework.plus/noframework.spo.listviewcommandset'),
    // require('./testdefinitions/reactjs/react.spo.listviewcommandset'),
    require('./testdefinitions/vuejs/vuejs.spo.listviewcommandset')
]

describe("Full Test Coverage includes all frameworks and possible assets", () => {

    describe("On premises: Webpart", () => {

        onpremWebPart.forEach(test => {

            let exec = new testRunner();
            exec.run(test);

        });

    })

    describe("On premises 2019: Webpart", () => {

        onprem19WebPart.forEach(test => {

            let exec = new testRunner();
            exec.run(test);

        });

    })

    describe("SPO: Webpart", () => {

        spoWebPart.forEach(test => {

            let exec = new testRunner();
            exec.run(test);

        });

    })

    describe("SPO: Application Customizer", () => {

        spoAppCustomizer.forEach(test => {

            let exec = new testRunner();
            exec.run(test);

        });

    })

    describe("On premises 2019: Application Customizer", () => {

        onprem19AppCustomizer.forEach(test => {

            let exec = new testRunner();
            exec.run(test);

        });

    })

    describe("SPO: FieldCustomizer", () => {

        spoFieldCustomizer.forEach(test => {

            let exec = new testRunner();
            exec.run(test);

        });

    })

    describe("On premises 2019: FieldCustomizer", () => {

        onprem19FieldCustomizer.forEach(test => {

            let exec = new testRunner();
            exec.run(test);

        });

    })

    describe("On premises Test: List View Command Set", () => {

        spoListViewCommandSet.forEach(test => {

            let exec = new testRunner();
            exec.run(test);

        });

    })

})
