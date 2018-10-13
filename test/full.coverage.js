let testRunner = require('../tools/test-engine/testRunner');

let onpremWebPart = [
    require('./testdefinitions/handlebars/handlebars.onprem.webpart'),
    require('./testdefinitions/knockout/knockout.onprem.webpart'),
    require('./testdefinitions/noframework/noframework.onprem.webpart'),
    require('./testdefinitions/reactjs/react.onprem.webpart'),
    require('./testdefinitions/vuejs/vuejs.onprem.webpart')
];

let spoWebPart = [
    require('./testdefinitions/handlebars/handlebars.spo.webpart'),
    require('./testdefinitions/knockout/knockout.spo.webpart'),
    require('./testdefinitions/noframework/noframework.spo.webpart'),
    require('./testdefinitions/reactjs/react.spo.webpart'),
    require('./testdefinitions/vuejs/vuejs.spo.webpart'),
];

let spoAppCustomizer = [
    require('./testdefinitions/handlebars/handlebars.spo.appcustomizer'),
    require('./testdefinitions/knockout/knockout.spo.appcustomizer'),
    require('./testdefinitions/noframework/noframework.spo.appcustomizer'),
    require('./testdefinitions/reactjs/react.spo.appcustomizer'),
    require('./testdefinitions/vuejs/vuejs.spo.appcustomizer')
];

let spoFieldCustomizer = [
    require('./testdefinitions/handlebars/handlebars.spo.fieldcustomizer'),
    // require('./testDefinitioknockout/ns/knockout.spo.fieldcustomizer'), NOT AVALIABLE
    require('./testdefinitions/noframework/noframework.spo.fieldcustomizer'),
    require('./testdefinitions/reactjs/react.spo.fieldcustomizer'),
    require('./testdefinitions/vuejs/vuejs.spo.fieldcustomizer'),
];

let spoListViewCommandSet = [
    require('./testdefinitions/handlebars/handlebars.spo.listviewcommandset'),
    require('./testdefinitions/knockout/knockout.spo.listviewcommandset'),
    require('./testdefinitions/noframework/noframework.spo.listviewcommandset'),
    require('./testdefinitions/reactjs/react.spo.listviewcommandset'),
    require('./testdefinitions/vuejs/vuejs.spo.listviewcommandset')
]

describe("Full Test Coverage includes all frameworks and possible assets", () => {

    describe("On premises Test: Webpart", () => {

        onpremWebPart.forEach(test => {

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


    describe("SPO: FieldCustomizer", () => {

        spoFieldCustomizer.forEach(test => {

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
