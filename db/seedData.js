const client = require("./client");
const createRobotOwners = require("./robotOwners");
const createRobotTasks = require("./robotTasks");

    const dropTables = async() => {
        try{
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
            robot_id INT REFERENCES robots(id) NOT NULL,
            owner_id INT REFERENCES owners(id) NOT NULL
        );
        CREATE TABLE robot_tasks (
            robot_id INT REFERENCES robots(id) NOT NULL,
            task_id INT REFERENCES tasks(id) NOT NULL
        );
        `);
    }
    catch (error){
        console.log(error)
    }
}

const createInitialData = async() => {
    try {
        await client.query(`
        INSERT INTO robots (name, model, company, img, warranty_months, child_safe, release_date)
        VALUES 
        ('Jimbo', 'B650', 'Amazon', 'https://m.media-amazon.com/images/I/61pt2leRDZS._AC_SL1500_.jpg', 24, true, 'January 1, 2024'),
        ('Roger', 'T-598', 'Tesla', 'https://hasbropulse.com/cdn/shop/products/F5526_PROD_SW_BL_ALEXANDRIA_369_Online_2000SQ_2000x.jpg?v=1651684256', 6, false, 'January 1, 2050'),
        ('Artoo', 'R2-D2', 'Industrial Automation', 'https://api.time.com/wp-content/uploads/2017/12/r2d2.jpg', 3600, true, 'January 1, 3500'),
        ('DJ Roomba', 'VH-651', 'iRobot', 'https://static.wikia.nocookie.net/parksandrecreation/images/e/e5/DJ_Roomba_goes_camping.jpg/revision/latest?cb=20131031044858', 6, true, 'February 4, 2010')`
        );
        await client.query(`
        INSERT INTO owners (first_name, last_name, email)
        VALUES
        ('Elon', 'Musk', 'elonmusk@tesla.com'),
        ('Jeff', 'Bezos', 'jeffbezos@amazon.com'),
        ('Padme', 'Amidala', 'padmeadmidala@naboo.com')`
        );
        await client.query(`
        INSERT INTO tasks (name)
        VALUES 
        ('wash dishes'),
        ('read'),
        ('walk the dog'),
        ('vacuum floors')`
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
    
    await createRobotOwners(1, 1);
    await createRobotOwners(2, 2);
    await createRobotOwners(3, 3);
    await createRobotOwners(4, 1);
    await createRobotOwners(4, 2);
    await createRobotOwners(4, 3);

    await createRobotTasks (1, 1);
    await createRobotTasks (2, 2);
    await createRobotTasks (3, 3);
    await createRobotTasks (4, 4);

    console.log(`Rebuild Complete`)
    client.end();
    }
    catch (error) {
        console.log(error)
}}
rebuildDB();