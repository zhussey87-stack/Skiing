
const resorts = [

{name:"Killington",lat:43.626,lng:-72.796,webcam:"https://www.youtube.com/embed/M6GdFfbbJ9s"},
{name:"Sugarloaf",lat:45.031,lng:-70.313,webcam:"https://www.youtube.com/embed/kN8J7O-3rHc"},
{name:"Sunday River",lat:44.473,lng:-70.856,webcam:"https://www.youtube.com/embed/6YVb5yMydhM"},
{name:"Stowe",lat:44.529,lng:-72.781,webcam:"https://www.youtube.com/embed/2yJgwwDcgV8"},
{name:"Jay Peak",lat:44.937,lng:-72.504,webcam:"https://www.youtube.com/embed/jg6rVZp1Jt0"},
{name:"Whiteface",lat:44.365,lng:-73.903,webcam:"https://www.youtube.com/embed/W7Y0nY5Ch6E"},
{name:"Sugarbush",lat:44.136,lng:-72.894,webcam:"https://www.youtube.com/embed/XWbbJ6nL-Kk"},
{name:"Okemo",lat:43.402,lng:-72.717,webcam:"https://www.youtube.com/embed/RBf0SMZpAow"},
{name:"Stratton",lat:43.113,lng:-72.906,webcam:"https://www.youtube.com/embed/x5X5zF7O24U"},
{name:"Mount Snow",lat:42.960,lng:-72.913,webcam:"https://www.youtube.com/embed/w0OBc2H0YHQ"},
{name:"Gore",lat:43.673,lng:-74.009,webcam:"https://www.youtube.com/embed/txaS4i0qZgY"},
{name:"Hunter",lat:42.204,lng:-74.210,webcam:"https://www.youtube.com/embed/zR0C4V7sJzk"},
{name:"Windham",lat:42.293,lng:-74.256,webcam:"https://www.youtube.com/embed/Rg9PG3iI0yE"},
{name:"Cannon",lat:44.156,lng:-71.698,webcam:"https://www.youtube.com/embed/5lJYkqjTe2E"},
{name:"Loon",lat:44.036,lng:-71.629,webcam:"https://www.youtube.com/embed/Bwz8d3N7EY8"},
{name:"Bretton Woods",lat:44.259,lng:-71.441,webcam:"https://www.youtube.com/embed/JxB7ZgTwK9g"},
{name:"Wildcat",lat:44.259,lng:-71.201,webcam:"https://www.youtube.com/embed/pTzq4o7O9eA"},
{name:"Waterville Valley",lat:43.958,lng:-71.501,webcam:"https://www.youtube.com/embed/XkG9W2UVl7E"},
{name:"Snowshoe",lat:38.411,lng:-79.993,webcam:"https://www.youtube.com/embed/tpB6A3P9A1c"},
{name:"Smugglers Notch",lat:44.587,lng:-72.781,webcam:"https://www.youtube.com/embed/x1k3QpU2FvE"}

]

async function getSnowfall(lat,lng){

let url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=snowfall`

let response=await fetch(url)

let data=await response.json()

let snowfall=data.hourly.snowfall.slice(-24)

let total=snowfall.reduce((a,b)=>a+b,0)

return total.toFixed(1)

}

async function displayResorts(){

let grid=document.getElementById("resortGrid")

grid.innerHTML=""

for(let resort of resorts){

let snow=await getSnowfall(resort.lat,resort.lng)

resort.snow=snow

grid.innerHTML+=`

<div class="card">

<h2>${resort.name}</h2>

<iframe src="${resort.webcam}"></iframe>

<div class="snow">❄ ${snow}" last 24h</div>

</div>

`

}

updateLeaderboard()

}

function updateLeaderboard(){

let sorted=[...resorts].sort((a,b)=>b.snow-a.snow)

let top=sorted.slice(0,3)

document.getElementById("leaderboard").innerHTML=

`🏆 Powder Leaderboard
<br>
1️⃣ ${top[0].name} (${top[0].snow}")
<br>
2️⃣ ${top[1].name} (${top[1].snow}")
<br>
3️⃣ ${top[2].name} (${top[2].snow}")`

}

function sortSnow(){

resorts.sort((a,b)=>b.snow-a.snow)

displayResorts()

}

displayResorts()

setInterval(displayResorts,300000)
