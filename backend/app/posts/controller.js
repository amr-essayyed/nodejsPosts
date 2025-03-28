import { add, getAll } from "./model.js";
import { isLoggedIn } from "../utility/auth.js";

export async function addPost(req, res){
    console.log("adding a post: ", req.body.postBody);
    
    const added = await add(req.username, req.body.postBody);

    if(added){
        res.status(201).send({msg:"post added successfully"});
    }else{
        res.status(400).send("something went wrong");
    }
}

export async function getPosts(req, res){
    console.log("getting posts route");
    const posts = await getAll();
    
    if(posts){
        const loginData = isLoggedIn(req);
        if(loginData !== null){
            res.render('../views/posts.ejs', {name:loginData.name, posts: posts});
        }else{
            res.render('../views/posts.ejs', {name: null, posts: posts});
        }
    }else{
        res.status(404).send("there is no posts");
    }
    
}