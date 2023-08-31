const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const finalData = data.data;
    // console.log(finalData);
    const btnContainer = document.getElementById('btn-container')
    finalData.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick ="handleLoadVideo('${category.category_id}')" class="btn hover:bg-red-500">${category.category}</button>
        
        `
        btnContainer.appendChild(div);
    });
}

const handleLoadVideo = async (categoryId) => {
    
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    const finalData2 = data.data;
    // console.log(finalData2)
    
    
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = "";
    finalData2?.forEach(video => {
        console.log(video);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card h-[400px] bg-base-100 shadow-xl">
                <figure>
                <img class="w-[300px] h-[200px]" src=${video?.thumbnail} alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">${video?.title}</h2>
                </div>

                <h4>Total view : ${ video.others.views} </h4>
              </div>
        
        
        `
        cardContainer.appendChild(div);
    })
    

}



handleLoadVideo();
handleCategory();