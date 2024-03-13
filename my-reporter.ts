import {Reporter, FullConfig, Suite, FullResult, TestCase, TestResult} from '@playwright/test/reporter'
import * as fs from 'fs';


class MyReporter implements Reporter {
    constructor(options: { customOption?: string } = {}) {
        console.log(`my-reporter setup with customOption set to ${options.customOption}`);
      }
    onBegin(config: FullConfig, suite: Suite){
        console.log(`Execution of ${suite.allTests().length} tests `);
    }
    onEnd(result: FullResult): void | Promise<void | { status?: 'passed' | 'failed' | 'timedout' | 'interrupted' | undefined; } | undefined> {
        console.log(`Executiion finished with status of ${result.status}`);
    }
    onTestBegin(test: TestCase, result: TestResult): void {
        console.log(`Execution of ${test.title} started`);
    }
    onTestEnd(test: TestCase, result: TestResult): void {
        const execTime = result.duration

        const data = {
            test : test.title,
            status : result.status,
            executionTime : execTime,
            errors: result.errors
        };

        const dataToString = JSON.stringify(data, null, 2);
        console.log(dataToString);
    
        fs.writeFileSync("test-result.json", dataToString);
    }
}
export default MyReporter;