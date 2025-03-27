
const btnPost = document.getElementById('btn-post');




btnPost.onclick = async function(){
    const postBody = document.getElementById('post-body').value;
    console.log(postBody);
    const postBodyEncoded =  JSON.stringify({postBody}) 
    console.log(postBodyEncoded);
    const res = await fetch(
        '/posts',
        {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: postBodyEncoded
        }
    )

    if(res.status == 201){
        window.location.pathname = '/posts';
    }
}