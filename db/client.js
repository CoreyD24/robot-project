const { Client } = require('pg');
const client = new Client('postgres://postgres:password@localhost:5432/robot_project')

module.exports = client; 