const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0,0,canvas.width,canvas.height)

class Character {
    constructor(position){
        this.position = position 
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect()
    }
    

}

const player = new Character (
    {
        x:0,
        y:0
    }
)