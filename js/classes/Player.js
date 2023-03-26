class Player extends Sprite{
	constructor({position, collisionBlocks, imageSrc, frameRate, scale = 0.5}){
		super({imageSrc, frameRate, scale})
		this.position = position
		this.velocity = {x:0,y:1}
		this.collisionBlocks = collisionBlocks
	}

	// draw() {
	// 	c.fillStyle = 'red'
	// 	c.fillRect(this.position.x, this.position.y, this.width, this.height)
	// }

	update() {
		this.updateFrames()
		c.fillStyle = 'rgba(0,255,0,0.2)'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
		this.draw()
		this.position.x += this.velocity.x
		this.checkForHorizontalCollisions()
		this.applyGravity()
		this.checkForVerticalCollisions()
	}
	
	checkForHorizontalCollisions(){
		// loop for the collision blocks
		for(let i=0; i<this.collisionBlocks.length; i++){
			const collisionBlock = this.collisionBlocks[i]
			// detect collision between the player and the collision block
			if(
				collision({
					object1: this,
					object2: collisionBlock,
				})
			) {
				// left
				if (this.velocity.x > 0) {
					this.velocity.x = 0
					this.position.x = collisionBlock.position.x - this.width - 0.01
					break
				}

				// right
				if (this.velocity.x < 0) {
					this.velocity.x = 0
					this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
					break
				}
			}
		}
	}

	applyGravity(){
		this.position.y += this.velocity.y
		this.velocity.y += gravity
	}

	checkForVerticalCollisions(){
		for(let i=0; i<this.collisionBlocks.length; i++){
			const collisionBlock = this.collisionBlocks[i]
			
			if(
				collision({
					object1: this,
					object2: collisionBlock,
				})
			) {
				// if currently falling down
				if (this.velocity.y > 0) {
					this.velocity.y = 0
					this.position.y = collisionBlock.position.y - this.height - 0.01
					break
				}

				// if it hits its head into the bottom of the collision block
				if (this.velocity.y < 0) {
					this.velocity.y = 0
					this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
					break
				}
			}
		}
	}
}