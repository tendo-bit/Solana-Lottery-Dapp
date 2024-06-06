import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import style from "../styles/PotCard.module.css";
import { useAppContext } from "../context/context";
import { shortenPk } from "../utils/helper";
import { Toaster } from 'react-hot-toast';

// Temp imports
import { PublicKey } from '@solana/web3.js';
import { useState } from "react"

const PotCard = () => {
  const {
    connected,
    isMasterInitialized,
    lotteryId,
    lotteryPot,
    isLotteryAuthority,
    isFinished,
    canClaim,
    initMaster,
    createLottery,
    buyTicket,
    lotteryHistory,
    pickWinner,
  }=useAppContext();
  console.log(canClaim,"CLAIM STTUS")


  // Static Functions 
  const claimPrize = () => {
    setCanClaim(false)
    console.log("You're the winner! Claiming your prize now...")
  }

  if (!isMasterInitialized)
    return (
      <div className={style.wrapper}>
        <div className={style.title}>
          lottery <span className={style.textAccent}>#{lotteryId}</span>
        </div>
        {connected ? (
          <>
            <div className={style.btn} onClick={initMaster}>
              Initialize master
            </div>
          </>
        ) : (
          // Wallet multibutton goes here
          <WalletMultiButton/>
        )}
      </div>
    );

  return (
    <div className={style.wrapper}>
      <Toaster />
      <div className={style.title}>
        Lottery <span className={style.textAccent}>#{lotteryId}</span>
      </div>
      <div className={style.pot}>Pot 🍯: {lotteryPot} SOL</div>
      <div className={style.recentWinnerTitle}>🏆Recent Winner🏆</div>
      <div className={style.winner}>
        {lotteryHistory?.length &&
          shortenPk(
            lotteryHistory[lotteryHistory.length - 1].winnerAddress.toBase58()
          )}
      </div>
      {connected ? (
        <>
          {!isFinished && (
            <div className={style.btn} onClick={buyTicket}>
              Enter
            </div>
          )}

          {isLotteryAuthority && !isFinished && (
            <div className={style.btn} onClick={pickWinner}>
              Pick Winner
            </div>
          )}

          {canClaim && (
            <div className={style.btn} onClick={claimPrize}>
              Claim prize
            </div>
          )}

          <div className={style.btn} onClick={createLottery}>
            Create lottery
          </div>
        </>
      ) : (
        <WalletMultiButton/>
      )}
    </div>
  );
};

export default PotCard;