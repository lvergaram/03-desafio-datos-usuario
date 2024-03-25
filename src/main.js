let USERS_TO_FIND = 10 
const API_URL = `https://randomuser.me/api/?results=${USERS_TO_FIND}`


const [userGrid, title,cardTemplate] = selectDomElements("#userGrid",".text-center","#cardTemplate"); 

const usersApp = ( () => {
    async function privateGetUsers(privateUrl){
        try{
            const data = await fetch(privateUrl)
            if(!data) throw new Error('data no encontrada')
            const {results} = await data.json()
            console.log(results)
            userGrid.innerHTML = ''
            title.textContent = `${results.length} ususarios encontrados:`
            results.forEach(user => {
                userGrid.innerHTML += `
                <div class="card col-3" >
                <img src="${user.picture.large}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
                  <p class="card-text">${user.dob.age} años, de la ciudad de ${user.location.city}, ${user.location.country}.</p>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">${user.email}</li>
                  <li class="list-group-item">${user.phone}</li>
                </ul>
                <div class="card-body">
                  <a href="#" class="card-link">RRSS</a>
                  <a href="#" class="card-link">Contactar</a>
                </div>
              </div>
                `
            });


        } catch(error) {
            console.log(error)
        }
    }

    return {
        getUsers(url){ 
            privateGetUsers(url)
        }
    }

})()


// Function
function selectDomElements(...selectors){
    return selectors.map( selector => document.querySelector(selector) )
}


document.addEventListener('DOMContentLoaded', () => {
    usersApp.getUsers(API_URL)
})
