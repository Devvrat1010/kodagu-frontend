const allTasksContainer=document.getElementsByClassName('tasks')[0]
const body=document.getElementsByTagName('body')[0]
const user=window.localStorage.getItem('user')
const username=JSON.parse(user).username
console.log(username,"username")
const backend=window.localStorage.getItem('backend')
const first=document.getElementsByClassName('taskContainer')[0]

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
    const tasks=await fetch(backend+'api/getAllTasks/'+username)
    const data=await tasks.json()
    iterateOverAllTasks(data)
    console.log(data,"ended")
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
    if (task.completed===false){
        dueDate.innerText="Due on : " + task.dueDate.slice(0,10).split('-').reverse().join('-')
    }
    else{
        dueDate.innerText="Completed"
        dueDate.style.color="green"
    }

    const editCard=document.createElement('div')
    editCard.classList.add('taskEditButton')
    editCard.innerText="Edit"

    const taskId=document.createElement('div')
    taskId.classList.add('taskId')
    taskId.innerText=task._id
    taskId.style.display="none"
    
    const taskAssignee=document.createElement('span')
    taskAssignee.classList.add('taskAssignee')
    taskAssignee.innerText="-"+task.assignee

    description.appendChild(taskAssignee)
    
    taskCardFooter.appendChild(editCard)
    taskCardFooter.appendChild(dueDate)

    taskContainer.appendChild(title)
    taskContainer.appendChild(description)
    taskContainer.appendChild(taskCardFooter)
    taskContainer.appendChild(taskId)

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


    cardStatus.appendChild(statusDone)
    cardStatus.appendChild(statusDelete)
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
    body.innerHTML="Unauthorized Access 😕"
    body.classList.add('unauthorized')
}