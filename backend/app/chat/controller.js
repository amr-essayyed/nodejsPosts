import { getByUser, add } from './model.js'
import { isLoggedIn } from '../utility/auth.js';
import { io } from '../app.js';

export async function getChat(req, res){
    const chatingUsername = req.params.user;

    const loginData = isLoggedIn(req);

    try{

        const chatMessages = await getByUser(loginData.name, chatingUsername);
        console.log("chat: ", chatMessages);
        res.status(200).render('../views/chat', {you: loginData.name,him: chatingUsername, chatMessages})
    }
    catch{
        res.status(400).send({msg:" something went wrong"}); //! thee should be a page fot that

    }
}

export async function postChatLine(req, res){
    const chatingUsername = req.params.user;

    const loginData = isLoggedIn(req);

    try{
        const chatLineD = await add(loginData.name, chatingUsername, req.body.chatLine);
        console.log("added: ", chatLineD);
        io.emit('chatLineSent', chatLineD);
        res.status(201).send({msg: "added successfully"})//render('../views/chat', {you: loginData.name,him: chatingUsername, chatMessages})
    }
    catch(e){
        res.status(400).send({msg:" something went wrong"}); //! thee should be a page fot that
        console.error(e);
    }
}