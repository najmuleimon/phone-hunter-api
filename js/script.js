// error message
const errorMsg = document.getElementById('error-msg')

// search phones
const searchPhone = () => {
    const searchField = document.getElementById('search-phone')
    const searchText = searchField.value.toLowerCase()
    searchField.value = ''

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if(searchText === ''){
        errorMsg.innerText = 'Please write phone names to search'
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(response => response.json())
        .then(data => displayPhones(data.data))
    }
}

// display search phones
const displayPhones = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if(phones.length === 0){
        errorMsg.innerText = 'No phone found'
    }
    else{
        let firstTwenty = phones.slice(0, 20)
        errorMsg.innerText = `show ${firstTwenty.length} results of total ${phones.length} products of your search`

        firstTwenty.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <div class="row g-0">
                    <div class="col-md-6">
                        <img src="${phone.image}" class="img-fluid rounded-start" alt="">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <h3>${phone.brand}</h3>
                            <button onclick="showDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">show details</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
    
}

// show details of phones
const showDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}


// display phone details in modals
const displayDetails = detail => {
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = ''
    const div = document.createElement('div')
    div.innerHTML = `
        <img src="${detail.image}" alt="">
        <h3>${detail.name}</h3>
        <h5>${detail.releaseDate ? detail.releaseDate : 'Release date not found'}</h5>
        <h5>${detail.brand}</h5>
        <p>${detail.mainFeatures.displaySize}</p>
        <p>${detail.mainFeatures.chipSet}</p>
        <p>${detail.mainFeatures.memory}</p>
        <p>Sensors</p>
        <ul>
            <li>${detail.mainFeatures.sensors[0]}</li>
            <li>${detail.mainFeatures.sensors[1]}</li>
            <li>${detail.mainFeatures.sensors[2]}</li>
            <li>${detail.mainFeatures.sensors[3]}</li>
            <li>${detail.mainFeatures.sensors[4]}</li>
            <li>${detail.mainFeatures.sensors[5]}</li>
        </ul>
        <p>Others</p>
        <ul>
            <li>${detail.others?.WLAN ? detail.others.WLAN : ''}</li>
            <li>${detail.others?.Bluetooth ? detail.others.Bluetooth : ''}</li>
            <li>${detail.others?.GPS ? detail.others.GPS : ''}</li>
            <li>${detail.others?.NFC ? detail.others.NFC : ''}</li>
            <li>${detail.others?.Radio ? detail.others.Radio : ''}</li>
            <li>${detail.others?.USB ? detail.others.USB : ''}</li>
        </ul>
    `
    phoneDetails.appendChild(div)
}