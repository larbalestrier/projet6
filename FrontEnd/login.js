// étape 2.2 authentification de l'utilisateur //

document.getElementById('login').addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('mdp').value;
    const errorMessage = document.createElement('p');
    const form = document.getElementById('login');
    const existingErrorMessage = form.querySelector('.error-message');
    
    if (existingErrorMessage) {
        form.removeChild(existingErrorMessage);
    }

    fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({ email, password })
  })
  .then(response =>{
    if (response.ok) {
      return response.json();
    }
    else {
      throw new Error('Erreur dans l’identifiant ou le mot de passe');
    }
    })
  .then(data => {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";   
    })
  .catch(error => {
    errorMessage.innerText = 'le mot de passe ou l\'email est incorrecte'
    errorMessage.classList.add('error-message')
    form.appendChild(errorMessage)
  })
});
    














