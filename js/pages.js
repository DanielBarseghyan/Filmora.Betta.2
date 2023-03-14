import data from '../data.json'assert { type: 'json' }
filmArr = data;
import * as myModule from "./script.js";
const filmBord = document.querySelector('.filmbord');
const favarit = document.querySelectorAll('.add')
const navIt = document.querySelectorAll('.navItem');
const content = document.querySelector('.content');
const pop = document.querySelector('#popUp');
const popContent = document.querySelector('.popCantent');
const filmInfo = document.querySelector('.filmInf');
const popBody = document.querySelector('.popBody');
const closeBt = document.querySelector('.closeBt');
//? problemner en haitnvum konsolum bai eror chi ?inchica? ?uxxel petka te che?
function popClose(e) {
    pop.classList.remove('popOpen');
    popContent.classList.add('hid');
}

function popOpend(e) {
    pop.classList.add('popOpen');
    popContent.classList.remove('hid');
}
closeBt.addEventListener('click', popClose)

popBody.addEventListener('click', (e) => {
    if (!e.target.closest('.popCantent')) {
        popClose(e);
    }
})


loadPg(0)


myModule.createPgControl()


const pgControlItem = document.querySelectorAll('.pg');
const goToPg = () => {
    pgControlItem.forEach(it => {
        it.addEventListener('click', (e) => {
            pgControlItem.forEach(i => {
                i.classList.remove('curPg')
            });
            e.target.classList.add('curPg')
            loadPg(e.target.id)
        })
    })

}

function cardRead() {
    let cards = document.querySelectorAll('.card');
    cards.forEach(item => {
        item.addEventListener('click', (event) => {
            popOpend()
            let { img, title, url, opis, janr } = filmArr[item.id.split('.')[0]][item.id.split('.')[1]];
            createFilmPop(url, img, title, opis, janr)
        })
    })
}
function createFilmPop(url, img, title, opis, janr) {
    filmInfo.innerHTML = ` <div class="imgWrap">
    <a href="${url}">
    <i class="fa-solid fa-circle-play play"></i>
     </a>
   <img class ='popImg' src="${img}"
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
</div>`
}
function loadPg(x) {
    filmBord.innerHTML = '';
    for (let i = 0; i < filmArr[x].length; i++) {
        filmBord.innerHTML += `<div class="card" id='${x}.${i}'>
    <span class="add" >
        <i class='fa-solid fa-bookmark ${x}.${i}'></i>
    </span>
    <img src="${filmArr[x][i].img}"
        alt="img">
    <div class="des">
        <h5 class="name">${filmArr[x][i].title}</h5>
    </div>
    </div>`
    }
    cardRead()
    const addBtn = document.querySelectorAll('.add');

    addBtn.forEach(item => {
        item.addEventListener('click', (e) => {
            let filmId = Array.from(e.target.classList).at(-1).split('.');
            if (localStorage.getItem('myFilms')) {
                let curentStor = JSON.parse(localStorage.getItem('myFilms'));
                if (curentStor[0]) {
                    filmExists(filmArr[filmId[0]][filmId[1]].title) ?
                        localStorage.setItem('myFilms', JSON.stringify([...curentStor, filmArr[filmId[0]][filmId[1]]])) : alert('Вы уже сохранили этот фильм ')

                }
                else {
                    filmExists(filmArr[filmId[0]][filmId[1]].title) ?
                        localStorage.setItem('myFilms', JSON.stringify([curentStor, filmArr[filmId[0]][filmId[1]]])) :
                        alert("Вы уже сохранили этот фильм ")
                }
            }
            else {
                localStorage.setItem('myFilms', JSON.stringify([filmArr[filmId[0]][filmId[1]]]))
            }
            function filmExists(fName) {

                let curentStor = JSON.parse(localStorage.getItem('myFilms'));

                let f = true;
                if (!curentStor[0]) {
                    if (fName == curentStor.title) {
                        f = false;
                    }
                    return f;
                }
                curentStor.forEach(it => {

                    if (fName == it.title) {
                        f = false;
                    }
                })
                return f;

            }
        })
    })
    content.scrollTo(0, 0)
}
goToPg()





