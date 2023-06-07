// étape 2.2 authentification de l'utilisateur //

document.getElementById('login').addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('mdp').value;
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
  .catch(error => console.error(error));
});
    














