console.log("Welcome to notes app");
showNotes();
// If user adds a note ,add it to local storage

let addBtn = document.getElementById('addBtn');                 // getting add note button
addBtn.addEventListener("click", function (e) {                 // creating event  click
    let addTxt = document.getElementById("addTxt");             // gettig notes from local storage
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);                           //convert notes into array  as it is stored as string in localstorage
    }
    notesObj.push(addTxt.value);                                // adding new note into array 
    localStorage.setItem("notes", JSON.stringify(notesObj));    //storing new note(in string form) into localstorage
    addTxt.value = ""                                           //making textarea empty
    showNotes();
});
// Function to show notes
function showNotes() {
    let notes = localStorage.getItem("notes");                  // gettig notes from local storage
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);                         //convert notes into array  as it is stored as string in localstorage  
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="card mx-2 my-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title"> Note ${index + 1}</h5>                                                        
          <p class="card-text">${element}</p>
          <button id ="${index}" onclick='deleteNote(this.id)' class="btn btn-primary" >Delete note</button>
          <button id ="${index + 1}" onclick='editNote(this.id)' class="btn btn-primary editTxt" >Edit note</button>
        </div>
      </div>`
    });
    let notesElm = document.getElementById('notes');             //adding innerHTML to div tag with id=notes
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show!!!`
    }

}

//Function to delete node

function deleteNote(index) {
    //console.log("I am deleting a note", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);         //deleting clicked  note from array
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes();
}
// functioning of searching
//let searchBtn=document.getElementById('searchBtn');
let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('click', function () {
    let inputVal = searchTxt.value;
    console.log("Input event fired");
    let card = document.getElementsByClassName('card');
    //console.log(card);

    Array.from(card).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

});
let saveBtn = document.getElementById('saveBtn');
saveBtn.style.display = "none";
// editing note
function editNote(index) {
    console.log(index)
    let notes = localStorage.getItem("notes");                  // gettig notes from local storage
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);                         //convert notes into array  as it is stored as string in localstorage  
    }
        let txtArea = document.querySelector('#addTxt');      //getting textarea
        txtArea.value = notesObj[index - 1];
        let saveBtn = document.getElementById('saveBtn');     
        saveBtn.style.display = "inline";                       //displaying save button
        saveBtn.addEventListener('click',function()
        {
            notesObj[index-1]= txtArea.value;   
            console.log(index)                 //Editing note
            localStorage.setItem("notes", JSON.stringify(notesObj)) 
            console.log(notesObj)
            txtArea.value="";
            //showNotes();
            saveBtn.style.display = "none";                       //removing save button
        })
       
}