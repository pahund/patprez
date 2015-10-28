import withArgs from "./withArgs";

function executor(promise, ms, errorMessage, resolve, reject) {
    const handle = setTimeout(withArgs(new Error(errorMessage))(reject), ms);
    promise.then((...args) => {
        clearTimeout(handle);
        resolve(...args);
    }).catch(reject);
}

export default (promise, ms, errorMessage = "timeout after " + ms + " ms") =>
    new Promise(withArgs(promise, ms, errorMessage)(executor));
