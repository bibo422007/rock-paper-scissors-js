 let score=JSON.parse(localStorage.getItem('score'))||
      {
        Wins:0,
        Losses:0,
        Ties:0
      };
      updatedscore();
      document.querySelector('.rock-move-button').addEventListener('click',()=>{playerplaymode('Rock');})
      document.querySelector('.paper-move-button').addEventListener('click',()=>{playerplaymode('Paper');})
      document.querySelector('.scissors-move-button').addEventListener('click',()=>{playerplaymode('Scissors');})
      document.querySelector('.reset-button').addEventListener('click',()=>{ reset();
        score.Wins=0;
        score.Losses=0;
        score.Ties=0;
        updatedscore();
        localStorage.removeItem('score');})
      document.querySelector('.autoplay-button').addEventListener('click',()=>{interval();
              change();});
      document.body.addEventListener('keydown',(event)=>{
        if(event.key==='r')
          playerplaymode('Rock');
        else if(event.key==='p')
          playerplaymode('Paper');
        else if(event.key==='s')
        {
          playerplaymode('Scissors');
        }

      })
      function playerplaymode(playmode)
      {
        const computermode=computerplaymode();
        let result='';
        if(playmode==='Rock')
        {
          if(computermode===playmode) 
          {
            result='Tie';
          }
          else if(computermode==='scissors')
          {
            result='You win!';
          }
          else
          {
            result='You lose!';
          }
        }
        else if(playmode==='Paper')
        {
          if(computermode===playmode) 
          {
            result='Tie';
          }
          else if(computermode==='scissors')
          {
            result='You lose!';
          }
          else
          {
            result='You win!';
          }
        }
        else
        {
          if(computermode===playmode) 
          {
            result='Tie';
          }
          else if(computermode==='paper')
          {
            result='You win!';
          }
          else
          {
            result='You lose!';
          }
        }
        if(result==='You win!')
        {
          score.Wins++;
        }
        else if(result==='You lose!')
        {
          score.Losses++;
        }
        else
        {
          score.Ties++;
        }
        
        localStorage.setItem('score',JSON.stringify(score));
       updatedscore();
       document.querySelector('.js-result').innerHTML=result;
      document.querySelector('.js-move').innerHTML=`You<img class="move-img" src="pics/${playmode}-emoji.png"><img class="move-img" src="pics/${computermode}-emoji.png">Computer`;
      }
      
      
      function computerplaymode()
      {
        let computermove='';
        const rand=Math.random();
        if(rand>=0 && rand< 1/3 )
        {
        computermove='rock';
        }
        else if(rand>=1/3 && rand< 2/3)
        {
          computermove='paper';
        }
        else
        {
          computermove='scissors'; 
        }
        return computermove;
      }
      function updatedscore()
      {
        document.querySelector('.js-score').innerHTML=`
Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
      }
let autoplay=false;
let intervalid;
function interval()
{ 
  const play=document.querySelector('.autoplay-button');
  if(autoplay===false)
  {
  intervalid=setInterval(() =>
  {
    const computemove=computerplaymode();
    playerplaymode(computemove);
  },1000);
  autoplay=true;
   play.innerHTML='Stop Play';
  }
  else
  {
    clearInterval(intervalid);
    autoplay=false;
    play.innerHTML='Auto Play';
  }

}
function reset()
{
  
    document.querySelector('.js-result').innerHTML='';
    document.querySelector('.js-move').innerHTML='';
  
}

