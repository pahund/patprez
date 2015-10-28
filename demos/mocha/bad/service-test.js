/**
 * Run with this command:
 * npm run test-bad
 */

import axios from "axios";
import chai from "chai";
import sinon from "sinon";
import service from "./service";

chai.should();

let ok,
    ko;

describe("When I call the service", () => {
    describe("and the service returns data in time", () => {
        before(setup);
        describe("the resulting promise", () => {
            it("is resolved", () => ok.called.should.be.ok);
            it("is not rejected", () => ko.called.should.not.be.ok);
        });
        after(teardown);
    });
    describe("and the service times out", () => {
        before(setupTimeout);
        describe("the resulting promise", () => {
            it("is rejected", () => ko.called.should.be.ok);
            it("is not resolved", () => ok.called.should.not.be.ok);
        });
        after(teardown);
    });
});

function setup(done) {
    sinon.stub(axios, "get").returns(new Promise(resolve => resolve({
        data: "SOME_DATA"
    })));
    ok = sinon.spy();
    ko = sinon.spy();
    service().then(() => {
        ok();
        done();
    }).catch(() => {
        ko();
        done();
    });
}

function setupTimeout(done) {
    sinon.stub(axios, "get").returns(new Promise(resolve => setTimeout(() => {
        resolve({
            data: "SOME_DATA"
        });
    }, 2000)));
    ok = sinon.spy();
    ko = sinon.spy();
    service().then(() => {
        ok();
        done();
    }).catch(() => {
        ko();
        done();
    });
}

function teardown() {
    axios.get.restore();
}
