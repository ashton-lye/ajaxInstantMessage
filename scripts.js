var loggedInUser = "";

//get the date, only need to display today's messages
var date = new Date();
var dd = date.getDate();
var mm = date.getMonth()+1;
var yyyy = date.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 
date = dd+'/'+mm+'/'+yyyy;

//general ajax function
function ajaxRequest(method, url, async, data, callback){

	var request = new XMLHttpRequest();
	request.open(method,url,async);
	
	if(method == "POST"){
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}
	
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200) {
				var response = request.responseText;
				callback(response);
			} else {
				alert(request.statusText);
			}
		}
    }
    
	request.send(data);
}

//Login Functions
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var url = "login.php";
    var data = "username="+username+"&password="+password;
    ajaxRequest("POST", url, true, data, checkLogin);  
}

function checkLogin(response) {
    if (response != "") {
        loggedInUser = response;
        updateStatus("online");
        refreshMessages();
        getStatus();
        hideLogin();
        alert("Login Successful!");
    }
    else {
        alert("Login Unsuccessful - Please Check Your Details");
    }   
}

//Logout Functions
function logout() {
    var messages = document.getElementById("messageList");
    messages.innerHTML = "";
    updateStatus("offline");
    alert("Logged Out");
    loggedInUser = "";
    getStatus();
    hideLogin();
}

//Updating the Status of Users - Online & Offline
function updateStatus(status) {
    var url = "updateStatus.php";
    var data = "username="+loggedInUser+"&status="+status;
    ajaxRequest("POST", url, true, data, checkUpdate);
}

function checkUpdate(response) {
    if (response == "Status updated Successfully") {
        console.log(response);
    }
}

//Getting the Lists of Online and Offline Users
function getStatus() {
    var url = "getStatus.php";
    ajaxRequest("POST", url, true, "", displayStatus);
}

function displayStatus(response) {
    var onlineList = document.getElementById("onlineUsers");
    var offlineList = document.getElementById("offlineUsers");
    var userList = JSON.parse(response);

    var onlineListContent = "";
    var offlineListContent = "";

    for(var i = 0; i < userList.length; i++) {
        if (userList[i].status == "online") {
            onlineListContent += "<li class='left'>"+userList[i].user+"</li>";
        }
        else {
            offlineListContent += "<li>"+userList[i].user+"</li>";
        }
    }
    onlineList.innerHTML = onlineListContent;
    offlineList.innerHTML = offlineListContent;
}

//Registering a New User
function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var url = "register.php";
    var data = "uname="+username+"&pword="+password;
    ajaxRequest("POST", url, true, data, checkRegister);
}

function checkRegister(response) {
    if (response == "New Record Created Successfully") {
        alert("New User Registered Successfully - Login to Continue");
    }
    else {
        alert(response);
    }
}

//Sending Messages
function sendMessage() {
    var message = document.getElementById("messageBox").value;
    var sender = loggedInUser;

    var url = "sendMessage.php";
    var data = "sender="+sender+"&message="+message+"&date="+date;

    if (loggedInUser != "" && message != "") {
        ajaxRequest("POST", url, true, data, checkSend);
    }
    else {
        if (loggedInUser == ""){
            alert("You must be logged in to send messages");
        }
        else {
            alert("Please type a message to send");
        } 
    }
}

function checkSend(response) {
    var message = document.getElementById("messageBox");
    if (response == "Message Sent Successfully") {
        refreshMessages();
        getStatus();
        message.value = " ";
    }
    else {
        alert(response);
    }
}

//Refreshing the Message List
function refreshMessages() {
    var url = "refreshMessages.php";
    var data = "date="+date;
    ajaxRequest("POST", url, true, data, displayMessages);
}

function displayMessages(response) {
    var messageList = document.getElementById("messageList");
    var listContent = "";
    var messages = JSON.parse(response);

    for(var i = 0; i < messages.length; i++) {
        listContent += "<li>"+messages[i].sender+": "+messages[i].message+"</li>";
    }
    messageList.innerHTML = listContent;    
}

//Hide login stuffs while logged in
function hideLogin() {
    var userInput = document.getElementById("username");
    var passInput = document.getElementById("password");
    var loginButton = document.getElementById("login");
    var registerButton = document.getElementById("register");
    var userLabel = document.getElementById("userLabel");
    var passLabel = document.getElementById("passLabel");
    var loggedInLabel = document.getElementById("loggedIn");

    if (loggedInUser != "") {
        loggedInLabel.innerHTML = "You are logged in as "+loggedInUser;
    }
    else {
        loggedInLabel.innerHTML = "You are not currently Logged In";
    }

    var elementArray = [userInput, passInput, loginButton, registerButton, userLabel, passLabel]

    for(var i = 0; i < elementArray.length; i++) {
        if (elementArray[i].style.visibility === "hidden") {
            elementArray[i].style.visibility = "visible";
        }
        else {
            elementArray[i].style.visibility = "hidden";
        } 
    }
}
