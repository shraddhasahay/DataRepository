const mysql = require('mysql');

let seeddb = async ()=>{

    let db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : ''
    });

    let promise = new Promise((resolve,reject)=>{
        let sql = 'Create Database faculty_module';
        db.query(sql, (err,result)=>{
            if(err) throw err;
            console.log('DataBase Created Successfully')
            resolve('done');
        })
    })
    let res = await promise;

    promise = new Promise((resolve,reject)=>{
        let db =  mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'faculty_module'
        });
        resolve(db);
    })
    db = await promise;

    sql = 'Create Table Faculty(id varchar(255), password varchar(255), name varchar(255), department varchar(255), mailId varchar(255), phoneNumber varchar(255), joiningDate Date, primary key (id))';

    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log('Faculty Table created successfully');
    })

    sql = 'Create Table Awards(id varchar(255), category varchar(255),department varchar(255), filterDate Date, level varchar(255), eventName varchar(255), awardedBy varchar(255), status varchar(255), date Date, description text, COE varchar(255))';
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log('Awards Table created successfully');
    })



    sql = 'Create Table eventsAttended(id varchar(255), activityType varchar(255),department varchar(255), filterDate Date, topic varchar(255), attendedAt varchar(255), activityName varchar(255), objective text, benefits text, startDate Date, endDate Date, level varchar(255), description text, COE varchar(255))';
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log('Events Attended Table created successfully');
    })



    sql = 'Create Table clubActivities(clubName varchar(255), topic varchar(255), department varchar(255), filterDate Date, resourcePerson varchar(255), designation varchar(255), company varchar(255), objective text, benefits text, participantNo varchar(255), website varchar(255), startDate Date, endDate Date, sem varchar(255), COE varchar(255), description text)';
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log('Club Activities Table created successfully');
    })

}

seeddb();