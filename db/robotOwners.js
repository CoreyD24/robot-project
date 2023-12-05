const client = require("./client")

const createRobotOwners = async(robotId, ownerId)=> {
    try {
        const{ rows: [robotOwners]} = await client.query(`
        INSERT INTO robot_owners (robot_id, owner_id)
        VALUES (${robotId}, ${ownerId}) 
        RETURNING *;
        `)
        return robotOwners
    } catch (error) {
        console.log(error)
    }
}
module.exports = createRobotOwners