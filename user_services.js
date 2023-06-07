'use strict';

const sql = require('mssql');
const { update } = require('./users');

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

const addUser = async (userData) => {
    try{
        let pool = await sql.connect(config);
        const query = 'INSERT INTO [dbo].[tbluser] ([username],[name],[position]) VALUES(@username, @name, @position) SELECT SCOPE_IDENTITY() AS id';
        const adduser =  await pool.request()
                            .input('username', sql.NVarChar(50), userData.username)
                            .input('name', sql.NVarChar(50), userData.name)
                            .input('position', sql.NVarChar(50), userData.position)
                            .query(query);
        return adduser.recordset;
    }
    catch (error) {
        console.log(error.message);
    }
}

const updateUser = async(id, userData) => {
    try{
        let pool = await sql.connect(config);
        const query = 'UPDATE [dbo].[tbluser] SET [username]=@username,[name]=@name,[position]=@position WHERE [id]=@id';
        const update_user = await pool.request()
                            .input('id', sql.Int, id)
                            .input('username', sql.NVarChar(50), userData.username)
                            .input('name', sql.NVarChar(50), userData.name)
                            .input('position', sql.NVarChar(50), userData.position)
                            .query(query);
        return update_user.recordset;
    }
    catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async (id) => {
    try{
        let pool = await sql.connect(config);
        const query = 'DELETE [dbo].[tbluser] WHERE [id]=@id';
        const del_user = await pool.request()
                            .input('id', sql.Int, id)
                            .query(query);
        return del_user.recordset;
    }
    catch(error) {
        console.log(error.message)
    }
}

module.exports = {
    getUsers, getUserById, addUser, updateUser,deleteUser
}