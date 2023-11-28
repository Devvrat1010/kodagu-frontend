
fetch('./links.json').then((response)=>{
    return response.json()
}).then((data)=>{
    window.localStorage.setItem('backend',data.backend)
    window.localStorage.setItem('root',data.root)
}).catch((err)=>{
    console.log(err)
})

const backend=window.localStorage.getItem('backend')
const root=window.localStorage.getItem('root')
const message=document.getElementsByClassName('message')[0]

const notLoggedIn=()=>{
    const ifLoggedOut=document.getElementsByClassName('ifLoggedOut')
    console.log(ifLoggedOut,"ifLoggedOut")
    for (let i=0;i<ifLoggedOut.length;i++){
        ifLoggedOut[i].style.display="none"
    }
}

const loggedIn=(username)=>{
    const login=document.getElementsByClassName('login')[0]
    login.innerText="Logout"
    login.addEventListener('click',()=>{
        document.cookie = "LOGIN_INFO=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href="/"
        localStorage.removeItem('user')
    })
    const signUp=document.getElementsByClassName('signup')[0]
    signUp.innerText=username
    signUp.parentElement.href="/"
}

const getUser=async ()=>{
    try{
        const jwt=document.cookie.split('; ').find(row => row.startsWith('LOGIN_INFO')).split('=')[1];
        console.log(jwt,"jwt")
        const user=await fetch(backend+"api/checkUser",{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':jwt
            }
        }).then((res)=>{
            console.log(res,"res")
            if (res.status===200){
                return res.json()
            }
        }).then((data)=>{
            if (data.error){
                message.innerText=data.error+"*"
                notLoggedIn()

            }
            loggedIn(data.user.username)
            console.log(data.user,"data")
            localStorage.setItem('user',JSON.stringify(data.user))
            return data
        })
        return true
    }
    catch(err){
        console.log(err,"user not logged in")
        notLoggedIn()
        return false

    }
}
getUser()

var eyeBall = document.querySelector('#eyeBall');
var container = document.querySelector('#container');

container.onmousemove = (event) => {
    var x = (event.clientX - container.offsetLeft) * 100 / container.offsetWidth  + "%";
    var y = (event.clientY - container.offsetTop) * 100 / container.offsetHeight + "%";
    eyeBall.style.transition = "0.3s";
    eyeBall.style.left = x;
    eyeBall.style.top = y;
}

document.onmouseout = (event) => {
    eyeBall.style.transition = "0.7s";
    eyeBall.style.left = "80%";
    eyeBall.style.top = "50%";
}
// console.log(checkLoggedIn,"checkLoggedIn")


// ifLoggedOut.map((element)=>{
//     if (!checkLoggedIn){
//         element.style.display="none"
//     }
// })