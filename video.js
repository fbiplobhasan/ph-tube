

//  1 fetch load and show categories on html

// create load category
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

// fetch videos data
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error => console.log(error)))
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
    const videosContainer = document.getElementById('videos')

    // loopVideos with no return
    videos.forEach((video) => {
        console.log(video);

        // createCard
        const card = document.createElement('div')
        card.classList = 'card card-compact'
        card.innerHTML = `
         <div class="w-full max-w-sm mx-auto border rounded-lg overflow-hidden shadow">
  <!-- Thumbnail -->
  <figure class="h-[200px]">
    <img
      src="${video.thumbnail}"
      class="h-full w-full object-cover"
      alt="Video Thumbnail" />
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
      <img class="" src="https://img.icons8.com/?size=32&id=2AuMnRFVB9b1&format=png"/>
      </div>
      <p class="text-sm text-gray-500">${video.others.published_date}</p>
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
        const button = document.createElement('button')
        button.classList = 'btn';
        button.innerText = item.category;

        // add button to categoryContainer
        categoryContainer.append(button);
    });
};


loadCategories();
loadVideos();