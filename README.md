# Simple turn-based NFT browser game (buildspace project)
![Screenshot from 2022-06-22 21-01-51](https://user-images.githubusercontent.com/79326421/175116047-7fafd04c-cc86-4965-af97-831d390c0e23.png)
![Screenshot from 2022-06-22 20-58-55](https://user-images.githubusercontent.com/79326421/175115619-54d36348-a675-440c-82ea-6e8372d08e1c.png)


## Brief:

- I built this project following Buildspace course.(https://buildspace.so/)
- I used hardhat, ethers.js, IPFS (just on the client side), a Pinata node and deployed on Goerli testnet. (0xe1AcD126BcAE46BC41d02e8f888823BB4e7505E7)
- The goal of our game will be to destroy a boss.
- The boss (Sagat) has 10,000 HP(Hit/Health Points). What players do is when they start the game, they mint a character NFT (Genie/Shalaby/Pumpa) that has a certain amount of Attack Damage and HP. Players can order their character NFT to attack the boss and deal damage to it.
- The goal? Players need to work together to attack the boss and bring its HP down to 0. The catch? Every time a player hit the boss, the boss hits the player back! If the NFT's HP goes below 0, the player's NFT dies and they can't hit the boss anymore. Players can only have one character NFT in their wallet. Once the character's NFT dies, it's game over. That means many players need to join forces to attack the boss and kill it.
- The boss will not be an NFT. The boss’s data will just live on our smart contract.

- So, when a player goes to play the game:
  1) They'll connect their wallet.
  2) Our game will detect they don't have a character NFT in their wallet.
  3) We'll let them choose a character and mint their own character NFT to play the game. Each character NFT has its own attributes stored on the NFT directly like: HP, Attack Damage, the image of the character, etc. So, when the character's HP hits 0, it would say hp:0 on the NFT itself.

## Later To-Do:
~~- Show all the other players in the game!~~
- Add in critical hit chance: for example maybe there's a 5% chance that some of your characters hit for double the damage. Or maybe there's a 20% chance the boss's attack "misses" and the player gets away lucky!
- Upload images to README

## Check it on Vercel
(https://streetfighter-kappa.vercel.app/)
