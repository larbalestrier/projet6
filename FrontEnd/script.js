// Sélectionner l'élément DOM qui contiendra la galerie et les filtres

const gallery = document.querySelector('#gallery');   

    
/* function pour l'appel à l'API */ 
async function works() {
  const response = await fetch("http://localhost:5678/api/works")
  const dataWorks = await response.json();
  return dataWorks;
}

async function categories (){
  const response = await fetch("http://localhost:5678/api/categories");
  const dataCategories = await response.json();
  return dataCategories;
}


/* affichage des projet sur la page d 'accueil  */
async function projets (){
  const dataProjets = await works();
  dataProjets.forEach((project) => {
    const projectElement = document.createElement('div');
    projectElement.setAttribute ("categorieId", project.category.id);
    projectElement.setAttribute ("id", project.id);
    const imgElement = document.createElement('img');
    const titleElement = document.createElement('h3');
    imgElement.src = `${project.imageUrl}`;
    titleElement.innerText = `${project.title}`;
    projectElement.appendChild(imgElement);
    projectElement.appendChild(titleElement);
    gallery.appendChild(projectElement);
  });
}
projets ()

// création boutton tous //
const divCategories = document.querySelector("#filtres");
const buttonT = document.createElement('button');
buttonT.innerText = 'Tous';
buttonT.setAttribute('class', 'button buttonSelect' );
divCategories.appendChild(buttonT);
buttonT.addEventListener('click',function() {btnTous();colorButton(buttonT)} )

/*création des bouttons des filtres  */
async function filtres () {
  const dataCategories = await categories();
  dataCategories.forEach((categorie) => {
    const btnCategorie =document.createElement("button");
    btnCategorie.innerText = categorie.name ;
    btnCategorie.setAttribute("class", "button");
    btnCategorie.setAttribute("categorieId", categorie.id);
    console.log(btnCategorie)
    divCategories.appendChild(btnCategorie);
    btnCategorie.addEventListener('click', function(){filtreCategories(categorie.id);colorButton(this)} )
  })
}
filtres ()


/* function pour pouvoir filtrer les projets  */
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

async function projetModal (){
  const dataProjetsModal = await works();
  dataProjetsModal.forEach((project) =>{
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
    })
  });
}
projetModal ()

// delete un pprojet // 
function deleteprojet(id){
  const deleteAction = fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + localStorage.getItem("token"),
    },
    })
    .then(()=> { 
      console.log("Projet supprimé avec succès.");
      const projetdelete = document.getElementById(id)
      const projetdeletemodal = document.querySelector('div[idmodal="'+ id +'"]')
      projetdelete.remove();
      projetdeletemodal.remove();   
    })
    .catch(error => console.error(error));
    

  }


/*modal ajout photo */ 
const modal1 = document.getElementById('modal1')
const modal2 = document.getElementById('modal2')
const btnAddPhoto = document.querySelector('.btn-add-photo')

btnAddPhoto.addEventListener('click',function(){
  modal1.style.display = 'none'
  modal2.style.display = 'flex'
})

/* retour sur la modal1 */
const backModal1 = document.querySelector('.back-modal1')

backModal1.addEventListener('click',function(){
  modal1.style.display = 'flex'
  modal2.style.display = 'none'

})


/* creation des categorie pour le form*/
const listeDeroulante = document.querySelector("select");

async function listeCategorieModal () {
  const categorieModal = await categories()
  categorieModal.forEach((modalCategorie) =>{
    const listeCategorie = document.createElement("option");
    listeCategorie.innerText = modalCategorie.name ;
    listeCategorie.setAttribute("value", modalCategorie.id);
    listeDeroulante.appendChild(listeCategorie);
    });
  }

  listeCategorieModal();

/* data form*/

const photoInput = document.getElementById('photoInput');
const boxAddPhoto = document.querySelector('.box-add-photo');
const imagePreview = document.getElementById('image-preview');

photoInput.addEventListener('change', function(event) {
  // Vérifie si des fichiers ont été sélectionnés
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    // Lecture du fichier sélectionné en tant que URL de données
    reader.onload = function(e) {
      // Crée un élément d'image pour l'aperçu
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('load-img')

      // Supprime tout contenu précédent de la div parente
      boxAddPhoto.innerHTML = '';

      // Ajoute l'image à la div parent
      boxAddPhoto.appendChild(img);
    };

    // Lit le fichier en tant qu'URL de données
    reader.readAsDataURL(event.target.files[0]);
  }
});


/*   Validation du form*/


const valideImg = document.getElementById('image-preview')
const valideTitle =document.getElementById('title')
const valideCategorie = document.getElementById('categorie-modal')
const valideBtn = document.getElementById('validerButton')

function validerForm () {
  if (valideTitle.value !== "" && valideCategorie.value !== "" && photoInput.files.length > 0 ) {
    valideBtn.classList.add("btn-green");
    console.log("formulaire ok");
    return true;
  } else {
    valideBtn.classList.remove("btn-green");
    console.log("formulaire mal rempli");
    return false;
  }
}
valideTitle.addEventListener("input", validerForm);
valideCategorie.addEventListener("change", validerForm);
photoInput.addEventListener("change", validerForm);

 /* envoie des données du formulaire */


valideBtn.addEventListener("click", async (e) => {
  e.preventDefault()
if (validerForm() == true) {
  const formData = new FormData ();
  formData.append("title", valideTitle.value);
  formData.append("category", valideCategorie.value);
  formData.append("image",photoInput.files[0]);
  try {
    const response = await fetch("http://localhost:5678/api/works",  {
        method: "POST",
        headers: {
          "Acces-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData ,
      })
      
    if (response.ok) {
      // Réponse de l'API réussie
      const projet = await response.json();
      console.log("Projet ajouté avec succès:", projet);
    } else {
      // Réponse de l'API avec une erreur
      console.error("Erreur lors de l'ajout du projet:", response.status);
    }
  } catch(error)  {
    // Erreur lors de la requête
    console.error('Erreur lors de la requête vers l\'API', error);
  }
}
})

