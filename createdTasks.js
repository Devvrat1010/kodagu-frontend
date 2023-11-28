const allTasksContainer=document.getElementsByClassName('tasks')[0]
const body=document.getElementsByTagName('body')[0]
const user=window.localStorage.getItem('user')
const username=JSON.parse(user).username
const first=document.getElementsByClassName('taskContainer')[0]
const backend=window.localStorage.getItem('backend')

const taskCompleted=(e)=>{
    console.log(e.target,"clicked completed")
    const taskId=e.target.parentElement.parentElement.children[3]
    console.log(taskId.innerText,"taskId")
    fetch(backend+"api/updateTask/"+taskId.innerText,{
        method:"put",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({completed:true})
    }).then((res)=>{
        if (res.status===200){
            alert("Task Completed")
            return res.json()
        }
    })
    window.location.href=root+"myTasks.html"
    return
}

const taskRemoved=(e)=>{
    console.log(e.target,"clicked deleting")
    const taskId=e.target.parentElement.parentElement.children[3]
    console.log(taskId.innerText,"taskId")  
    fetch(backend+"api/deleteTask",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id:taskId.innerText})
    }).then((res)=>{
        if (res.status===200){
            alert("Task Deleted")
            return res.json()
        }
    })
    window.location.href=root+"myTasks.html"
}
const getTasks=async ()=>{
    console.log("tasksStarted")
    const tasks=await fetch(backend+'api/createdTask/'+username)
    const data=await tasks.json()
    iterateOverAllTasks(data.message)
    console.log(data.message,"ended")
}

const iterateOverAllTasks=async(data)=>{
    data.map((task)=>{
        createFrontendOfTask(task)
    })
}

const createFrontendOfTask=(task)=>{
    const taskContainer=document.createElement('div')
    taskContainer.classList.add('taskContainer')

    const title=document.createElement('div')
    title.classList.add('taskTitle')
    title.innerText=task.title
    // console.log(task.title)
    
    const description=document.createElement('div')
    description.classList.add('taskDescription')
    description.innerText=task.description

    const taskCardFooter=document.createElement('div')
    taskCardFooter.classList.add('taskCardFooter')

    const dueDate=document.createElement('div')
    dueDate.classList.add('taskDueDate')
    dueDate.innerText="Due on : " + task.dueDate.slice(0,10).split('-').reverse().join('-')

    const editCard=document.createElement('div')
    editCard.classList.add('taskEditButton')
    editCard.innerText="Edit"
    
    const taskAssignee=document.createElement('span')
    taskAssignee.classList.add('taskAssignee')
    taskAssignee.innerText="-"+task.username

    description.appendChild(taskAssignee)
    
    taskCardFooter.appendChild(editCard)
    taskCardFooter.appendChild(dueDate)

    taskContainer.appendChild(title)
    taskContainer.appendChild(description)
    taskContainer.appendChild(taskCardFooter)

    allTasksContainer.appendChild(taskContainer)

    const cardStatus=document.createElement('div')
    cardStatus.classList.add('cardStatus')

    const statusDone=document.createElement('div')
    statusDone.innerText = ("Mark as Done")
    statusDone.className=("statusDone")

    statusDone.addEventListener('click',(e)=>{
        taskCompleted(e)
    })
    
    const statusDelete=document.createElement('div')
    statusDelete.innerText = ("Delete")
    statusDelete.className=("statusDelete")

    statusDelete.addEventListener('click',(e)=>{
        taskRemoved(e)
    })


    cardStatus.appendChild(statusQueue)
    cardStatus.appendChild(statusNeutral)
    cardStatus.appendChild(statusUrgent)
    taskContainer.appendChild(cardStatus)
    cardStatus.style.display="none"
    editCard.addEventListener('click',()=>{
        if (cardStatus.style.display==="none"){
            cardStatus.style.display=""
        }
        else
            cardStatus.style.display="none"
    })
}
try{
    const jwt=document.cookie.split('; ').find(row => row.startsWith('LOGIN_INFO')).split('=')[1];
    getTasks()

}
catch(err){
    body=document.getElementsByTagName('body')[0]
    body.classList.add('unauthorized')
    body.innerHTML="Unauthorized Access 😕"

}