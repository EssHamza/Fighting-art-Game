const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7;

class Character {
    constructor({position, velocity,color = 'red',offset}){
        this.position = position 
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackWeapon = {
            position : {
                x : this.position.x,
                y : this.position.y
            } ,
            offset,
            width : 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
        
    }

    drawing(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        //attack weapon
        if(this.isAttacking){
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.attackWeapon.position.x,this.attackWeapon.position.y,this.attackWeapon.width,this.attackWeapon.height)

        }
    }

    update(){
     this.drawing()
     this.attackWeapon.position.x = this.position.x + this.attackWeapon.offset.x
     this.attackWeapon.position.y = this.position.y

     this.position.x += this.velocity.x
     this.position.y += this.velocity.y

     if(this.position.y + this.height + this.velocity.y  >= canvas.height){
        this.velocity.y = 0
        
     }else{
         this.velocity.y += gravity;
     } 
  }
  attack(){
      this.isAttacking = true;
      setTimeout(()=>{
         this.isAttacking = false
      },100)
  }
}

//player 
const player = new Character ({
    position : {
        x: 0,
        y: 0
 },
    velocity : { 
        x: 0,
        y: 10
},
offset : {
    x : 0 , 
    y : 0
}
})



 //enemy form

 const enemy = new Character ({
    position : {
        x: 400,
        y: 100
 },
    velocity : { 
        x: 0,
        y: 0
},
offset : {
    x : -50 , 
    y : 0
},
color: 'blue'
})

 const keys = {
     a : {
        pressed : false 
     },
     d : {
        pressed : false 
     },
     w : {
         pressed : false
     },
     ArrowRight : {
        pressed : false
     },
     ArrowLeft : {
        pressed : false
     }
 }


function rectangularCollision({
    rectangle1,
    rectangle2
}){
    return (
        rectangle1.attackWeapon.position.x +rectangle1.attackWeapon.width >= rectangle2.position.x 
        && rectangle1.attackWeapon.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.attackWeapon.position.y + rectangle1.attackWeapon.height >= rectangle2.position.y
        && rectangle1.attackWeapon.position.y <= rectangle2.position.y + rectangle2.height 
        && rectangle1.isAttacking
    )
}
let timer = 10
function decrese(){
setTimeout(decrese,1000)
    if(timer > 0){
    timer--
    document.querySelector("#timer").innerHTML= timer
   }

    if ( timer === 0 ){
    document.querySelector('#display').style.display = 'flex'
    
      if(player.health === enemy.health){
       console.log('tiee')
        document.querySelector('#display').innerHTML = 'Tie'
    } else if ( player.health > enemy.health){
        document.querySelector('#display').innerHTML = 'Player Wins'
    } else if ( player.health < enemy.health){
        document.querySelector('#display').innerHTML = 'Enemy Wins'

    }
  }
}
decrese()
 function gameLoop(){
     window.requestAnimationFrame(gameLoop)
     ctx.fillStyle = 'black'
     ctx.fillRect(0,0,canvas.width ,canvas.height)
     player.update()
     enemy.update()

     player.velocity.x = 0
     enemy.velocity.x = 0

     //enemy movement
     if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }else if (keys.ArrowRight.pressed  && enemy.lastKey === 'ArrowRight' ){
       enemy.velocity.x = 5 
    }
     //player movement
     if(keys.a.pressed && player.lastKey === 'a'){
         player.velocity.x = -5
     }else if (keys.d.pressed  && player.lastKey === 'd' ){
        player.velocity.x = 5 
     }

     //detect collison

     if(
        rectangularCollision({
            rectangle1 :player,
            rectangle2 : enemy
        })
        && player.isAttacking){
            player.isAttacking = false
         console.log('wow')
         enemy.health -= 20
         document.querySelector("#enemyHealth").style.width = enemy.health + "%"
     }
     if(
        rectangularCollision({
            rectangle1 :enemy,
            rectangle2 : player
        })
        && enemy.isAttacking){
            enemy.isAttacking = false
         console.log('woww enemy attacks')
         player.health -= 20
         document.querySelector("#playerHealth").style.width = player.health + "%"

     }
    
 }

 gameLoop();

 window.addEventListener('keydown',(event) => {
    
    switch(event.key){
        case 'd' : 
        keys.d.pressed = true
        player.lastKey = 'd'
        break 
        case 'q' : 
        keys.a.pressed = true
        player.lastKey = 'a'
        break
        case 'w' : 
        player.velocity.y = -20
        break
        case ' ' : 
        player.attack()
        break
        case 'ArrowRight' : 
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break 
        case 'ArrowLeft' : 
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp' : 
        enemy.velocity.y = -20
        break
        case 'ArrowDown' : 
        enemy.attack()
        break
    }
    console.log(event.key)
 })
 window.addEventListener('keyup',(event) => {
    switch(event.key){
        case 'd' : 
        keys.d.pressed = false
        break 
        case 'a' : 
        keys.a.pressed = false
        break  
        case 'w' : 
        keys.w.pressed = false
        lastKey = 'w'
        break

    }

    //enemy
    switch(event.key){
        case 'ArrowRight' : 
        keys.ArrowRight.pressed = false
        break 
        case 'ArrowLeft' : 
        keys.ArrowLeft.pressed = false
        break  
      

    }
    console.log(event.key)
 })
 // now i'm figuring out how to add actual art work for this game 
 //while learning nodejs and express
 //147 still on it 