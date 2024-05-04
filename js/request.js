// Fonction qui permet d'ajouter des données dépuis un fichier json
export function writeJsonFile(path, data) {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:3000/' + path, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout des données');
            }
            return response.json();
        })
        .then(data => {
            console.log('Données ajoutées avec succès :', data);
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}


// Fonction qui permet de récupérer les données dépuis un fichier json
export async function readJsonFile(path) {
    try {
        const response = await fetch('http://localhost:3000/' + path);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        console.log("Les données ont bien été récupérées");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur :', error);
        return null;
    }
}


// Fonction qui permet de mettre à jour les données dépuis un fichier json 
export async function updateData(path, id, data) {
    try {
        const response = await fetch(`http://localhost:3000/${path}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        if (!response.ok) {
            throw new Error('Erreur lors de la modification des données');
        }

        console.log('Données modifiées avec succès :');

        return await response.json();
    } catch (error) {
        console.error('Erreur :', error);
        return null;
    }
}


// readJsonFile("presence").then(data=>{
//     const datas = [...data].filter(dt=>dt.status=="present"&& dt.en_retard=="non"&&dt.date=="2024-03-20");
//     console.table(datas);
// })

