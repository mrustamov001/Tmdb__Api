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
        `https://api.themoviedb.org/3/movie/${item}?api_key=c2847ee5ae5ffca9842280e6f3078881&language=en-US&page=${count}`
        // `https://api.themoviedb.org/3/tv/${item}?api_key=c2847ee5ae5ffca9842280e6f3078881&language=${count}`
        )
    let parseData = await data.json()
    render(parseData.results)
}

function render(arr){
    wrapper.innerHTML=null

    for(let i of arr){
        let div = document.createElement('div')
        div.classList.add('card')
        div.setAttribute('style', 'width:18rem')
        div.innerHTML=`
            <img src="http://image.tmdb.org/t/p/w500/${i.poster_path}" width={200} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${i.title}</h5>
                <p class="card-text">${i.overview}</p>
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