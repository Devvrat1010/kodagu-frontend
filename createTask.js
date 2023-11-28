const backend=window.localStorage.getItem('backend')

const getUser=async ()=>{
    const username=document.getElementsByClassName('username')[0]
    const user=JSON.parse(localStorage.getItem('user')).username
    username.innerText=user


    formData=document.getElementById('formData')
    submitButton=document.getElementById('submitButton')
    submitButton.addEventListener('click',(e)=>{
        e.preventDefault()
        const title=formData.title.value
        const description=formData.description.value
        const dueDate=formData.dueDate.value
        const assignedTo=formData.assignedTo.value
        if (dueDate < Date.now()) {
            const message=document.getElementsByClassName('message')[0]
            message.innerText="The Date must be Bigger or Equal to today date*"
            return false;
        }
        createTask(title,description,dueDate,assignedTo,user)
    })
}

const createTask=(title,description,dueDate,assignedTo,user)=>{
    const data={
        title:title,
        description:description,
        dueDate:dueDate,
        username:assignedTo,
        assignee:user,
        completed:false
    }
    fetch(backend+"api/createTask",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
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
    getUser()
}
catch(err){
    body=document.getElementsByTagName('body')[0]
    body.innerHTML="Unauthorized Access 😕"
    body.classList.add('unauthorized')
}