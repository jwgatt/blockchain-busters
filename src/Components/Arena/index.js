import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';
import './Arena.css';
import LoadingIndicator from '../LoadingIndicator';

/*
 * We pass in our characterNFT metadata so we can show a cool card in our UI
 */
const Arena = ({ characterNFT, setCharacterNFT }) => {

    // State
    const [gameContract, setGameContract] = useState(null);
    const [boss, setBoss] = useState(null)
    const [attackState, setAttackState] = useState('')
    const [showToast, setShowToast] = useState(false)

    const runAttackAction = async () => {
        try {
            if (gameContract) {
                setAttackState('attacking');
                console.log('Attacking boss...');
                const attackTxn = await gameContract.attackBoss();
                await attackTxn.wait();
                console.log('attackTxn:', attackTxn);
                setAttackState('hit');

                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)

                }, 5000);
            }
        } catch (error) {
            console.error('Error attacking boss:', error);
            setAttackState('');
        }
    };

    // UseEffects
    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                myEpicGame.abi,
                signer
            );

            setGameContract(gameContract);
        } else {
            console.log('Ethereum object not found');
        }
    }, []);


    // Fetch all playing characters

    // Set state variables
    const [characters, setCharacters] = useState([])


    useEffect(() => {
        const fetchActivePlayerList = async () => {
            try {
                console.log('Getting contract characters to mint')

                // wait for gameContract to return getAllPlayers function
                const charactersTxn = await gameContract.getAllPlayers()
                console.log('charactersTxn;', charactersTxn)

                // Map over returned function data
                const characters = charactersTxn.map((characterData) => transformCharacterData(characterData))
                setCharacters(characters)
            } catch (error) {
                console.log('something went wrong finding characters:', error)
            }
        }

        const fetchBoss = async () => {
            const bossTxn = await gameContract.getBigBoss()
            console.log('Boss;', bossTxn)
            setBoss(transformCharacterData(bossTxn))
        }
        // Setup logic when this event is fired off

        const onAttackComplete = (setCharacterNFT, newBossHp, newPlayerHp) => {
            const bossHp = newBossHp.toNumber()
            const playerHp = newPlayerHp.toNumber()

            console.log(`Attack complete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`)

            // If player is our own, update both player and boss Hp

            setBoss((prevState) => {
                return { ...prevState, hp: bossHp };
            });

            setCharacterNFT((prevState) => {
                return { ...prevState, hp: playerHp };
            });
        };

        if (gameContract) {
            fetchBoss();
            gameContract.on("AttackComplete", onAttackComplete);
        }
        fetchActivePlayerList();

        //   Make sure to clean up this event when this component is removed

        return () => {
            if (gameContract) {
                gameContract.off("AttackComplete", onAttackComplete);
            }
        };
    }, [gameContract]);

    const renderActivePlayerList = () =>
        characters.map((character, index) => (
            <div key={index} className="player">
                <div className='image-content'>
                    <h2>{character.name}</h2>
                    <img
                        src={`${characterNFT.imageURI}`}
                        alt={`Character ${character.name}`}
                    />
                    <div className="health-bar">
                        <progress value={character.hp} max={character.maxHp} />
                        <p>{`${character.hp} / ${character.maxHp} HP`}</p>
                    </div>
                    <div className='stats'>
                        <h4>
                            {`⚔️ Attack Damage: ${character.attackDamage}`}
                        </h4>
                    </div>
                </div>
            </div>
        ))

    return (
        <div className="arena-container">
            {boss && characterNFT && (
                <div id="toast" className={showToast ? 'show' : ''}>
                    <div id="desc">{`💥 ${boss.name} was hit for ${characterNFT.attackDamage}!`}</div>
                </div>
            )}
            {/* Boss */}
            {boss && (
                <div className="boss-container">
                    <div className={`boss-content ${attackState}`}>
                        <h2>🔥 {boss.name} 🔥</h2>
                        <div className="image-content">
                            <img src={boss.imageURI} alt={`Boss ${boss.name}`} />
                            <div className="health-bar">
                                <progress value={boss.hp} max={boss.maxHp} />
                                <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="attack-container">
                        <button className="cta-button" onClick={runAttackAction}>
                            {`💥 Attack ${boss.name}`}
                        </button>
                    </div>
                    {attackState === 'attacking' && (
                        <div className="loading-indicator">
                            <LoadingIndicator />
                            <p>Attacking</p>
                        </div>
                    )}
                </div>
            )}

            {characterNFT && (
                <div className="players-container">
                    <div className="player-container">
                        <h2>Your Character</h2>
                        <div className="player">
                            <div className="image-content">
                                <h2>{characterNFT.name}</h2>
                                <img
                                    src={characterNFT.imageURI}
                                    alt={`Character ${characterNFT.name}`}
                                />
                                <div className="health-bar">
                                    <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                                    <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
                                </div>
                            </div>
                            <div className="stats">
                                <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
                            </div>
                        </div>
                        <h2>Active Players</h2>
                        <div className='player-container'>{renderActivePlayerList()}</div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Arena;