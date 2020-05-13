const provider = require('./Provider');

let request = require("superagent");
let Provider = provider.Provider;


function removeEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!obj[key] || obj[key].length === 0) delete obj[key];
        }
    }
    return obj;
}

function HTTPProvider(token = '', baseServer = "http://r2.algorand.network", port = 4180, headers = {}) {
    Provider.apply(this, arguments)


    this.get = async function (path, query, requestHeaders={}) {
        try {
            return await request
                .get(this.address + path)
                .set(this.token)
                .set(this.defaultHeaders)
                .set(requestHeaders)
                .set('Accept', 'application/json')
                .query(removeEmpty(query));
        } catch (e) {
            throw e;
        }
    };

    this.post = async function (path, data, requestHeaders={}) {
        try {
            return await request
                .post(this.address + path)
                .set(this.token)
                .set(this.defaultHeaders)
                .set(requestHeaders)
                .send(data);
        } catch (e) {
            throw e.response;
        }
    };

    this.delete = async function (path, data, requestHeaders={}) {
        try {
            return await request
                .delete(this.address + path)
                .set(this.token)
                .set(this.defaultHeaders)
                .set(requestHeaders)
                .send(data);
        } catch (e) {
            throw e.response;
        }
    };
}

module.exports = { HTTPProvider };