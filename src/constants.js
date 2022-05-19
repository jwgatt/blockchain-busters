const CONTRACT_ADDRESS = '0x04a55e728Ef6856dC5f0924944086802b5f64Dc2'

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