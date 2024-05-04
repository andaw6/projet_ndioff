const root = {
    "das": document.getElementById("dashboard"),
    "pro": document.getElementById("promotion"),
    "ref": document.getElementById("referentiel"),
    "app": document.getElementById("apprenant"),
    "vis": document.getElementById("visiteur"),
    "pre": document.getElementById("presence"),
    "eve": document.getElementById("evenement"),
};

const links = document.querySelectorAll("aside a");

links.forEach((link, key) => {
    link.addEventListener("click", () => {
        links.forEach((lk, k) => {
            console.log(lk.id);
            if (k != key) {                
                root[lk.id].classList.remove("active");
            }else{
                root[lk.id].classList.add("active");
            }
        });
    });
});