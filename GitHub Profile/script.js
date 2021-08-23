const APIURL = 'http://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')

const main = document.getElementById('main')




async function getUser(username) {
    try {
        
        const res = await axios(APIURL + username )
        createUserCard(res.data)
        getUser(username)



    } catch (error) {
            createErrorCard('No profile find with this username')
        
    }

}

async function getRepos(username){
    try {
        const res = await axios(APIURL + username + "/repos")
        addReposToCard(res.data)



    } catch (error) {
            createErrorCard('Problem fetching repos')
        
    }
}



function createUserCard(user){
    const cardHTML = `
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class= "avatar">
            </div>
            <div class = "user-info">
                <h1>${user.name}</h1>
                <p>${user.bio} </p>
                
                <ul>
                    <li>${user.followers}</li> <strong>Followers</strong></li>
                    <li>${user.following}<strong>Followings</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                    
                </ul>
                
                <div id="repos">
                    
                </div>
            </div>
        </div>
    
    
    `
    main.innerHTML = cardHTML
}

function createErrorCard(msg){
    const cardHtml = `
    <div class="card">
        <h1>${msg}</h1>
    </div>
    
    `
    main.innerHTML = cardHtml
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos.forEach(repo =>{
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerHTML = repo.name

        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;
    if (user){
        getUser(user)
        search.value =""
    }
})