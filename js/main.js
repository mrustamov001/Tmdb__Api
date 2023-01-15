let wrapper = document.querySelector('.wrapper')
let btn = document.querySelectorAll('.btn')
let prev = document.querySelector('.prev')
let text = document.querySelector('.text')
let next = document.querySelector('.next')


let page = 1
let category = ''


btn.forEach(item => {
    item.addEventListener('click', function(){
        get(item.dataset.item);
        page=1
        updateText()
    })
})

async function get(item, count=1){
    category = item
    let data = await fetch(
        // `https://api.themoviedb.org/3/search/movie?query=monstrous&api_key=c2847ee5ae5ffca9842280e6f3078881&language=en-US&page=1&include_adult=false`
        `https://api.themoviedb.org/3/movie/${item}?api_key=c2847ee5ae5ffca9842280e6f3078881&language=en-US&page=${count}`
        // `https://api.themoviedb.org/3/tv/${item}?api_key=c2847ee5ae5ffca9842280e6f3078881&language=${count}`
        )
    let parseData = await data.json()
    console.log(parseData);
    render(parseData.results)
}
// async function search(){
//     let dataSearch = await fetch(
//         `https://api.themoviedb.org/3/search/movie?api_key=c2847ee5ae5ffca9842280e6f3078881&language=en-US&page=1&include_adult=false`
//         // `https://api.themoviedb.org/3/tv/${item}?api_key=c2847ee5ae5ffca9842280e6f3078881&language=${count}`
//         )
//     let parseDataSearch = await dataSearch.json()
//     console.log(parseDataSearch);
//     render(parseDataSearch)
// }
// search()

function render(arr){
    wrapper.innerHTML=null

    for(let i of arr){
        let div = document.createElement('div')
        let searchMovies = `https://www.themoviedb.org/movie/${i.id}?language=ru`
        div.classList.add('card')
        div.setAttribute('style', 'width:18rem')
        div.innerHTML=`
        <img src="http://image.tmdb.org/t/p/w500/${i.poster_path}" width={200} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${i.title}</h5>
            <p class="card-text">${i.overview}</p>
            <button type="submit" class="btn btn-primary"><a class="text-white text-none" href=${searchMovies}>submit</a></button>
        </div>
        `

        wrapper.append(div)
    }
};


next.addEventListener('click', function(){
    page +=1
    get(category,page)
    updateText()
})

function updateText(){
    text.textContent = page
}

prev.addEventListener('click', function(){
    if(page !== 1){
        page -= 1
        get(category,page)
        updateText()
    }
})