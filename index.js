const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7;

class Character {
    constructor({position, velocity,color = 'red'}){
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
            width : 100,
            height: 50
        }
        this.color = color
        this.isAttacking
    }

    drawing(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        //attack weapon
        //if(this.isAttacking){
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.attackWeapon.position.x,this.attackWeapon.position.y,this.attackWeapon.width,this.attackWeapon.height)

        //}
    }

    update(){
     this.drawing()
     this.attackWeapon.position.x = this.position.x -50
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

     //detect collistion

     if(player.attackWeapon.position.x +player.attackWeapon.width >= enemy.position.x 
        && player.attackWeapon.position.x <= enemy.position.x + enemy.width 
        && player.attackWeapon.position.y + player.attackWeapon.height >= enemy.position.y
        && player.attackWeapon.position.y <= enemy.position.y + enemy.height 
        && player.isAttacking){
            player.isAttacking = false
         console.log('wow')
     }
 }

 gameLoop();

 window.addEventListener('keydown',(event) => {
    
    switch(event.key){
        case 'd' : 
        keys.d.pressed = true
        player.lastKey = 'd'
        break 
        case 'a' : 
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