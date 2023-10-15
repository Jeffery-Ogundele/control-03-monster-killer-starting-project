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

const ATTACK_VALUE = 10;
const MONSTER_ATTACK = 30;
const STRONG_ATTACK_VALUE = 30;
const HEAL_VALUE = 25;
const MODE_ATTACK = 'ATTACK'
const MODE_STRONG_ATTACK = 'STRONG ATTACK'
adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterLife = chosenMaxLife;
  currentPlayerLife = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerLife;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
  currentPlayerLife -= playerDamage;

  if (currentPlayerLife <= 0 && hasBonusHealth) {
    hasBonusHealth = false;
    removeBonusLife();
    currentPlayerLife = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("Saved by the bonus life");
  }
  if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
    alert("You won!");
  } else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
    alert("You Lost!");
  } else if (currentMonsterLife <= 0 && currentPlayerLife <= 0) {
    alert("Its a draw!");
  }

  if (currentMonsterLife <= 0 || currentPlayerLife <= 0) {
    reset();
  }
}

function resultCondition(attackHits) {
  //I created this function and did the necessary before he discussed it :)
  let maxDamge;
  if (attackHits === MODE_ATTACK) {
    maxDamge = ATTACK_VALUE;
  } else if (attackHits === MODE_STRONG_ATTACK) {
    maxDamge = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamge);
  currentMonsterLife -= damage;
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
  endRound();
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
