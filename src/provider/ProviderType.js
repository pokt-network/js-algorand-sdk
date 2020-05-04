export class ProviderType {
    constructor(type = Type.ALGO, data = {}) {
        this.type = type
        this.data = data
    }
}

export const Type = {
    ALGO: 'ALGO',
    POCKET: 'POCKET'
}
