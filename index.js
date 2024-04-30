import database from './db.js';

const data= database();

export default function routes(database) {


async function landingPage (req,res,next){

res.render("index");
}

async function signup (req,res,next){

res.render("signup");
}

async function signUser(req,res,next){
	
	let name= req.body.name;
	let lastName=req.body.lastname;
	let birthdate=req.body.birthdate;
	let gender= req.body.gender;
	let email= req.body.email;
	let password = req.body.password;
	
   let  completeProfile= name&&  lastName && birthdate && gender  && email;

if(completeProfile){

await data.createDB();
await data.createUser(name,lastName, birthdate,gender,email,password);
	res.redirect("/");

}

else{

res.redirect("/signup");
}

}

async function login (req,res,next){

res.render("login");
}

async function home (req,res,next){

res.render("home");
}

return {
landingPage,
signup,
login,
home,
signUser,
}
}