// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { logOut, getUser } from '../firebaseAuth.js';

export const home = () => {
  const homePage = document.createElement('div');
  let userEmail = getUser();
  if (userEmail !== null) {
    userEmail = userEmail.email;
  }

  const htmlNodes = `<header id = "wallBanner" >
  <img id="logoWall" src="./imagenes/Imagen1.png">
  <h1 id="petFriendsWall">Pet Friends</h1>
  <img id="signOut" src= "./imagenes/exit.png"></header>
  <h2 id= "welcomeMessage">Bienvenid@ ${userEmail} </h2>
  
  <div id="postContainer">
  <img id= "yellowDog" src="./imagenes/Güero.png">
  <input id="postInput" type= "text" placeholder= "Cuentanos sobre tu petFriend">
  </div>   

  <div id="backModal">
  <div id="modal">
  <h3 id="close">x</h3>
  <textarea id="post" placeholder = "Cuentanos sobre tu petFriend"></textarea>
  <button id="share">Publicar</button>
  </div>
  </div>
  `;

  homePage.innerHTML = htmlNodes;

  homePage.querySelector('#signOut').addEventListener('click', () => logOut(onNavigate));
  return homePage;
};
