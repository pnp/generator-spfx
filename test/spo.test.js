const rimraf = require('rimraf');

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

// var common = require("./common");

describe("top", function () {
    // beforeEach(function (done) {
    //     rimraf(
    //         '../testresult/' + '{*,.*}', done);
    // })

    importTest("Handlebars", './spo.handlebars.test.js');
    importTest("knockout", './spo.knockout.test.js');
    importTest("react", './spo.react.test.js');
    importTest("vuejs", './spo.vuejs.test.js');

    after(function () {
        console.log("after all tests");
    });
});
