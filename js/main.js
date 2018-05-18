var button = document.getElementById('show');
var table = document.getElementById('data');
var btnData = document.getElementsByClassName('dataModal');
var currentTime = document.getElementById('currentTime');
let header = table.createTHead()
let currentHeader = currentTime.createTHead()
var row = header.insertRow(0)
var currentRow = currentHeader.insertRow(0);
var buttonModal = `
<button type="button" class="btn dataModal" data-toggle="modal" data-target="#modelId">
    Show
</button>
`
var obj, ind = 0;
var d = [];
var currentDate = new Date();
row.innerHTML = `
    <th>Hijri Date</th>
    <th>Day</th>
    <th>Calendar Date</th>
    <th>Sahar</th>
    <th>Iftaar</th>
    `
currentRow.innerHTML = `
    <th>Hijri Date</th>
    <th>Day</th>
    <th>Calendar Date</th>
    <th>Sahar</th>
    <th>Iftaar</th>
    `
/**
 * Fetching Data from a JSON file and then populating the table as it reads.
 */
fetch('js/timings.json').then(response =>{
    return response.json()
}).then(data => {
    let obj = JSON.parse(JSON.stringify(data))
    for (var index = 0; index < obj.length; index++) {
        var str = obj[index].GregorianCalendar.toString();
        if(currentDate.getDate() == parseInt(str.substr(0, 2))){
            let currentData = currentTime.insertRow(1);
            currentData.insertCell(0).innerText = obj[index].HijriCalendar
            currentData.insertCell(1).innerText = obj[index].Day
            currentData.insertCell(2).innerText = obj[index].GregorianCalendar
            currentData.insertCell(3).innerText = obj[index].Sahoor
            currentData.insertCell(4).innerText = obj[index].Iftaar
            for (let i = index + 1; i < obj.length; i++){
                let row = table.insertRow(i-1);
                row.insertCell(0).innerText = obj[i].HijriCalendar
                row.insertCell(1).innerText = obj[i].Day
                row.insertCell(2).innerText = obj[i].GregorianCalendar
                row.insertCell(3).innerText = obj[i].Sahoor
                row.insertCell(4).innerText = obj[i].Iftaar
            }
            
            break;
        }
        ind++;
    }
})

//functions

function toggleTimings() {
    var timing = document.getElementById('timing');
    timing.style.display = 'block';   
}

button.onclick = toggleTimings;

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js',{scope:"/ramadanApp/"}).then(function(reg) {
        console.log("Service Worker Registered")
    }).catch(function(error){
        console.log(error)
    });
}
