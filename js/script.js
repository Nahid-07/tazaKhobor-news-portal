const loadDataOnmenu = async() =>{
    try{
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await response.json()
        displayMenu(data.data.news_category)
    }
    catch(error){
        console.log(error)
    }
}
const displayMenu = (cate)=>{
    console.log(cate);
    const ul = document.getElementById('menu-container');
    cate.forEach(cates => {
        const li= document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML=`<a class="nav-link" href="#">${cates.category_name}</a>`;
        ul.appendChild(li)
    })
}
loadDataOnmenu()