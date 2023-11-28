
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
        const user=await fetch(backend+"api/checkUser",{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':jwt
            }
        }).then((res)=>{
            if (res.status===200){
                return res.json()
            }
        }).then((data)=>{
            if (data.error){
                message.innerText=data.error+"*"
                notLoggedIn()

            }
            loggedIn(data.user.username)
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

var mouseTracker = document.querySelector('#mouseTracker');
var heroPage = document.querySelector('#heroPage');

heroPage.onmousemove = (event) => {
    var x = (event.clientX - heroPage.offsetLeft) * 100 / heroPage.offsetWidth  + "%";
    var y = (event.clientY - heroPage.offsetTop) * 100 / heroPage.offsetHeight + "%";
    mouseTracker.style.transition = "0.3s";
    mouseTracker.style.left = x;
    mouseTracker.style.top = y;
}

document.onmouseout = (event) => {
    mouseTracker.style.transition = "0.7s";
    mouseTracker.style.left = "80%";
    mouseTracker.style.top = "50%";
}
