import { config } from 'dotenv';
import  {MongoClient} from 'mongodb';
import crypto from 'crypto';
config();

export default function database(){
	
	const uri= process.env.URI;
	let collection ;
	
async function connectToCluster(){
	
let mongoClient;	

try{
	
 mongoClient=new  MongoClient(uri);
await mongoClient.connect();
console.log("connected to cluster");
return mongoClient;

}catch(err){
	
	console.error('Connection to MongoDB Atlas failed!', err);
       process.exit();

}

}

async function  createDB(){

let mongoClient;
try{
	
mongoClient=await connectToCluster();	
const db= mongoClient.db("loginApp");
console.log("created database");
collection= db.collection("users");
collection= db.collection("sessions");
 console.log("created collection");

}catch(err){

console.log(err);
process.exit();


}
}

async function createUser(name,lastName,birthdate, gender,email,password){

let mongoClient;

let newUser= {
"name": name,
"lastName": lastName, 
"birthdate": birthdate,
"gender": gender,
"email": email,
"password": password

}

try{

 mongoClient=await connectToCluster()
await collection.insertOne(newUser);
console.log("successfully  created user");

} finally{

mongoClient.close();
}

}

return{

createDB,
createUser,
}

}