navIt.forEach(it => {
    it.addEventListener('click', meniuClick)
})
function meniuClick(e) {
    let item = e.target;

    if (item.id == 'mainPg') {
        location.reload();
    }
    else {
        popOpend(e)
        if (item.id == 'serch') {
            meniuSecName.value=`poposaddffdzg`;
            filmInfo.innerHTML = ` 
    <div class="serch">
            <div class="serchBar">
                <input type="text" class='serchArea'>
                <span class="find byName"><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
              <div class='moreInfo'>
              
            </div>
            <div class='result'>
              
            </div>
          
        <div class="janrSerch">
            <div class="catalog">   </div>
            <span class='findByJanr find byJanr'><i class="fa-solid fa-magnifying-glass"></i></span>
        </div>
    </div>`;
            myModule.janrItem();
            let findBName = document.querySelector('.byName');
            findBName.addEventListener('click', serchingName);
            const serchJAnr = document.querySelector('.byJanr');
            serchJAnr.addEventListener('click', serchByJanr)
        }
        if (item.id == 'bookmarks') {
            filmInfo.innerHTML = `<div class="myFilms">
            <h3 class='sevedFilmList'>Сохронионные фильмы </h3>
            <div class='result'>
            </div>
            <div class='moreInfo films'>
            </div>
            </div>`;
            let savedFilmsArray = document.querySelector('.result');
            if (localStorage.length > 0) {
                let mySavedFilms = JSON.parse(localStorage.getItem('myFilms')).reverse();
                mySavedFilms.forEach((film, ind) => {
                    const { url, img, title, opis, janr } = film;
                    savedFilmsArray.innerHTML += `<div class="machCard">
                 <img class='machFPoster'src="${img}" alt="img">
                <h5 class='machFTit' id="${ind}">${title}</h5>
                </div>`;
                })
                let filmCards = document.querySelectorAll('.machCard');
                filmCards.forEach(item => {
                   
                    item.addEventListener('click', (e) => {
                        let tar = e.target;
                        myModule.createSavedFilmIt(mySavedFilms, tar.id)
                    })
                })
            }
            else {
                savedFilmsArray.innerHTML = `<h2> У вас пока нет сохраненных фильмов </h2>`

            }
        }
        if (item.id == 'user') {
           
            filmInfo.innerHTML = myModule.registDiv();
            let logInBtn = document.querySelector('.logIn');
            logInBtn.addEventListener('click',()=>{
                alert(`Я ещё не придумал зачем этому сайту регистрация
                 но  с поевлением новых функций она появится.
                До новых встреч `)
            })
            const reg = document.querySelector('.join');
            reg.addEventListener('click', (e) => {
                let mi = document.querySelector('.mi');
                let orArray = document.querySelector('.regOrLogIn');
                orArray.style.display = 'none';
                mi.classList.add('registSec');
                mi.innerHTML = myModule.addForm();
                const sub = document.querySelector('.sub1');
                sub.addEventListener('click',()=>{
                    alert(`
                    Я ещё не придумал зачем этому сайту регистрация
                     но  с поевлением новых функций она появится.
                    До новых встреч `)
                })
            })
        }
    }
}

function serchingName() {
    let moreInfo = document.querySelector('.moreInfo')
    let resultsOfSerching = document.querySelector('.result')
    let machedFilms = [];
    let inp = document.querySelector('.serchArea');
    let fReg = new RegExp(`${inp.value.toLocaleLowerCase()}`);
    filmArr.forEach(pages => {
        pages.forEach(f => {
            if (f.title.toLocaleLowerCase().match(fReg)) {
                machedFilms.push(f);
            }
        })
    })
    shoeMachedFilms()


    function shoeMachedFilms() {
        moreInfo.innerHTML = ''
        resultsOfSerching.innerHTML = '';

        machedFilms.forEach((it, ind) => {
            let { url, img, title, opis, janr } = it;
            resultsOfSerching.innerHTML += `<div class="machCard" id='${ind}'>
            <img class='machFPoster'src="${img}" alt="img">
            <h5 class='machFTit'>${title}</h5>
        </div>`;

        })
        let machC = document.querySelectorAll('.machCard');
        machC.forEach(item => {
            item.addEventListener('click', () => {
                let { url, img, title, opis, janr } = machedFilms[item.id];

                moreInfo.innerHTML = `<div class="imgWrap">
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
           </div>`

            })
        })

    }
}
function serchByJanr() {
    let moreInfo = document.querySelector('.moreInfo');
    let resultsOfSerching = document.querySelector('.result');
    moreInfo.innerHTML = ''
    resultsOfSerching.innerHTML = '';
    let myJanrs = Array.from(document.querySelectorAll('.act')).map(item => {
        return item = item.innerHTML;
    });

    if (myJanrs.length < 1) return
    let myFilms = [];
    filmArr.forEach(page => {
        page.forEach(fil => {
            myJanrs.forEach(it => {
                if (fil.janr.includes(it)) {
                    myFilms.push(fil)
                }
            })
        })
    })
    myFilms = Array.from(new Set(myFilms));
    myFilms.forEach((it, ind) => {
        let { url, img, title, opis, janr } = it;
        resultsOfSerching.innerHTML += `<div class="machCard" id='${ind}'>
        <img class='machFPoster'src="${img}" alt="img">
        <h5 class='machFTit'>${title}</h5>
    </div>`;

    })
    let machC = document.querySelectorAll('.machCard');
    machC.forEach(item => {
        item.onclick = () => {
            let { url, img, title, opis, janr } = myFilms[item.id];

            moreInfo.innerHTML = `<div class="imgWrap">
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
       </div>`

        }
    })
}

