import { getByName as getUserbyName } from "../users/model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv'; env.config();

export function authorizeMW(req, res, next){
    console.log("authorize middleware");
    // check if logged in by token
    try{
        const token = req.cookies.accessToken;
        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.username = payload.name;
        next();
    }
    catch(e){
        console.error(e.message);
        res.clearCookie("accessToken"); // removes the token in case of expiration
        res.status(401).send("unautorized access"); //!redirect to login page
    }
}

export function register(req, res, next){
    console.log("registering")
    bcrypt.hash(req.body.password, 10,async function(err, hash){
        req.body.password = hash;
        req.url = '/users';
        next('route');
    });
}

export async function login(req, res){
    console.log("in post('/login', login)");
    // authenticate    
    const user = await getUserbyName(req.body.name);
    
    if(!user){
        res.send("no such user")
    }else{
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(isPassword)
        if(isPassword){
            //* create authorization token
            const accessToken = jwt.sign({name :user.name}, process.env.ACCESS_TOKEN_SECRET);
            res.cookie('accessToken', accessToken);
            res.send(`you are logged in ${user}`);
        }else{
            res.status(401).send("wrong password")
        }
    }
}

export async function serverProfilePage(req, res){
    const username = req.username;
    const user = await getUserbyName(username);
    res.send(user)
}