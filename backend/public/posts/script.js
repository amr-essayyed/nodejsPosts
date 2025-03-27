    
const btnPost = document.getElementById('btn-post');
const postBody = document.getElementById('post-body').value;

btnPost.onclick = async function(){
    const res = await fetch(
        '/posts',
        {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(postBody)
        }
    )

    if(res.status == 200){
        window.location.pathname = '/posts';
    }
}