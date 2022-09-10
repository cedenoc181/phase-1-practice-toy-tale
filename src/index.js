let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



fetch(' http://localhost:3000/toys')
.then(res => res.json())
.then(toyData => {
  toyData.forEach(data => 
    renderToys(data))
})

const renderToys = (data) => {
  //console.log(data)
  let toyCollection = document.querySelector('#toy-collection')
toyCollection.innerHTML = toyCollection.innerHTML + `<div class="card"> <h2>${data.name}</h2> <img class="toy-avatar" src = "${data.image}" width = "100"> <p> likes: ${data.likes} </p><button onclick="increaseLikes(${data.id}, ${data.likes})" class= "like-btn" id = "${data.id}">like</button> </div>`
 
}
function increaseLikes(id, oldLikes){
  let newNumberOfLikes = parseInt(oldLikes) + 1
  fetch('http://localhost:3000/toys/'+id,
  {
  method : "PATCH",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    "likes": newNumberOfLikes

  })
}
  )
  window.location.reload()
}

let form = document.querySelector('#form')

form.addEventListener('submit', function(event){
  event.preventDefault()
  
  let imgURL = form.querySelector('input[name="image"]').value
  let name = form.querySelector('input[name="name"]').value
 

fetch('http://localhost:3000/toys',
{
method : "POST",
headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify({
  name : name,
image : imgURL,
likes: 0
})
}

)
}   )