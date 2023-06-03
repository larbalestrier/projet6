const gallery = document.querySelector('#gallery');   
    

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    data.forEach(project => {
      const projectElement = document.createElement('div');
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