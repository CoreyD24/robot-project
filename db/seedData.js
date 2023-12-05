const client = require("./client")

    const dropTables = async() => {
        try{
            console.log(`Dropping tables...`)
            await client.query(`
            DROP TABLE IF EXISTS robot_tasks;
            DROP TABLE IF EXISTS robot_owners;
            DROP TABLE IF EXISTS tasks;
            DROP TABLE IF EXISTS owners;
            DROP TABLE IF EXISTS robots;`);
        } catch(error){
            console.log(error)
        }
    }

    const createTables = async() => {
    try{
        console.log(`Building tables...`)
        await client.query(`
        CREATE TABLE robots (
            id SERIAL PRIMARY KEY, 
            name VARCHAR (15) NOT NULL,
            model VARCHAR (15) UNIQUE NOT NULL,
            company VARCHAR (30) NOT NULL,
            img VARCHAR (255) NOT NULL,
            warranty_months INT NOT NULL,
            child_safe BOOLEAN NOT NULL,
            release_date DATE NOT NULL
            );
        CREATE TABLE owners (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR (30) NOT NULL,
            last_name VARCHAR (30) NOT NULL,
            email VARCHAR(30) UNIQUE NOT NULL
        );
        CREATE TABLE tasks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL
        );
        CREATE TABLE robot_owners (
            robot_id INT NOT NULL,
            owner_id INT NOT NULL
        );
        CREATE TABLE robot_tasks (
            robot_id INT NOT NULL,
            task_id INT NOT NULL
        );
            `);
    }
    catch (error){
        console.log(error)
    }
}

const createInitialData = async() => {
    try {
        console.log(`Creating initial data...`)
        await client.query(`
        INSERT INTO robots (name, model, company, img, warranty_months, child_safe, release_date)
        VALUES 
        ('Jimbo', 'B650', 'Amazon', 'https://m.media-amazon.com/images/I/61pt2leRDZS._AC_SL1500_.jpg', 24, true, 'January 1, 2024')`
        );
        await client.query(`
        INSERT INTO owners (first_name, last_name, email)
        VALUES
        ('Elon', 'Musk', 'elonmusk@tesla.com')`
        );
        await client.query(`
        INSERT INTO tasks (name)
        VALUES 
        ('wash dishes')`
        );
    } catch (error) {
        console.log(error)
    }
}

const rebuildDB = async() => {
    try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
    console.log(`Rebuild Complete`)
    client.end();
    }
    catch (error) {
        console.log(error)
}}
rebuildDB();