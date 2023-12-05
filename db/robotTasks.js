const client = require("./client")

const createRobotTasks = async(robotId, taskId)=> {
    try {
        const{ rows: [robotTasks]} = await client.query(`
        INSERT INTO robot_tasks (robot_id, task_id)
        VALUES (${robotId}, ${taskId}) 
        RETURNING *;
        `)
        return robotTasks
    } catch (error) {
        console.log(error)
    }
}
module.exports = createRobotTasks