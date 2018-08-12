#!/bin/sh

timeout=3000

# rm -rf "./testresult"

# mocha './test/onprem.handlebars.test.js' --timeout $timeout && 
mocha './test/onprem.knockout.test.js' --timeout $timeout &&
mocha './test/onprem.react.test.js' --timeout $timeout &&
# mocha './test/spo.handlebars.test.js' --timeout $timeout &&
mocha './test/spo.knockout.test.js' --timeout $timeout &&
mocha './test/spo.react.test.js' --timeout $timeout