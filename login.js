const formData=document.getElementById('formData')
const submitButton=document.getElementById('submitButton')

const backend=window.localStorage.getItem('backend')
const root=window.localStorage.getItem('root')

submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    const email=formData.email.value
    const password=formData.password.value

    login(email,password)
})

const login=(email,password)=>{
    const loggedInUser=fetch(backend+"api/loginUser",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email,password:password})
    }).then((res)=>{
        if (res.status===200){
            return res.json()
        }
    }).then((data)=>{
        if (data.error){
            message.innerText=data.error+"*"
            return
        }
        document.cookie=`LOGIN_INFO=${data.token}; path=/; max-age=${60 * 60 * 24 * 14};secure=true;`;
        window.location.href = root+"index.html";
    })
}