const loadData =async()=>{
    try{
        const respose = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await respose.json()
        console.log(data.data.news_category)
    }
    catch(error){
        console.log(error);
    }
}
loadData()