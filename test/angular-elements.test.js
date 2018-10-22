let testRunner = require('../tools/test-engine/testRunner');

let onpremWebPart = [
    require('./testdefinitions/angularelements/angularelements.onprem.webpart')
];

let spoWebPart = [
    require('./testdefinitions/angularelements/angularelements.spo.webpart')
];

let spoAppCustomizer = [
    require('./testdefinitions/angularelements/angularelements.spo.appcustomizer')
];

let spoFieldCustomizer = [
    require('./testdefinitions/angularelements/angularelements.spo.fieldcustomizer'),
];

let spoListViewCommandSet = [
    require('./testdefinitions/angularelements/angularelements.spo.listviewcommandset'),
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
