import { readJsonFile, writeJsonFile, updateData } from "./request.js";
const calendar = document.getElementById("calendar");
// Tableau pout les différnetes heure
const hours = {
    "08": 1,
    "09": 3,
    "10": 5,
    "11": 7,
    "12": 9,
    "13": 11,
    "14": 13,
    "15": 15,
    "16": 17,
    "8.5": 2,
    "9.5": 4,
    "10.5": 6,
    "11.5": 8,
    "12.5": 10,
    "13.5": 12,
    "14.5": 14,
    "15.5": 16
}

// Fonction qui permte d'ajouter un nouveau événement
function addEvent(dt) {

    const div = document.createElement("form");
    div.style.gridRow = `${hours[dt.start]}/${hours[dt.end]}`;
    div.style.gridColumn = `${dt.day}/1 span`;
    div.style.backgroundColor = dt.bgc;
    div.style.color = dt.color;
    div.classList.add("event");
    div.style.borderRadius = "15px";
    div.innerHTML = dt.title;
    div.method = "post";
    const end = dt.end.split(".5")[0];
    const start = dt.start.split(".5")[0];
    div.appendChild(create("titre", dt.title));
    div.appendChild(create("debut", start + ":00"));
    div.appendChild(create("fin", end + ":00"));
    div.appendChild(create("color", dt.color));
    div.appendChild(create("bgc", dt.bgc));
    div.appendChild(create("desc", dt.desc));
    div.appendChild(create("day", dt.day));
    div.appendChild(create("date", dt.date));
    div.appendChild(create("id", dt.id));
    div.appendChild(create("modif", true));
    div.ondblclick = (e) => e.target.submit();

    calendar.appendChild(div);
}

function create(name, value) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
}




const error = document.querySelector("#referentiel .add-ref .msg");
const box_img = document.querySelector("#referentiel .add-ref .box-file img");
const input = document.querySelector("#referentiel .add-ref .group .box-input .input-file");
const extention_valide = ["jpg", "jpeg", "gif", "svg", "png"];
input.onchange = () => {
    const img = input.files[0];
    const extension = img.name.split('.').pop().toLowerCase();
    if (extention_valide.includes(extension)) {
        error.classList.remove("active");
        box_img.src = URL.createObjectURL(img);
    } else {
        error.classList.add("active", "img");
        error.textContent = "vous n'avez pas choisie une image";
    }
};
document.getElementById("select-img").onclick = () => input.click();


const selects = document.querySelectorAll("#multiple .select-content input");

selects.forEach(select => {
    select.onchange = (e) => {
        if (select.name == "tous") {
            if (select.checked == true) {
                selects.forEach(slt => {
                    slt.checked = true;
                });
            }
        } else {
            if (select.checked == false) {
                selects[0].checked = false;
            }
        }
        e.target.form.submit();
    }
});




const list_referentiel = document.querySelector("#referentiel #section-referentiel .content-ref");
readJsonFile("referentiel").then(data=>{
    list_referentiel.innerHTML = "";
    data.forEach(dt=>{
        dt.status = "active";
        const modal = `
        <div class="box">
            <div class="head flex">
                <span class="icon">
                    <i class='bx bx-dots-horizontal-rounded'></i>
                </span>
            </div>
            <div class="head-content flex-col">
                <a class="box-img" href="?ref=${dt.id}">
                    <img src="/img/ref/${dt.image}" alt="">
                </a>
                <div class="info  flex-col">
                    <div class="info-name">
                        ${dt.libelle}
                    </div>
                    <a class="status ${dt.status}" href="?ref=${dt.id}">
                        ${dt.status}
                    </a>
                </div>
            </div>
        </div>
        `;
        list_referentiel.innerHTML += modal;
    })
})

const list_referentiel_dashboard = document.querySelector("#dashboard #list");
readJsonFile("referentiel").then(data => {
    list_referentiel_dashboard.innerHTML = "";
    data.forEach(dt => {
        const modal = `
            <div class="box">
                <div class="info flex">
                    <span class="bold label" style="margin-bottom: 5px;">
                    ${dt.libelle}
                    </span>
                </div>
                <div class="box-img">
                    <img src="/img/ref/${dt.image}" alt="">
                </div>
            </div>
        `;
        list_referentiel_dashboard.innerHTML += modal;
    })
});

const list_apprenant = document.querySelector("#apprenant table");
readJsonFile("apprenant").then(data => {
    list_apprenant.innerHTML = "";
    data.forEach(dt => {
        const modal = `
            <tr>
            <td>
                <span class="head"></span>
                <span class="content flex-cc">
                    <img src="/img/profil/${dt.image}" alt="">
                </span>
            </td>
            <td><span class="head"></span><span class="content ${dt.status}">${dt.nom}</span></td>
            <td><span class="head"></span><span class="content ${dt.status}">${dt.prenom}</span></td>
            <td><span class="head"></span><span class="content"> ${dt.email}</span></td>
            <td><span class="head"></span><span class="content">${dt.genre}</span></td>
            <td><span class="head"></span><span class="content">${dt.telephone}</span></td>
            <td>
                <span class="head"></span>
                <span class="content">
                    <form action="" method="post">
                        <input type="hidden" name="apprenant" value="${dt.matricule}">
                        <select name="action" onchange="this.form.submit();">
                            <option value="">action</option>
                            <option value="modifier">Modifier</option>
                            <option value="afficher">Afficher</option>
                        </select>
                    </form>
                </span>
            </td>
        </tr>
        `;
        list_apprenant.innerHTML += modal;
    })
});




const list_presence = document.querySelector("#presence table");
readJsonFile("presence").then(data => {
    list_presence.innerHTML = "";
    [...data].filter(dt=>dt.status == "present" && dt.en_retard == "oui" && dt.date == "2024-04-10").forEach(dt => {
        console.log(dt);
        const modal = `
        <tr>
            <td><span class="head hd-mat"></span><span class="content matricule">${dt.matricule}</span></td>
            <td><span class="head hd-nom"></span><span class="content">${dt.nom}</span></td>
            <td><span class="head hd-prenom"></span><span class="content">${dt.prenom}</span></td>
            <td><span class="head hd-tel"></span><span class="content">${dt.telephone}</span></td>
            <td><span class="head hd-ref"></span><span class="content">${dt.ref}</span></td>
            <td><span class="head hd-date"></span><span class="content">${dt.date}</span></td>
            <td><span class="head hd-heure"></span><span class="content ${dt.en_retard}">${dt.heure_arrivee}</span></td>
            <td><span class="head hd-status"></span><span class="content ${dt.status}"><span>${dt.status}</span></span></td>
        </tr>
        `;
        list_presence.innerHTML += modal;
    })
});

