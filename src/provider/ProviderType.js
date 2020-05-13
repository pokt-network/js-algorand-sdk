let Type = require("./Type")

function ProviderType(type = Type.ALGO, data = {}) {
    this.type = type
    this.data = data
}

module.exports = { ProviderType };
