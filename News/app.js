const key = "b75613a110194ed283d1c1cfa3fd6e6b"
const url = "https://newsapi.org/v2/everything?q="


// function to fetch data from api
async function fetchRes(query) {
    const res = await fetch(`${url}${query}&apiKey=${key}`);
    const data = await res.json();
    return data;
}
fetchRes("all").then(data => mainAccess(data.articles));

let mobBtn = document.querySelector(".mob");
let menuOpt = document.querySelector(".menu-option");

menuOpt.addEventListener('click', () => {
    mobBtn.classList.toggle("hidden");
    mobBtn.classList.toggle("cards");
    
})




// function to access articles in main section
function mainAccess(news) {

    let mainHtml = " "
    for (let i=0; i<news.length; i++) {
        if(news[i].urlToImage){
        mainHtml += `<div class="cards">

                    <a href=${news[i].url}>
                    <img src=${news[i].urlToImage} lazy="loading"/>
                     <h4>${news[i].title} </h4>
                     <div class="date">
                       <p>${news[i].source.name}</p>
                       <p> ${new Date(news[i].publishedAt).toLocaleDateString()} </p>
                     </div>
                     <div class="info">
                     ${news[i].description}
                     </div>
                     </a>
                   
                 </div>`
        }
    }
    document.querySelector("main").innerHTML = mainHtml;
}

const searchInput=document.querySelector("#search-input");
// const mobs=document.querySelector("#searchformob")

const span= document.querySelector("span");
span.addEventListener("click", async(evt)=>{
    evt.preventDefault()
    const data= await fetchRes(searchInput.value);
    mainAccess(data.articles);
})

// function for options available for search
async function search(query)
{
    const data= await fetchRes(query);
    mainAccess(data.articles);
}

// function for transition
let cards=document.querySelector(".cards");
document.querySelector(".cards").addEventListener("click", function() {
    cards.classList.toggle("cards");
  
 });