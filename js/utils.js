function collision({object1, object2}){
    return (
        // detect the player and the collision blocks will be touching eachother
		// bottom && up && left detect
        object1.position.y + object1.height >= object2.position.y &&
		object1.position.y <= object2.position.y + object2.height &&
		object1.position.x <= object2.position.x + object2.width &&
		object1.position.x + object1.width >= object2.position.x
    )
}