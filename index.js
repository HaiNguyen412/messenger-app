var firebaseConfig = {
    apiKey: "AIzaSyDxg9_P9eWDI7Ob7aVON0bmsKhJN2FLvd0",
    authDomain: "mesenger-a1588.firebaseapp.com",
    databaseURL: "https://mesenger-a1588-default-rtdb.firebaseio.com",
    projectId: "mesenger-a1588",
    storageBucket: "mesenger-a1588.appspot.com",
    messagingSenderId: "21900898130",
    appId: "1:21900898130:web:e546c7dbe8d02ac6a5d48b",
    measurementId: "G-4RFSSXMVSB"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database ();
const username = prompt("Please Tell Us Your Name");
document.getElementById ("message-form"). addEventListener ("submit", sendMessage);
function sendMessage(e) {
    e.preventDefault();
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    // clear the input box
    messageInput.value = "";
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
}
const fetchChat = db.ref("messages");
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;        
});