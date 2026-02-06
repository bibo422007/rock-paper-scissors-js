  let score=JSON.parse(localStorage.getItem('score'))||
      {
        Wins:0,
        Losses:0,
        Ties:0
      };
      updatedscore();
      document.querySelector('.rock-move-button').addEventListener('click',()=>{playerplaymode('rock');})
      document.querySelector('.paper-move-button').addEventListener('click',()=>{playerplaymode('paper');})
      document.querySelector('.scissors-move-button').addEventListener('click',()=>{playerplaymode('scissors');})
      document.querySelector('.reset-button').addEventListener('click',()=>{ confirmreset();
       })
      document.querySelector('.autoplay-button').addEventListener('click',()=>{autoplay();});
      document.body.addEventListener('keydown',(event)=>{
        if(event.key==='r')
          playerplaymode('rock');
        else if(event.key==='p')
          playerplaymode('paper');
        else if(event.key==='s')
        {
          playerplaymode('scissors');
        }
        else if(event.key==='a')
        {
          autoplay();
        }
        else if(event.key==='Backspace')
        {
          confirmreset();
        }
      })
      function playerplaymode(playmode)
      {
        const computermode=computerplaymode();
        let result='';
        if(playmode==='rock')
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
        else if(playmode==='paper')
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
let auto=false;
let intervalid;
function autoplay()
{ 
  const play=document.querySelector('.autoplay-button');
  if(auto===false)
  {
  intervalid=setInterval(() =>
  {
    const computemove=computerplaymode();
    playerplaymode(computemove);
  },1000);
  auto=true;
   play.innerHTML='Stop Play';
  }
  else
  {
    clearInterval(intervalid);
    auto=false;
    play.innerHTML='Auto Play';
  }
}
function reset()
{
    document.querySelector('.js-result').innerHTML='';
    document.querySelector('.js-move').innerHTML='';
    score.Wins=0;
    score.Losses=0;
    score.Ties=0;
    updatedscore();
    localStorage.removeItem('score');
    document.querySelector('.js-confirm-reset').innerHTML='';
}
function confirmreset()
{
  document.querySelector('.js-confirm-reset').innerHTML=`<p class="confirm-text">Are you sure you want to reset the score?<button class="confirm">Yes</button>
  <button class="do-nothing">No</button></p>`
  document.querySelector('.confirm').addEventListener('click',()=>{
  reset();
  hidemessage();})
  document.body.addEventListener('keydown',(event)=>{
    if(event.key==='y')
    {
      reset();
      hidemessage();
    }
  })
  document.querySelector('.do-nothing').addEventListener('click',()=>{hidemessage();})
  document.body.addEventListener('keydown',(event)=>{
    if(event.key==='n')
      hidemessage();
    })
}
function hidemessage()
{
  document.querySelector('.js-confirm-reset').innerHTML='';
}