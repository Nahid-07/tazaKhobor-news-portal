const loadDataOnmenu = async() =>{
    try{
        const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
        const data = await response.json()
        displayMenu(data.data.news_category)
    }
    catch(error){
        console.log(error)
    }
}
const displayMenu = (cate)=>{
    // console.log(cate);
    const ul = document.getElementById('menu-container');
    cate.forEach(cates => {
        const li= document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML=`<a onclick="showALLNews('${cates.category_id}')" class="nav-link" href="#">${cates.category_name}</a>`;
        ul.appendChild(li)
    })
}
loadDataOnmenu()

const showALLNews = (category_id)=>{
    loading(true)
    const url =`https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllNews(data.data))
}
// showALLNews()
const displayAllNews = (news) =>{
    console.log(news);
    
    const contentContainer = document.getElementById('content-container');
    contentContainer.textContent ='';
    news.forEach(content => {
     console.log(content)
     const {thumbnail_url, title, details } = content
    //  const {img} = author
     const div = document.createElement('div')
     div.classList.add('col')
     div.innerHTML =` 
     <div class="card">
     <img src="${thumbnail_url}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${title}</h5>
       <p class="card-text">${details.length > 100 ? details.slice(0,100): details}</p>
       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Read more!
      </button>
     </div>
    </div>
     `;
     contentContainer.appendChild(div)
    })
    loading(false);
}
const showModal = (category_id)=>{
    const url =`https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => show(data.data))
}
const loading = (isLoading) => {
    const loader = document.getElementById('loader')
    if(isLoading){
        loader.classList.remove('d-none');
    }else{
        loader.classList.add('d-none');
    }
}