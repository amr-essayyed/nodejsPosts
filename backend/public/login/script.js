function submitForm(){
    const form = document.querySelector('form');
    // const route = '/'+form.id.split('-')[1];
    const route = '/auth/login'; //location.pathname; // /login/
    
    const submitBtn = document.getElementById('in-submit');

    submitBtn.onclick = async function(e)
    {
        e.preventDefault();
        console.log("submitting");
        let body = {};
        let inputs = document.querySelectorAll('.in-cntnr input');
        inputs.forEach((inp)=>body[inp.name]=inp.value);
        
        try
        {
            //! request
            const res = await fetch(route, // /register  /users
                {
                    method: "POST", 
                    headers:
                    {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
            
            const data = await res.json();
            console.log(data);
            
            if(res.status == 200){
                window.location.href= 'http://localhost:8080/'
            }
        }
        catch (e)
        {
            console.error(e);
        }
    }
}

submitForm()