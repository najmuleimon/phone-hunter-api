const searchPhone = () => {
    const searchField = document.getElementById('search-phone')
    const searchText = searchField.value
    searchField.value = ''

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhones(data.data))
}

const displayPhones = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${phone.image}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <h3>${phone.brand}</h3>
                        <button onclick="showDetails(${phone.slug})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">show details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const showDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}