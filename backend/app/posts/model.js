import Post from "../../../DB/schemas/Post.js";

export async function add(user, postBody){
    const date = Date.now(); //! Date type and format
    console.log(date)
    // console.log(post);
    try{    
        const post = await Post.create({user, postBody, date});
        await post.save();
        return true;
    }
    catch(er)
    {
        console.log(er.message);
        return false;
    }
    // .then(()=>true)
    // .catch(e=>{console.error(e.message); return false;})
}