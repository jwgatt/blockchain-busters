const CONTRACT_ADDRESS = '0xB7251885903Ab64Dafa11F02D8c41bff92bFFcDD'

const transformCharacterData = (characterData) => {
    return {
        name: characterData.name,
        imageURI: characterData.imageURI,
        hp: characterData.hp.toNumber(),
        maxHp: characterData.maxHp.toNumber(),
        attackDamage: characterData.attackDamage.toNumber(),
    }
}
export { CONTRACT_ADDRESS, transformCharacterData }