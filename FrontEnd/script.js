// Sélectionner l'élément DOM qui contiendra la galerie et les filtres

const gallery = document.querySelector('#gallery');   

    
// appel de l'api et création des projets //
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    data.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.setAttribute ("categorieId", project.category.id)
      projectElement.setAttribute ("id", project.id)
      const imgElement = document.createElement('img');
      const titleElement = document.createElement('h3');
      imgElement.src = `${project.imageUrl}`;
      titleElement.innerText = `${project.title}`;
      projectElement.appendChild(imgElement);
      projectElement.appendChild(titleElement);
      gallery.appendChild(projectElement);
  
    });
    
  })
  .catch(error => console.error(error));

// création boutton tous //
const divCategories = document.querySelector("#filtres");
const buttonT = document.createElement('button');
buttonT.innerText = 'Tous';
buttonT.setAttribute('class', 'button buttonSelect' );
divCategories.appendChild(buttonT);
buttonT.addEventListener('click',function() {btnTous();colorButton(buttonT)} )

//appel api et   création des filtres  // 
fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(dataButton =>{    
  dataButton.forEach((categorie)=> {
    const btnCategorie =document.createElement("button");
    btnCategorie.innerText = categorie.name ;
    btnCategorie.setAttribute("class", "button");
    btnCategorie.setAttribute("categorieId", categorie.id);
    console.log(btnCategorie)
    divCategories.appendChild(btnCategorie);
    btnCategorie.addEventListener('click', function(){filtreCategories(categorie.id);colorButton(this)} )
    })
})


function filtreCategories (id){
  const projectGallery =  gallery.querySelectorAll("div")
  projectGallery.forEach(element => {
    if (element.getAttribute("categorieId") != id) {
      element.style.display = "none"
    } else {
      element.style.display = "unset"
    }
  });
}


function btnTous () {
  const projectGallery =  gallery.querySelectorAll("div")
  projectGallery.forEach(element => {
      element.style.display = "unset"
    }
  );
}


function colorButton (btn) {
  const btnSelect = document.querySelector(".buttonSelect")
  btnSelect.classList.remove("buttonSelect")
  btn.classList.add("buttonSelect")

}


// étape 3 //
// login on mode édition //
const bannier =document.querySelector('.loginOn');
const loginOnOff = document.querySelector('.lien-login');
const link = document.getElementById('link');
const edit1 = document.querySelector('.btn-edit')
const edit2 = document.querySelector('.btn-edit2')




function modeEdition () {
  if (localStorage.getItem('token')){
    bannier.style = "display:flex";
    divCategories.style = "display:none";
    edit1.style= "display:flex";
    edit2.style= "display:flex";
    loginOnOff.innerText = "logout";
    loginOnOff.addEventListener("click", () => {
      localStorage.removeItem("token");
      link.href = "index.html";

    }); 
  } else {
    bannier.style = "display:none";
    divCategories.style = "display:flex";
    edit1.style= "display:none";
    edit2.style= "display:none";

  } 
}
modeEdition()

// modal // 
let modal = null

const openModal = function (e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = "flex"
  modal = target
  modal.addEventListener('click' , closeModal)
  modal.querySelector('.close-modal').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
  
}

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault()
  modal.style.display = "none"
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener('click',openModal)
  
})


// ajout gallery à la modal // 

const galleryModal = document.querySelector("#gallery-modal");


fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    data.forEach(project => {
      const projectElement = document.createElement('div');
      const ContainerElement = document.createElement("div");
      const imgElement = document.createElement("img");
      const txtEdit = document.createElement("p");
      const deleteLogo = document.createElement("i");
      imgElement.src = `${project.imageUrl}`;
      txtEdit.innerText= 'éditer';
      deleteLogo.className = "fa-solid fa-trash-can position-logo-delete";
      deleteLogo.id = "deleteProject"
      projectElement.setAttribute ("idModal", project.id)
      ContainerElement.appendChild(imgElement)
      ContainerElement.appendChild(txtEdit)
      ContainerElement.appendChild(deleteLogo)      
      projectElement.appendChild(ContainerElement)
      galleryModal.appendChild(projectElement)
      deleteLogo.addEventListener('click', function(event) {
        deleteprojet(project.id);
      });
    });
  })
  .catch(error => console.error(error));


  // delete un pprojet // 

    function deleteprojet(id){
      const deleteAction = fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
        },
        })
        .then(response =>{
          if (response.ok) {
          return response;
        } else { 
          throw new Error(response.status);
        }})
        .then(data=> { 
          console.log("Projet supprimé avec succès.");
          const projetdelete = document.getElementById(id)
          const projetdeletemodal = document.querySelector('div[idmodal="'+ id +'"]')
          projetdelete.remove();
          projetdeletemodal.remove();
          
        })
        .catch(error => console.error(error));
        

      }
  