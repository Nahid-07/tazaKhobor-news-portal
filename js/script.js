const loadData =async()=>{
    try{
        const respose = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await respose.json()
        return(data.data.news_category)
    }
    catch(error){
        console.log(error);
    }
}
// display category on menu
const loadDataMenu = async()=>{
    const data =await loadData();
    // console.log(data)
    const menuContainer = document.getElementById('menu-container');
    data.forEach(cate => {
        // console.log(cate);
        const li =document.createElement('li');
        li.innerHTML=`<a onclick="loadNewaData(id)">${cate.category_name}</a>`;
        menuContainer.appendChild(li)
    })
}
loadDataMenu()