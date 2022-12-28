var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var form = document.getElementById("myForm");
var peopleList = document.getElementById("listOfPeople");
var userId;
var resourceID = '69d3524cc6454b788fe42186e25ce70c'

async function readUsers() {
    await axios.get(`https://crudcrud.com/api/${resourceID}/appointmentData`)
    .then(res => {
        res.data.forEach(user => {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(user.name + " " + user.emailid));
            var editButton = document.createElement("button");
            editButton.textContent = "edit";
            var deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.textContent = "X";
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            peopleList.appendChild(li);
        })
    })
    .catch(err => {
        console.log(err);
        return Promise.reject(err);
    })
}



async function createUser(e) {
    // POST to crud crud REST resource (appointmentData)
    let userDetails = {name : userName.value, emailid : userEmail.value};
    await axios.post(`https://crudcrud.com/api/${resourceID}/appointmentData`,userDetails)
    .then(res => {
        console.log(res);
        e.preventDefault();
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(userName.value + " " + userEmail.value));
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");
        editButton.classList.toggle("update");
        editButton.textContent = "EDIT";
        deleteButton.classList.add("delete");
        deleteButton.textContent = "X";
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        peopleList.appendChild(li);
    })
    .catch(err => {
        console.log(err);
        return Promise.reject(err);
    })
}

async function deleteUser(e) {
    e.preventDefault();
    if(e.target.classList.contains("delete")) {
        if(confirm("Are you sure?")){
           var li = e.target.parentElement;
           let arr = e.target.parentNode.firstChild.wholeText.split(" ");
           const userData = await axios.get(`https://crudcrud.com/api/${resourceID}/appointmentData`)
                            .then(res => {
                                return res.data;
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            })
            let userId = userData.find(user => {
                return user.name === arr[0] && user.emailid === arr[1];
            })._id;
            await axios.delete(`https://crudcrud.com/api/${resourceID}/appointmentData/${userId}`)
            .then(res => {
                console.log("deleted user")
                peopleList.removeChild(li);
                window.location.reload();
                return res.status;
            }).catch(err => {
                console.log(err);
                return Promise.reject(err);
            })
        } 
    }
}

async function updateUser(e) {
    e.preventDefault();
    e.target.classList.add("update");
    document.querySelector("#submit").setAttribute('value','update');
    document.querySelector("#submit").value = "update";
    if(e.target.classList.contains("update")) {
           var li = e.target.parentElement;
           let arr = e.target.parentNode.firstChild.wholeText.split(" ");
           document.getElementById("name").setAttribute('value', arr[0]);
           document.getElementById("email").setAttribute('value',arr[1]);
           const userData = await axios.get(`https://crudcrud.com/api/${resourceID}/appointmentData`)
                            .then(res => {
                                return res.data;
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            })
            userData.forEach(user => {
                if(user.name === arr[0] && user.emailid === arr[1]) {
                    userId = user._id;
                }
            })
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
            .then(res => {
                console.log("deleted user")
                return res.status;
            }).catch(err => {
                console.log(err);
                return Promise.reject(err);
            })
            let userDetails = {name : document.querySelector("#name").value, 
                              emailid : document.querySelector("#email").value};
            await axios.post(`https://crudcrud.com/api/${resourceID}/appointmentData`,userDetails)
            .then(res => {
                console.log(res.status);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        }
        editfunc();
    }
});


