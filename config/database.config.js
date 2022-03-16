module.exports = {

    dev:{
        host: "localhost",
        database: "docvisit",
        username: "root",
        password: "root",
        apiurl:"http://localhost:3000"
    },
    prod: {
        host: "demodb.cjius1uvi36j.us-east-1.rds.amazonaws.com",
        database: "demodb",
        username: "admin",
        password: "testdb96",
        apiurl: "http://node-env.eba-vmxdhyph.us-east-1.elasticbeanstalk.com"
    }

   
}