function ProviderType(type = Type.ALGO, data = {}) {
    this.type = type
    this.data = data
}

module.exports = { ProviderType };

const Type = {
    ALGO: 'ALGO',
    POCKET: 'POCKET'
}

module.exports = { Type };
