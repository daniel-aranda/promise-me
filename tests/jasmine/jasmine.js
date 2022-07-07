const Jasmine = require('jasmine');

runTests();

async function runTests(){

    const jasmine = new Jasmine();

    jasmine.loadConfigFile('tests/jasmine/jasmine.json');

    jasmine.clearReporters();

    jasmine.addReporter(require('./jasmine-reporter.js').BRQueryReporter);

    const results = await jasmine.execute();

    console.log(results);

}