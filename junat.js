const xhr = new XMLHttpRequest();
//luo XMLHttpRequest tyyppisen muuttujan

let junat = [];
//luo juna-arrayn
const optiot = {hour: '2-digit', minute:'2-digit', hour12: false};
//kellonajan muotoilua

//Toteuta funktio haedata(), jossa teet avaat XHR olion yhteyden ja lähetät pyynnön, muista kutsua funtiota
xhr.onreadystatechange = function haeData() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            const junat = JSON.parse(xhr.responseText);
            //JSON.parse muuttaa json-olion tekstimuotoon
            console.dir(xhr.responseText);
            for (juna of junat) {
                const li = document.createElement("li");
                const lähtö = new Date(juna.timeTableRows[0].scheduledTime).toLocaleTimeString("fi-Fi", optiot)
                const saapuu = new Date(juna.timeTableRows[juna.timeTableRows.length-1].scheduledTime).toLocaleTimeString("fi-Fi", optiot)
                //haetaan data taulukon viimeisestä solusta

                li.innerHTML = `tyyppi ${juna.trainType} ${juna.trainNumber} 
                            ${juna.trainCategory} ${lähtö} 
                            ${saapuu}`;
                            
                lista.appendChild(li);
            }

        } else {
            alert("ei toimi");
        }

    }
    for (let i = 0; i < junat.length; i++) {
        //looppaa haeData-funktion koko juna-arrayn läpi
    }

};
xhr.open('GET', 'https://rata.digitraffic.fi/api/v1/live-trains/station/HKI/LH');
xhr.send();


let 