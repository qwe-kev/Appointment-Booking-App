var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var form = document.getElementById("myForm");
var peopleList = document.getElementById("listOfPeople");

async function readUsers() {
    await axios.get('https://crudcrud.com/api/73b290a65dfc427ab7ab8677bd6d0971/appointmentData')
    .then(res => {
        res.data.forEach(user => {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(user.name + " " + user.emailid));
            var editButton = document.createElement("button");
            editButton.textContent = "EDIT";
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



async function addItems(e) {
    e.preventDefault();
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(userName.value + " " + userEmail.value));
    var editButton = document.createElement("button");
    editButton.textContent = "EDIT";
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "X";
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    peopleList.appendChild(li);
    console.log(peopleList);

    // POST to crud crud REST resource (appointmentData)
    let userDetails = {name : userName.value, emailid : userEmail.value};
    await axios.post('https://crudcrud.com/api/73b290a65dfc427ab7ab8677bd6d0971/appointmentData',userDetails)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err);
    })
}

async function removeItem(e) {
    e.preventDefault();
    if(e.target.classList.contains("delete")) {
        if(confirm("Are you sure?")){
           var li = e.target.parentElement;
           let arr = e.target.parentNode.firstChild.wholeText.split(" ");
           localStorage.removeItem(`userDetails${arr[1]}`)
           peopleList.removeChild(li);
           window.location.reload();
        } 
        }
    }

window.addEventListener('DOMContentLoaded', (e) => {
    readUsers();
}) 

peopleList.addEventListener('click', removeItem);

form.addEventListener('submit', addItems);