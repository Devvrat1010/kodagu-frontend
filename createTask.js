const backend=window.localStorage.getItem('backend')
console.log(backend,"backend")




const getUser=async ()=>{
    const username=document.getElementsByClassName('username')[0]
    const user=JSON.parse(localStorage.getItem('user')).username
    username.innerText=user
    console.log(user,"user")


    formData=document.getElementById('formData')
    submitButton=document.getElementById('submitButton')
    submitButton.addEventListener('click',(e)=>{
        e.preventDefault()
        console.log(formData,"formData")
        const title=formData.title.value
        const description=formData.description.value
        const dueDate=formData.dueDate.value
        const assignedTo=formData.assignedTo.value
        if (dueDate < Date.now()) {
            const message=document.getElementsByClassName('message')[0]
            message.innerText="The Date must be Bigger or Equal to today date*"
            return false;
        }
        // console.log(title,description,dueDate,"dataaaaaaaa")
        createTask(title,description,dueDate,assignedTo,user)
    })
}


const createTask=(title,description,dueDate,assignedTo,user)=>{
    // console.log(assignee,"assignee in createTask")
    const data={
        title:title,
        description:description,
        dueDate:dueDate,
        username:assignedTo,
        assignee:user,
        completed:false
    }
    console.log(data,"data")
    fetch(backend+"api/createTask",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data,"dataaaaaa")
        if (data.error){
            const message=document.getElementsByClassName('message')[0]
            message.innerText=data.error+"*"
            return
        }
        else{
            alert("Task Created")
        }
    })

}
try{
    const jwt=document.cookie.split('; ').find(row => row.startsWith('LOGIN_INFO')).split('=')[1];
    console.log(jwt,"jwt")
    getUser()
}
catch(err){
    body=document.getElementsByTagName('body')[0]
    body.innerHTML="Unauthorized Access 😕"
    body.classList.add('unauthorized')
}