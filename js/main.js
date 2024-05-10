let partMovies = movies.slice(0,100)
let elMovList = document.querySelector('.movises__list')
let elSelCat = document.querySelector('.sel__category')
let elOffcanvasList = document.querySelector('.offcanvas__list')
let iconData = []
fnRender(partMovies)
function fnRender(data){
  if(window.localStorage.getItem('localMovie')){
    iconData = JSON.parse(window.localStorage.getItem('localMovie'))
  }
  elMovList.innerHTML = ''
  data.forEach((item, index)=>{
    let newLi = document.createElement('li')
    newLi.classList = 'movies__item'
    newLi.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" class="card-img-top" alt="...">
    <div class="card card-body">
      <h5 class="card-title d-flex align-items-center justify-content-between">
      ${item.Title.toString().slice(0,25)} 
      <i onclick="fnLoveMovie('${item.ytid}')" 
      class="${iconData.find(i=> i.ytid == item.ytid) ? "bi bi-heart-fill":"bi bi-heart"}"></i></h5>
      <p class="card-text">${item.Categories.toString().slice(0,30)}</p>
      <p class="card-text">${item.movie_year}</p>
      <h4 class="card-text">${item.imdb_rating}</h4>
      <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" class="btn btn-warning">Watch now</a>
    </div>
  </div>
    `
    elMovList.appendChild(newLi)
})

}


function fnYear(value){
  if(value == 'old'){
    fnRender(partMovies.sort((a,b)=> a.movie_year - b.movie_year));
  }else{
    fnRender(partMovies.sort((a,b)=> b.movie_year - a.movie_year));
  }
}


function fnRanting(value){
  if(value == 'min'){
    fnRender(partMovies.sort((a,b)=> a.imdb_rating - b.imdb_rating));
  }else{
    fnRender(partMovies.sort((a,b)=> b.imdb_rating - a.imdb_rating));
  }
}

let arrCategory = []
partMovies.forEach((item)=>{
  if(!arrCategory.includes(item.Categories)){
    arrCategory.push(item.Categories)
  }
})

arrCategory.forEach(item=>{
  let newOption = document.createElement('option')
  newOption.textContent = item
  newOption.value = item
  elSelCat.appendChild(newOption)
})

function fnCategory(value){
  fnRender(partMovies.filter((item)=> item.Categories == value));
}

function movieSearch(e){
  e.preventDefault()
  let mov = e.target.mov.value
  fnRender(partMovies.filter((i)=> 
  i.Title.toString().toLowerCase().includes(mov.toLowerCase()) &&
  i.Title.toString().toLowerCase()[0] == mov.toLowerCase()[0] 
  ));
}



let intialLocalData = []
function fnLoveMovie(id){
  if(window.localStorage.getItem('localMovie')){
    intialLocalData = JSON.parse(window.localStorage.getItem('localMovie'))
  }
  if(intialLocalData.find((item)=> item.ytid == id)){
    let filData = intialLocalData.filter((item)=> item.ytid != id)
    window.localStorage.setItem('localMovie', JSON.stringify(filData))
  }else{
    intialLocalData.push(partMovies.find((item)=> item.ytid == id))
    window.localStorage.setItem('localMovie', JSON.stringify(intialLocalData))
  }
  fnRender(partMovies)

}


function fnGetLoveMove(){
  elOffcanvasList.innerHTML = ''
  let getLocData = JSON.parse(window.localStorage.getItem('localMovie'))
  getLocData.forEach((item)=>{
    let newLi = document.createElement('li')
    newLi.classList = 'd-flex align-items-center justify-content-between mt-3'
    newLi.innerHTML = `
        <img width="40" height="40" src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" alt="">
        <p > ${item.Title}</p>
        <button class="btn btn-warning">Watch</button>
    `
    elOffcanvasList.appendChild(newLi)
  })
}

document.addEventListener('contextmenu', function (p) {
    p.preventDefault();
    alert("(Error) You cannot copy!!!");
});
window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.code === 'KeyU') {
        event.preventDefault();
        alert('You cannot copy!!!');
    }
});
window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
        event.preventDefault(); 
        alert('Do not copy!!!');
    }
});