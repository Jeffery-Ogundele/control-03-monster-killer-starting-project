let chosenMaxLife  = 100;
let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife

const ATTACK_VALUE =  10;
const MONSTER_ATTACK = 14;
const STRONG_ATTACK_VALUE =20

adjustHealthBars(chosenMaxLife)

function resultCondition (attackHits) {
    //I created this function and did the necessary before he discussed it :)
    let maxDamge;
    if (attackHits === 'ATTACK') {
        maxDamge = ATTACK_VALUE;
    } else if (attackHits === 'STRONG ATTACK') {
        maxDamge = STRONG_ATTACK_VALUE;
    }
    if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
        alert( 'You won!');
       } else if (currentPlayerLife<= 0 && currentMonsterLife > 0
        ) {
        alert ('You Lost!');
       } else if(currentMonsterLife <= 0 && currentPlayerLife <= 0 ) {
        alert('Its a draw!');
       }
    const damage = dealMonsterDamage(maxDamge);
       currentMonsterLife -= damage;
       const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
       currentPlayerLife -= playerDamage;
       
}
   
    


function attackHandler () {
    resultCondition( 'ATTACK');
    
}

function strongAttackHandler ()   {
    resultCondition('STRONG ATTACK');
 

}
attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)