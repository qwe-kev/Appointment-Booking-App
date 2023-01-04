const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const form = document.getElementById("myForm");
const peopleList = document.getElementById("listOfPeople");
let userId;
let resourceID = 'cfa3b28452a54b9d8ea2be7fb4327272'

async function readUsers() {
    try{
        const res = await axios.get(`https://crudcrud.com/api/${resourceID}/appointmentData`)
        res.data.forEach(user => {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(user.name + " " + user.emailid));
                var editButton = document.createElement("button");
                editButton.textContent = "edit";
                editButton.classList.add("btn","btn-outline-success","btn-sm");
                var deleteButton = document.createElement("button");
                deleteButton.classList.add("delete", "btn", "btn-outline-danger", "btn-sm");
                deleteButton.textContent = "X";
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                li.classList.add("list-group-item","bg-light","justify-content-between")
                peopleList.appendChild(li);
            })
    }
    catch(error) {
        if(error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if(error.request) {
            console.log(error.request);
        }
        else {
            console.log({"Error" : error.message});
        }
    }
}



async function createUser(e) {
    // POST to crud crud REST resource (appointmentData)
    try{
    let userDetails = {name : userName.value, emailid : userEmail.value};
    const res = await axios.post(`https://crudcrud.com/api/${resourceID}/appointmentData`,userDetails)
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(userName.value + " " + userEmail.value));
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    editButton.classList.toggle("update");
    editButton.classList.add("btn","btn-outline-success","btn-sm");
    editButton.textContent = "edit";
    deleteButton.classList.add("delete", "btn", "btn-outline-danger", "btn-sm");
    deleteButton.textContent = "X";
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    li.classList.add("list-group-item","bg-light","justify-content-between")
    peopleList.appendChild(li);
    }
    catch(error) {
        if(error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if(error.request) {
            console.log(error.request);
        }
        else{
            console.log({"Error" : error.message});
        }
    }
}

async function deleteUser(e) {
    try{
    e.preventDefault();
    if(e.target.classList.contains("delete")) {
        if(confirm("Are you sure?")){
           var li = e.target.parentElement;
           let arr = e.target.parentNode.firstChild.wholeText.split(" ");
           const userData = await axios.get(`https://crudcrud.com/api/${resourceID}/appointmentData`)
           let userId = userData.data.find(user => {
                return user.name === arr[0] && user.emailid === arr[1];
            })._id;
            const res = await axios.delete(`https://crudcrud.com/api/${resourceID}/appointmentData/${userId}`)
            peopleList.removeChild(li);
            window.location.reload();
            console.log("deleted user")
            }
        } 
    }
    catch(error) {
        if(error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if(error.request) {
            console.log(error.request);
        }
        else{
            console.log({"Error" : error.message});
        }
    }
    }


async function updateUser(e) {
    try{
        e.preventDefault();
    e.target.classList.add("update");
    document.querySelector("#submit").setAttribute('value','update');
    document.querySelector("#submit").value = "update";
    if(e.target.classList.contains("update")) {
           let arr = e.target.parentNode.firstChild.wholeText.split(" ");
           document.getElementById("name").setAttribute('value', arr[0]);
           document.getElementById("email").setAttribute('value',arr[1]);
           const userData = await axios.get(`https://crudcrud.com/api/${resourceID}/appointmentData`)
            userData.data.forEach(user => {
                if(user.name === arr[0] && user.emailid === arr[1]) {
                    userId = user._id;
                }
            })
    }
    }
    catch(error){
        if(error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if(error.request) {
            console.log(error.request);
        }
        else{
            console.log({"Error" : error.message});
        }
    }
    
}

window.addEventListener('DOMContentLoaded', (e) => {
   readUsers();
}) 

peopleList.addEventListener('click', deleteUser);

peopleList.addEventListener('click', updateUser);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(document.querySelector("#submit").value === "Submit") {
        createUser(e);
    }else{
        updateUser(e);
        const editfunc = async function() {
        await axios.delete(`https://crudcrud.com/api/${resourceID}/appointmentData/${userId}`)
        let userDetails = {name : document.querySelector("#name").value, 
                              emailid : document.querySelector("#email").value};
        const res = await axios.post(`https://crudcrud.com/api/${resourceID}/appointmentData`,userDetails)
        console.log(res, "deleted user");
        window.location.reload();
        }
        editfunc();
    }
});


