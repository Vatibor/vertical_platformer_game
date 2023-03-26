const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
	width: canvas.width / 4,
	height: canvas.height / 4
}

// We place the data in collision.js into two-dimensional arrays, resulting in a 
// 2D array of 27 arrays with 36 elements each. Our map consists of 36 columns and 27 rows.
const floorCollisions2D = []
for(let i = 0; i<floorCollisions.length; i+=36){
	floorCollisions2D.push(floorCollisions.slice(i, i+36))
}
// console.log(floorCollisions2D)

// "We iterate through the 2D array and if the symbol === 202, then we create a new 
// CollisionBlock object, whose position will be in one of the matrices with 27 rows 
// and 36 columns, and its size will be 16x16 pixels."
const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
	row.forEach((symbol, x) => {
		if(symbol === 202){
			// console.log('block here')
			collisionBlocks.push(new CollisionBlock({
				position: {x: x*16, y: y*16}
			}))
		}
	})
})

const platformCollisions2D = []
for(let i = 0; i<platformCollisions.length; i+=36){
	platformCollisions2D.push(platformCollisions.slice(i, i+36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
	row.forEach((symbol, x) => {
		if(symbol === 202){
			platformCollisionBlocks.push(new CollisionBlock({
				position: {x: x*16, y: y*16}
			}))
		}
	})
})


const gravity = 0.5




const player = new Player({
	position:{
		x:100,
		y:300
	},
	collisionBlocks,
	imageSrc: './img/warrior/Idle.png',
	frameRate: 8,
})

const keys = {
	d: { pressed: false },
	a: { pressed: false },
}

const background = new Sprite({
	position: {x:0,y:0},
	imageSrc: './img/background.png',
})

let y = 100
function animate() {
	window.requestAnimationFrame(animate)
	c.fillStyle = 'white'
	c.fillRect(0, 0, canvas.width, canvas.height)
	
	c.save()
	c.scale(4,4)
	c.translate(0,-background.image.height + scaledCanvas.height)
	background.update()
	// drawing the collision blocks
	collisionBlocks.forEach(collisionBlock => {
		collisionBlock.update()
	})

	platformCollisionBlocks.forEach(block => {
		block.update()
	})

	player.update()

	// check which key is being pressed
	player.velocity.x = 0
	if(keys.d.pressed) player.velocity.x = 5
	else if(keys.a.pressed) player.velocity.x = -5
	c.restore()
	
}

animate()

window.addEventListener('keydown', (event) => {
	// console.log(event)
	switch(event.key){
		case 'd':
			keys.d.pressed = true
			break
		case 'a':
			keys.a.pressed = true
			break
		case 'w':
			player.velocity.y = -8
			break
	}
})

window.addEventListener('keyup', (event) => {
	// console.log(event)
	switch(event.key){
		case 'd':
			keys.d.pressed = false
			break
		case 'a':
			keys.a.pressed = false
			break
	}
})