document.addEventListener("DOMContentLoaded", () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert=document.querySelector('#alert');
    let position = 0;
    let isJumping = false;
    let gravity = 0.9;
    let count = 0;
  let isGameOver = false;
    function control(e) {
      if (e.keyCode === 32) {
        console.log('key pressed');
        if (!isJumping) {
          jump();
        }
      }
    }
  
    document.addEventListener('keydown', control);
  
    function jump() {
      isJumping = true;
      let timerId = setInterval(function () {
        // move up
        console.log('up');
        position += 30;
        count++;
        position *= gravity;
        dino.style.bottom = position + 'px';
  
        if (count === 15) {
          clearInterval(timerId);
          console.log('down');
          let downTimerId = setInterval(function () {
            // move down
            console.log('down');
            if (count === 0) {
              clearInterval(downTimerId);
              isJumping = false;
            }
            position -= 5;
            count--;
            position *= gravity;
            dino.style.bottom = position + 'px';
  
            if (position <= 0) {
              clearInterval(downTimerId);
              isJumping = false;
            }
          }, 20);
        }
      }, 20);
    }
      // creating obstacles
    function generateObstacles(){
        let randomTime=Math.random()*4000;
        let obstaclePosition=900 
        const obstacle=document.createElement('div');
        
        if(!isGameOver){obstacle.classList.add('obstacle');}
        grid.appendChild(obstacle);
        obstacle.style.left=obstaclePosition + 'px';
        
        let timerId = setInterval(function () {
            if(obstaclePosition>0&&obstaclePosition<60&&position<60){
                clearInterval(timerId);
                alert.innerHTML='Game Over';
                isGameOver=true
                //remove all the obstacles
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }
            obstaclePosition-=10
            obstacle.style.left=obstaclePosition + 'px'

            
        },20)
        if(!isGameOver){setTimeout(generateObstacles,randomTime)}
  }
  generateObstacles()


  });