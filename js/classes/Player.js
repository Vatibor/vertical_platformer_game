class Player {
	constructor(position){
		this.position = position
		this.velocity = {x:0,y:1}
		this.height = 100
	}

	draw() {
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, 100, this.height)
	}

	update() {
		this.draw()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		
		// If the player reaches the bottom of the canvas, the velocity value will be set to 0 (it will stop falling)
		if (this.position.y + this.height + this.velocity.y < canvas.height)
			this.velocity.y += gravity
		else this.velocity.y = 0
	}
}