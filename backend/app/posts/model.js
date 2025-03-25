import Post from "../../../DB/schemas/post.js";

export async function add(postBody){
    const date = Date.now();
    const post = await Post.create({postBody, date});
    post.save()
    .then(()=>true)
    .catch(e=>{console.error(e.message); return false;})
}