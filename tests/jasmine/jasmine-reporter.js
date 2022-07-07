let ansi = {
    green: '\x1B[32m',
    blue: '\x1B[36m',
    red: '\x1B[31m',
    yellow: '\x1B[33m',
    none: '\x1B[0m'
};

exports.BRQueryReporter = {
    jasmineStarted: function(suiteInfo) {
        this.specsTime = {};
        this.specsCount = {
            passed: 0,
            failed: 0,
            pending: 0
        }
        colorPrint('blue', `Running suite with ${suiteInfo.totalSpecsDefined} defined specs\n\n`);
    },

    suiteStarted: function(result) {
        print(result.description + `\n`);
    },

    specStarted: function(result) {
        this.specsTime[result.id] = new Date().getTime();
    },

    specDone: function(result) {

        let elapsedTime = new Date().getTime() - this.specsTime[result.id];

        colorPrint('none', `   `);

        if( result.status == 'passed' ){
            colorPrint('green', `✓ ${result.description}`);
            this.specsCount.passed++;
        }else if( result.status == 'pending'){
            colorPrint('yellow', `◴ ${result.description}`);
            this.specsCount.pending++;
        }else{
            colorPrint('red', `✗ ${result.description}`);
            this.specsCount.failed++;
        }

        colorPrint(`yellow`, ` ${elapsedTime} ms \n`);

        for(var i = 0; i < result.failedExpectations.length; i++) {
            print(`    Failure: `);
            colorPrint('red', `${result.failedExpectations[i].message}`);
            colorPrint('red', `${result.failedExpectations[i].stack}  \n`);
        }

        //result.passedExpectations.length
    },

    suiteDone: function(result) {
        // console.log('Suite: ' + result.description + ' was ' + result.status);
        // for(var i = 0; i < result.failedExpectations.length; i++) {
        //   console.log('Suite ' + result.failedExpectations[i].message);
        //   console.log(result.failedExpectations[i].stack);
        // }
        print(`\n`);
    },

    jasmineDone: function(result) {

        colorPrint('green', this.specsCount.passed);
        colorPrint('none', ` passed`);
        print(`  `);

        colorPrint('red', this.specsCount.failed);
        colorPrint('none', ` failed`);
        print(`  `);

        print(`\n\n`);

        print('Finished suite: ')
        if( result.overallStatus == 'passed'){
            colorPrint('green', result.overallStatus);
        }else{
            colorPrint('red', result.overallStatus);
        }

        colorPrint(`yellow`, '  ' + (result.totalTime/1000).toFixed(2) + ' s');

        print(`\n\n`);

    }
};

function colorPrint(color, message){
    print(colored(color, message));
}

function print(message){
    process.stdout.write(message);
}

function colored(color, str) {
    //TODO: apply color only on OSX
    return ansi[color] + str + ansi.none;
}
