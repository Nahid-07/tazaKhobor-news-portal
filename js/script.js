// api called for display menu
const loadDataOnmenu = async () => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
        const data = await response.json()
        displayMenu(data.data.news_category)
    } catch (error) {
        console.log(error)
    }
}
// display menu 
const displayMenu = (cate) => {
    // console.log(cate);
    const ul = document.getElementById('menu-container');
    cate.forEach(cates => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `<a onclick="showALLNews('${cates.category_id}')" class="fs-4 nav-link" href="#">${cates.category_name}</a>`;
        ul.appendChild(li)
    })
}
loadDataOnmenu()
// call api for showing by id
const showALLNews = (category_id) => {
    loading(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
        .catch(error => console.log(error))
}
// display news on the ui
const displayAllNews = (news) => {
    // news sorting
    news.sort((a,b)=> b.total_view - a.total_view)
    // data found
    const foundData = document.getElementById('found-data');
    foundData.innerText =`${news.length} news found in the category`;
    // display in the ui
    const contentContainer = document.getElementById('content-container');
    contentContainer.textContent = '';
    news.forEach(content => {
        // console.log(content)
        const {thumbnail_url,title,details} = content
        const div = document.createElement('div')

        div.classList.add('col')
        div.innerHTML = ` 
        <div class="card">
        <img src="${thumbnail_url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${details.length > 100 ? details.slice(0,100)+'...': details}</p>
        <div class="d-flex mb-2">
            <div>
                <img src="${content.author.img}" class="rounded-circle" alt="..." width="75px" heigth="75px">
            </div>
            <div class="ms-2">
                <p><span>Author name: ${content.author.name ? content.author.name : 'Found no data'}</span></br>
                <span>${content.author.published_date ? content.author.published_date : 'publish date not found' }</span></p>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div>
                <button type="button" onclick="showModal('${content._id}')" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Read more!
                </button>
            </div>
                <div>
                    <span class="text-secondary"><i class="fa-regular fa-eye"></i> ${content.total_view ? content.total_view : "Found no data"} </span>
                </div>
            </div>
            </div>
        </div>
      `;
        contentContainer.appendChild(div)
    })
    loading(false);
}
// api call by news to show details on modal
const showModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => insideModal(data.data))
        .catch(error => console.log(error) )
}
showModal()
const insideModal = (insideNews)=>{
    // console.log(insideNews)
    const title = document.getElementById('exampleModalLabel')
    const modalBody = document.getElementById('body-modal');
    insideNews.forEach(news => {
        modalBody.innerHTML=`<img src="${news.thumbnail_url }" alt="" width="100%"><p>${news.details}</p><p><img src="${news.author.img}" class="rounded-circle" alt="..." width="75px" heigth="75px"><span class="mx-4">${news.author.name ? news.author.name : 'Found no Name'}</span> <span class="text-secondary"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : "Found no data"} </span></p>`;
        title.innerText=`${news.title}`
    })
}

// loading
const loading = (isLoading) => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}
// called this function for showing one fixed news
showALLNews('01')