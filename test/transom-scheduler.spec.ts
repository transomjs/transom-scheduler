import expect from "expect.js";
import {TransomScheduler } from '../src';

describe("Transom Scheduler", function() {
    let tsscheduler: TransomScheduler;
    before(() => {
        tsscheduler = new TransomScheduler();
    })

    it("should instantiate", () => {
        expect(tsscheduler.initialize).to.be.a(Function);
    })
})