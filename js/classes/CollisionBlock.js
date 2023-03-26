class CollisionBlock {
	constructor({position, imageSrc}) {
		this.position = position
        // every collision tile is 16px width and height
        this.width = 16
        this.height = 16
	}

	draw(){
        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

	update() {
		this.draw()
	}
}