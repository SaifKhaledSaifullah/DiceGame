/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
init();


// click onf roll button
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying)
        {
            var dice=Math.floor((Math.random()*6)+1); 
   var currentPlayerScore=document.querySelector('#score-'+activePlayer).textContent;
    var img=document.querySelector('.dice');
    img.style.display='block';
    img.src='dice-'+dice+'.png';
    // Toggle player
    
    if(dice!==1)
        {
            // add score
            
           roundScore+=dice;
           document.querySelector('#current-'+activePlayer).textContent=roundScore;
        }else{
            // Toggle player
            nextPlayer();
            //console.log(activePlayer);
            
        }
        }
   
    
});

// Impletemnt Button Hold 
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying)
        {
           // Update CURRENT score to GLOBAL score
    scores[activePlayer]+=roundScore;
    // Update UI
    document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
    // Check if player won the game
    if(scores[activePlayer]>=100)
        {
            document.getElementById('name-'+activePlayer).textContent='Winner!'
            document.querySelector('.dice').style.display='none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying=false;
        }
    else{
        // Next Player
        nextPlayer();
    } 
        }
    
    
    
});

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer(){
    // Toggle player
            activePlayer===0?activePlayer=1:activePlayer=0;
            roundScore=0;
            document.getElementById('current-0').textContent='0';
            document.getElementById('current-1').textContent='0';
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
    document.querySelector('.dice').style.display='none'; 
    document.getElementById('score-0').textContent=0;
    document.getElementById('score-1').textContent=0;
    document.getElementById('current-0').textContent=0;
    document.getElementById('current-1').textContent=0;
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    scores=[0, 0];
    roundScore=0;
    activePlayer=0;  // 0 for player1 and 1 for player2
    gamePlaying=true;
}
