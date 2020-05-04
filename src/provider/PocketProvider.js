import {Provider} from "./Provider";
import {Pocket, PocketAAT, typeGuard} from "@pokt-network/pocket-js";
import {RpcError} from "@pokt-network/pocket-js/lib/src/rpc";

export class PocketProvider extends Provider {

    constructor(token, baseServer, port, headers = {}, pocketPrivateKey, pocketPublicKey, pocketAddress, pocketPassphrase) {
        super(token, baseServer, port, headers);

        this.pocket = new Pocket([new URL(this.address)])

        this.pocket.keybase.importAccount(Buffer.from(pocketPrivateKey, 'hex'), pocketPassphrase).then(() => {
            this.pocket.keybase.unlockAccount(pocketAddress, pocketPassphrase, 0).then(() => {
                (async () => {
                    try {
                        this.pocketAAT = await PocketAAT.from('0.0.1', pocketPublicKey, pocketPublicKey, pocketPrivateKey)
                    } catch (e) {
                        console.log(e)
                    }
                })()
            })
        })
    }

    async get(path, query, requestHeaders = {}) {
        return await this.sendPocketRelay(requestHeaders, query, path, "get");
    }

    async sendPocketRelay(requestHeaders, query, path, method) {
        let headers = Object.assign(this.defaultHeaders, requestHeaders)
        let relay = await this.pocket.sendRelay(
            JSON.stringify(query),
            "algo",
            this.pocketAAT,
            this.pocket.configuration,
            headers,
            method,
            path
        )

        if (typeGuard(relay, RpcError)) {
            throw relay
        }

        return relay.payload
    }

    async post(path, query, requestHeaders = {}) {
        return await this.sendPocketRelay(requestHeaders, query, path, "post");
    }
}