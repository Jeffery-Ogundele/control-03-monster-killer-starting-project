let chosenMaxLife = 100;
let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;
let hasBonusHealth = true;

const ATTACK_VALUE = 10;
const MONSTER_ATTACK = 30;
const STRONG_ATTACK_VALUE = 30;
const HEAL_VALUE = 25;
adjustHealthBars(chosenMaxLife);
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
}

function resultCondition(attackHits) {
  //I created this function and did the necessary before he discussed it :)
  let maxDamge;
  if (attackHits === "ATTACK") {
    maxDamge = ATTACK_VALUE;
  } else if (attackHits === "STRONG ATTACK") {
    maxDamge = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamge);
  currentMonsterLife -= damage;
  endRound();
}

function attackHandler() {
  resultCondition("ATTACK");
}

function strongAttackHandler() {
  resultCondition("STRONG ATTACK");
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
