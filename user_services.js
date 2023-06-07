'use strict';

const sql = require('mssql');

const config = {
    server: '127.0.0.1', 
    database: 'eventmgr' ,
    user: 'appuser',
    password: 'password',
    options: {
        encrypt: false,
        enableArithAbort: true
    },
    port: 1433
};

const getUsers = async () => {
    try {
        let pool = await sql.connect(config);
        const query = 'SELECT [id],[username],[name],[position] FROM [dbo].[tbluser]';
        const users = await pool.request().query(query);
        return users.recordset && users.recordset.length > 0 ? users.recordset : [];
    } catch (error) {
        console.log(error.message);
    }
}

const getUserById = async (id) => {
    try {
        let pool = await sql.connect(config);
        const query = 'SELECT [id],[username],[name],[position] FROM [dbo].[tbluser] WHERE [id]=' + id;
        const users = await pool.request().query(query);
        return users.recordset && users.recordset.length > 0 ? users.recordset[0] : {};
    }
    catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    getUsers,
    getUserById
}