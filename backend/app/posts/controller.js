import { add } from "./model.js";

export async function addPost(req, res){
    console.log("adding a post: ", req.body.postBody);
    
    const added = await add(req.username, req.body.postBody);

    if(added){
        res.send({msg:"post added successfully"});
    }else{
        res.status(400).send("something went wrong");
    }
}