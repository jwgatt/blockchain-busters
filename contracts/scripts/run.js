const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["Chun-Li", "Blanca", "E,Homda", "Ken"],       // Names
        ["https://static.wikia.nocookie.net/capcomdatabase/images/1/1b/Chun-Li_2.png/revision/latest/scale-to-width-down/1000?cb=20190226213609", // Images
            "https://static.wikia.nocookie.net/capcomdatabase/images/6/6c/SFII_Blanka_Art.png/revision/latest/scale-to-width-down/1000?cb=20190226015154",
            "https://static.wikia.nocookie.net/capcomdatabase/images/c/cc/E_Honda.png/revision/latest/scale-to-width-down/1000?cb=20190226222000",
            "https://static.wikia.nocookie.net/capcomdatabase/images/4/4f/SFIII3rdKen.png/revision/latest/scale-to-width-down/1000?cb=20190226220148"
        ],
        [100, 200, 300, 400],                    // HP values
        [100, 50, 25, 10],                       // Attack damage values
        "elon musk",
        "https://i.imgur.com/aksr0tt.png",
        10000,
        50
    );

    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);


    let txn;
    txn = await gameContract.mintCharacterNFT(0);
    await txn.wait();
    console.log("Minndted NFT #1");

    txn = await gameContract.mintCharacterNFT(1)
    await txn.wait();
    console.log("Mindted NFT #2")

    txn = await gameContract.mintCharacterNFT(2)
    await txn.wait();
    console.log("Mindted NFT #3")

    txn = await gameContract.mintCharacterNFT(3)
    await txn.wait();
    console.log("Mindted NFT #4")

    console.log("Done deploying and mining!")
};

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
};

runMain();