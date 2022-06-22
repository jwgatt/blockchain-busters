const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["Chun-Li", "Ryu", "M.Bison", "Ken"],       // Names
        ["https://gateway.pinata.cloud/ipfs/QmTGHBNqd5MQxD66R6kcxyMxQUPDXD4ZQEB1FiH8U1HdZk", // Images
            "https://gateway.pinata.cloud/ipfs/QmXDU3WhrLyS15hxNCu3u55jyvnXsk5CbWbRGFNgoazv37",
            "https://gateway.pinata.cloud/ipfs/QmVescjtMJD7QqtpFZZqiTJ5VPJadcjGRR23eHG4zf43NH",
            "https://gateway.pinata.cloud/ipfs/QmXSERvAT5CGAJ4FtahzmFiLyYeazffrVFyxpZhpZGWVqz"
        ],
        [100, 200, 300, 400],                    // HP values
        [100, 50, 25, 10],                       // Attack damage values
        "Sagat",
        "https://gateway.pinata.cloud/ipfs/QmTdXMNRcGHUEMjSUvfrMS21kwF7tgh6tRccY4ge8CWwxh",
        10000,
        50
    );

    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
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