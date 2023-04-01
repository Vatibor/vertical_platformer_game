class CollisionBlock {
	constructor({position, height = 16}) {
		this.position = position
        // every collision tile is 16px width and height
        this.width = 16
        this.height = height
	}

	draw(){
        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

	update() {
		this.draw()
	}
}