function getTimeString(time) {
    // get hours and rest second
    const hour = parseInt(time / 3600);
    let remainingSecond = parseInt(time % 3600);
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

//  1 fetch load and show categories on html

// create load category
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

// fetch videos data
const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error => console.log(error)))
}

// removeActive class when other button clicked
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    console.log(buttons);

    for (let btn of buttons) {
        btn.classList.remove('active');
    }

}

// loadCategoryVideoWithId

const loadCategoryVideoWithId = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {

            // ActiveClass Remove
            removeActiveClass();
            // activeId Class

            const btnActive = document.getElementById(`btn-${id}`);
            btnActive.classList.add("active")
            displayVideos(data.category)
        })
        .catch((err) => console.log(err));
}

// loadVideoDetailsWithId
const loadVideoDetails = async (videoId) => {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri);
    const data = await res.json();
    // console.log(data);
    displayVideoDetails(data.video)
}

// displayVideoDetails
const displayVideoDetails = (video) => {
console.log(video);
const detailsContainer = document.getElementById('modal-content')

detailsContainer.innerHTML = `
<img src=${video.thumbnail} alt="">
    <p>${video.description}</p>
`


// way-1
// document.getElementById('showModalData').click();

// way-2
document.getElementById('customModal').showModal();
}

// {
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }


const displayVideos = (videos) => {
    // get videosContainer parent
    const videosContainer = document.getElementById('videos');

    // emptyContainer
    videosContainer.innerHTML = "";

    // noLength return

    if (videos.length == 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
        <div class="min-h-[600px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/icon.png" />
        <p class="font-bold text-xl">NO CONTENT HERE IN THIS CATEGORY</p>
        </div>
        `;
        return
    } else {
        videosContainer.classList.add('grid')
    }

    // loopVideos with no return
    videos.forEach((video) => {
        console.log(video);

        // createCard
        const card = document.createElement('div')
        card.classList = 'card card-compact'
        card.innerHTML = `
         <div class="w-full max-w-sm mx-auto border rounded-lg overflow-hidden shadow">
  <!-- Thumbnail -->
  <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
      class="h-full w-full object-cover"
      alt="Video Thumbnail" />
      ${video.others?.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-white bg-black rounded p-1">${getTimeString(video.others?.posted_date)}</span>`
            }
      
  </figure>

  <!-- Profile info -->
  <div class="px-4 py-3 flex gap-3 items-start">
    <!-- Author Image -->
    <div>
      <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="Author" />
    </div>

    <!-- Author Info -->
    <div>
      <h2 class="font-semibold">${video.title}</h2>
      <div class="flex gap-2 items-center">
      <p class="text-sm text-gray-600">${video.authors[0].profile_name} views</p>
      ${video.authors[0].verified ? `<img class="w-4 h-4 inline-block" src="https://img.icons8.com/color/48/000000/verified-badge.png
        " alt="">`: ""}
      </div>
      <p>
      <button onClick="loadVideoDetails('${video.video_id}')" class="text-sm text-gray-500 btn btn-sm btn-error">Details</button>
      </p>
    </div>
  </div>
</div>

        `;
        videosContainer.append(card);
    })

}


// create displayCategory
const displayCategories = (categories) => {

    // get categoryContainer parent
    const categoryContainer = document.getElementById('categories')

    categories.forEach((item) => {
        console.log(item);

        // create a button
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onClick="loadCategoryVideoWithId(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `
        // add button to categoryContainer
        categoryContainer.append(buttonContainer);
    });
};


document.getElementById('search-input').addEventListener('keyup', (e)=> {
 loadVideos(e.target.value);   
})
loadCategories();
loadVideos();