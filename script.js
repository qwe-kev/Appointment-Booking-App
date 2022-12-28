var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var form = document.getElementById("myForm");
var peopleList = document.getElementById("listOfPeople");


function addItems(e) {
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
    // add to localStorage
    let userDetails = JSON.stringify({name : userName.value, emailid : userEmail.value});
    if(JSON.parse(localStorage.getItem(`userDetails${userEmail.value}`))) {
        var items = peopleList.getElementsByTagName("li");
        localStorage.removeItem(`userDetails${userEmail.value}`);
        localStorage.setItem(`userDetails${userEmail.value}`, userDetails);

    }
    else {
        localStorage.setItem(`userDetails${userEmail.value}`, userDetails);
    }
}

var removeItem = function(e) {
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


peopleList.addEventListener('click', removeItem);

form.addEventListener('submit', addItems);