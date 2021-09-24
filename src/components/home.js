import { onNavigate } from '../main.js';
import { allFunctions } from '../lib/validFunc.js';
import {

  logOut, getUser, postInFirestore, updatePost, deletePost, stateCheck,

} from '../firebaseAuth.js';

export const home = () => {
  let userEmail = getUser();
  if (userEmail !== null) {
    userEmail = userEmail.email;
  }

  const homePage = document.createElement('div');

  stateCheck(homePage);

  homePage.setAttribute('id', 'homePage');
  const htmlNodes = `<header id = "wallBanner" >
  <img id="logoWall" src="./imagenes/Imagen1.png">
  <h1 id="petFriendsWall">Pet Friends</h1>
  <img id="signOut" src= "./imagenes/exit.png"></header>
  <h2 id= "welcomeMessage">Bienvenid@</h2>
  <p id= "catchPost"></p>
  <div id="postContainer">
  <img id= "yellowDog" src="./imagenes/Güero.png">
  <button id="postInput">Cuéntanos sobre tu petFriend</button>
  </div>   
  <div id="backModal">
  <div id="modal">
  <h3 id="close">x</h3>
  <textarea id="post" placeholder = "Cuéntanos sobre tu petFriend"></textarea>
  <button id="share">Publicar</button>
  </div>
  </div>
  <div id="posts"></div>
  `;
  homePage.innerHTML = htmlNodes;

  const postDivPublish = homePage.querySelector('#posts');

  updatePost((snapshot) => {
    postDivPublish.innerHTML = '';
    snapshot.forEach((doc) => {
      const comentId = doc.id;
      const htmlPostsPublished = `<div id= "recentPostDiv">
          <p id="userMail">${doc.data().user}:</p>
          <p id="recentPost">${doc.data().post}</p>
          <div id= "divButtons"><button id= "edit" >Editar</button>
          <button id= "deletes" class="btndeletes"  > Eliminar</button> 
          <img id= "img" src="./imagenes/patitaGris.png">
          <div class="deleteBackModal">
          <div class="deleteModal" >
          <h2 class= "confirmText">¿Estás segur@ que deseas eliminar este post? </h2>
          <button class="si" data-id= ${comentId}>Si</button>
          <button class="no" >No</button>
          </div>
          </div>
          </div>
          </div>`;

      postDivPublish.innerHTML += htmlPostsPublished;

      const deletebtn = postDivPublish.querySelectorAll('.btndeletes');
      const deleteModal = postDivPublish.querySelector('.deleteBackModal');
      const confirmDelete = postDivPublish.querySelectorAll('.si');
      deletebtn.forEach((btnDelete) => {
        btnDelete.addEventListener('click', () => {
          deleteModal.style.visibility = 'visible';
          confirmDelete.forEach((bntYes) => {
            bntYes.addEventListener('click', (e) => {
              deletePost(e.target.dataset.id);
              deleteModal.style.visibility = 'hidden';
            });
          });
          postDivPublish.querySelector('.no').addEventListener('click', () => {
            deleteModal.style.visibility = 'hidden';
          });
        });
      });
    });
  });

  const modal = homePage.querySelector('#backModal');
  homePage.querySelector('#signOut').addEventListener('click', () => logOut(onNavigate));

  homePage.querySelector('#postInput').addEventListener('click', () => {
    modal.style.visibility = 'visible';
    homePage.querySelector('#post').value = '';
  });

  homePage.querySelector('#close').addEventListener('click', () => {
    modal.style.visibility = 'hidden';
  });

  homePage.querySelector('#share').addEventListener('click', () => {
    modal.style.visibility = 'hidden';
    // const catchPost = homePage.querySelector('#catchPost');
    const postPublish = homePage.querySelector('#post').value;
    if (allFunctions.validPost(postPublish) === false) {
      alert('No has publicado un post aún');
    } else {
      postInFirestore(postPublish, userEmail);
    }
  });
  return homePage;
};
