

//! vekaluma kinoneri janrer@ u sarkum buutner poiski hamar
function janrItem() {
    let catal = document.querySelector('.catalog');
    let janrArr = [];
    filmArr.forEach(i => {
        i.forEach(e => {
            janrArr.push(...e.janr)
        })
    })
    janrArr = Array.from(new Set(janrArr));
    janrArr.forEach(it => {
        catal.innerHTML += `<span class="janItem">${it}</span>`
    })
    let janItem = document.querySelectorAll('.janItem');
    janItem.forEach(item => {
        item.addEventListener('click', (e) => {
            let targ = e.target;
            targ.classList.toggle('act')
        })
    })
}
function createPgControl() {
    const pgContDiv = document.querySelector('.pageControl');
    pgContDiv.innerHTML = '';
    filmArr.forEach((it, ind) => {
        if (ind == 0) pgContDiv.innerHTML += `<span class="pg curPg" id='${ind}'></span>`
        else pgContDiv.innerHTML += `<span class="pg" id='${ind}'></span>`
    })
}
function registDiv() {
    return `<div class="registrate">
    <span class="regIcon">
        <i class="fa-regular fa-user"></i>
    </span>
    <div class="regOrLogIn">
        <div class="regRow1">
            <spna class="regBtn logIn">Войти</spna>
            <spna class="regBtn join">Давай с нами</spna>
        </div>
    </div>
    <div class="mi">
        <span>
            <a href="https://www.facebook.com/daniel.barseghyan.1">
                <i class="fa-brands fa-facebook-f"></i>
            </a>
        </span>
        <a href="https://www.linkedin.com/in/daniel-barseghyan-36b121263/">
            <i class="fa-brands fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/DanielBarseghyan">
            <i class="fa-brands fa-github"></i>
        </a>
        <a href="https://youtu.be/dQw4w9WgXcQ">
            <i class="fa-brands fa-telegram"></i></a>
    </div>
</div>`
}

function addForm() {
    return `
    <div class="regNow">
        <input placeholder="Login" type="text" class="login regInps">
        <input placeholder="Yor Name" type="text" class="name regInps">
        <input placeholder="Email" type="email" class="email regInps">
        <input placeholder="Password" type="password" class="password regInps">
        <span class="sub1">Создать</span>
        <img src="./ui/images/Padlock-powerdesign (1).png" alt="img" class="zamok">
            
    </div>`
}
function createSavedFilmIt(savedFilms, ind) {
    let moreInfo = document.querySelector('.moreInfo');
    const { url, img, title, opis, janr } = savedFilms[ind];

    moreInfo.innerHTML = `<div class='colaps'>
<div class="imgWrap">
<a href="${url}">
<i class="fa-solid fa-circle-play play"></i>
</a>
<img src="${img}"
  alt="img">
</div>
<div class="descr">
<h2 class="descIt">${title}</h2>
<table>
  <tr>
      <td class="descIt">Жанр: </td>
      <td>${janr.join(', ')}</td>
  </tr>
  <tr class='opisanie'>
      <td class="descIt">Описанте: </td>
      <td>${opis}</td>
  </tr>
</table>
</div>
</div>`
}



export { janrItem, createPgControl, createSavedFilmIt, registDiv, addForm };
