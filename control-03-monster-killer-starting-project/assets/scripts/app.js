const enteredValue = prompt(
  "Choose the maximum life for you and the monster",
  "100"
);
let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;
let hasBonusHealth = true;

let battleLog = [];

const ATTACK_VALUE = 10;
const MONSTER_ATTACK = 30;
const STRONG_ATTACK_VALUE = 30;
const HEAL_VALUE = 25;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG ATTACK";
const LOG_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_PLAYER_STRONG_ATTACK = "PLAYER_STRONG ATTACK";
const LOG_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_GAME_OVER = "GAME_OVER";

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value) {
  let logEntries = {
    event: event,
    value: value,
    finalMonsterHealth: currentMonsterLife,
    finalPlayerHealth: currentPlayerLife,
  };

switch (event) {
    case LOG_PLAYER_ATTACK:
        logEntries.target = 'MONSTER';
        break;
    case LOG_PLAYER_STRONG_ATTACK:
        logEntries.target = 'MONSTER';
        break;
    case LOG_MONSTER_ATTACK:
        logEntries.target = 'PLAYER';
        break;
    case LOG_PLAYER_HEAL:
        logEntries.target = "PLAYER";
    case LOG_GAME_OVER:
        break;
        default:
            logEntry = {};    
}

//   if (event === LOG_PLAYER_ATTACK) {
//     logEntry.target = 'MONSTER'
     
//   } else if (event === LOG_PLAYER_STRONG_ATTACK) {
//     logEntries = {
//       event: event,
//       value: value,
//       target: "MONSTER",
//       finalMonsterHealth: currentMonsterLife,
//       finalPlayerHealth: currentPlayerLife,
//     };
//   } else if (event === LOG_MONSTER_ATTACK) {
//     logEntries = {
//       event: event,
//       value: value,
//       target: "PLAYER",
//       finalMonsterHealth: currentMonsterLife,
//       finalPlayerHealth: currentPlayerLife,
//     };
//   } else if (event === LOG_PLAYER_HEAL) {
//     logEntries = {
//       event: event,
//       value: value,
//       target: "PLAYER",
//       finalMonsterHealth: currentMonsterLife,
//       finalPlayerHealth: currentPlayerLife,
//     };
//   } else if (event === LOG_GAME_OVER) {
//     logEntries = {
//       event: event,
//       value: value,
//       finalMonsterHealth: currentMonsterLife,
//       finalPlayerHealth: currentPlayerLife,
//     };
//   }
  battleLog.push(logEntries);
}

function reset() {
  currentMonsterLife = chosenMaxLife;
  currentPlayerLife = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerLife;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
  currentPlayerLife -= playerDamage;
  writeToLog(
    LOG_MONSTER_ATTACK,
    playerDamage,
    currentMonsterLife,
    currentPlayerLife
  );
  if (currentPlayerLife <= 0 && hasBonusHealth) {
    hasBonusHealth = false;
    removeBonusLife();
    currentPlayerLife = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("Saved by the bonus life");
  }
  if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
    alert("You won!");
    writeToLog(LOG_GAME_OVER, "You won", currentMonsterLife, currentPlayerLife);
  } else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
    alert("You Lost!");
    writeToLog(
      LOG_GAME_OVER,
      "You lost",
      currentMonsterLife,
      currentPlayerLife
    );
  } else if (currentMonsterLife <= 0 && currentPlayerLife <= 0) {
    alert("Its a draw!");
    writeToLog(
      LOG_GAME_OVER,
      "Its a draw",
      currentMonsterLife,
      currentPlayerLife
    );
  }

  if (currentMonsterLife <= 0 || currentPlayerLife <= 0) {
    reset();
  }
}

function resultCondition(attackHits) {
  //I created this function and did the necessary before he discussed it :)
  let maxDamge =
    attackHits === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEntry =
    attackHits === MODE_ATTACK ? LOG_PLAYER_ATTACK : LOG_PLAYER_STRONG_ATTACK;
  //   if (attackHits === MODE_ATTACK) {
  //     maxDamge = ATTACK_VALUE;
  //     logEntry = LOG_PLAYER_ATTACK;
  //   } else if (attackHits === MODE_STRONG_ATTACK) {
  //     maxDamge = STRONG_ATTACK_VALUE;
  //     logEntry = LOG_PLAYER_STRONG_ATTACK;
  //   }

  const damage = dealMonsterDamage(maxDamge);
  currentMonsterLife -= damage;
  writeToLog(logEntry, damage, currentMonsterLife, currentPlayerLife);
  endRound();
}

function attackHandler() {
  resultCondition(MODE_ATTACK);
}

function strongAttackHandler() {
  resultCondition(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerLife >= chosenMaxLife - HEAL_VALUE) {
    alert("You cant't heal to more than your initial health");
    healValue = chosenMaxLife - currentPlayerLife;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerLife += healValue;
  writeToLog(LOG_PLAYER_HEAL, healValue, currentMonsterLife, currentPlayerLife);
  endRound();
}
function logEventHandler() {
  console.log(battleLog);
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", logEventHandler);
