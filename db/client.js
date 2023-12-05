const { Client } = require('pg');

const connection = process.env.DATABASE_URL|| 'postgres://postgres:password@localhost:5432/robot_project'
const client = new Client(connection) 
module.exports = client; 