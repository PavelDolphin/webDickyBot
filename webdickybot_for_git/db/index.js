var pgp = require("pg-promise")();

connectionString = 'postgres://ujhgllpfvusktc:65b26b5fa63596176621b246cc3a743618861270c424beafae4825cb6ce23d78@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/d9ide2k9uqbf63';

const config = { 
    connectionString,         
    max: 20,         
    ssl: { rejectUnauthorized: false } 
};


const db = pgp(config);
 
module.exports = db;
