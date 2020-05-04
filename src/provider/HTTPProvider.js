import {Provider} from "./Provider";
import request from "superagent";

export class HTTPProvider extends Provider {

    async get(path, query, requestHeaders = {}) {
        try {
            return await request
                .get(this.address + path)
                .set(this.token)
                .set(this.defaultHeaders)
                .set(requestHeaders)
                .set('Accept', 'application/json')
                .query(this.removeEmpty(query));
        } catch (e) {
            throw e;
        }
    }

    async post(path, query, requestHeaders = {}) {
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
    }

    async delete(path, query, requestHeaders = {}) {
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
    }

    removeEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!obj[key] || obj[key].length === 0) delete obj[key];
            }
        }
        return obj;
    }
}