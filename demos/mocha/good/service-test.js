/**
 * Run with this command:
 * npm run test-good
 */

import axios from "axios";
import chai from "chai";
import sinon from "sinon";
import service from "./service";
import config from "./config";

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
    }, 10)));
    sinon.stub(config, "get").returns({
        serviceUrl: "http://my.service/endpoint",
        timeout: 0
    });
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
    if (typeof axios.get.restore === "function") {
        axios.get.restore();
    }
    if (typeof config.get.restore === "function") {
        config.get.restore();
    }
}
