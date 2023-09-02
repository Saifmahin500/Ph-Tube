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
    //  console.log(finalData2)
    viewsData = finalData2;
    // console.log(viewsData)
    
    
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = "";
    finalData2?.forEach(video => {

        const time =video?.others.posted_date;
        const hours = Math.floor(time / (60 * 60));
        const minutes = Math.floor((time % (60 * 60)) / 60);
        // console.log(video);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card h-[400px] bg-base-100 shadow-xl">
        <figure class="relative"><img class="h-[200px] w-full" src="${video?.thumbnail}"/>
        <p class="absolute bottom-4  right-4 px-2 py-1 rounded-lg bg-black text-white">${time?` ${hours} hrs ${minutes} min ago` : '<p> </p>'
    }  </p >
        </figure >
                <div class="card-body">
                <div class="flex gap-4">
                     <div>
                <img class="w-14 h-14 rounded-full" src="${video?.authors[0]?.profile_picture}" />
            </div>
            <div class="flex-1">
                <h1 class="font-bold"> ${video.title} </h1>
                <div class="flex gap">
                    <p>${video?.authors[0]?.profile_name}</p>
                    <p>${video?.authors[0].verified ? '<img src="image/fi_10629607.png">' : '<p> </p>'} </p>
                </div>
                <p> ${video?.others?.views}views</p>
            </div>
        </div>
    </div>
        
        
        `
        cardContainer.appendChild(div);
    })
    
    const drawingContainer = document.getElementById('drawing-btn')
    if (finalData2.length === 0) {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="flex justify-center items-center flex-col gap-4">
        <img src="image/Icon.png" alt="">
            <h1 class="text-5xl font-bold text-center"> Oops!! Sorry, There is no <br> content here </h1>
        </div>
        
        `
        drawingContainer.appendChild(div)
        
    }
    else{
        drawingContainer.innerHTML = "";
    }
}

    // const sortViewContainer = document.getElementById('sort-view')

    const handleView = () =>{
    
        const viewHighest = viewsData.sort((a,b) => parseFloat(b?.others?.views) - parseFloat (a?.others?.views))
        console.log(viewHighest)
    
        handleLoadVideo(viewHighest)
    }





    // const handleSortView = async () => {
    //     const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000')
    //     const data = await res.json()
    //     const finalView3 = data.data;
    //     // console.log(finalView3)

    //     const sortNumberView =  finalView3.sort();
    //     console.log(sortNumberView);


    // }
  
// handleSortView();
handleLoadVideo(1000);
handleCategory();