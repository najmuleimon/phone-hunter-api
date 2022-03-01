// error message
const errorMsg = document.getElementById('error-msg');

// loader toggle
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}



// search phones
const searchPhone = () => {
    const searchField = document.getElementById('search-phone');
    const searchText = searchField.value.toLowerCase();
    searchField.value = '';

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if(searchText === ''){
        errorMsg.innerText = 'Please write phone names to search';
    }
    else{
        toggleSpinner('block');
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

    toggleSpinner('block');
    
    if(phones.length === 0){
        errorMsg.innerText = 'No phone found';
        toggleSpinner('none');
    }
    else{
        let firstTwenty = phones.slice(0, 20);
        errorMsg.innerText = `Showing ${firstTwenty.length} results of total ${phones.length} products of your search`;

        firstTwenty.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card text-center">
                <img src="${phone.image}" alt="" class="mx-auto">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h3>${phone.brand}</h3>
                    <button onclick="showDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">show details</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
        toggleSpinner('none');
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
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    phoneDetails.innerHTML = `
    <div class="col-lg-5 text-center">
        <img src="${detail.image}" alt="">
    </div>
    <div class="col-lg-7">
        <h3>${detail.name}</h3>
        <h5>${detail.releaseDate ? detail.releaseDate : 'Release date not found'}</h5>
        <h5><span>Brand:</span>${detail.brand}</h5>
        <p><span>Display:</span>${detail.mainFeatures.displaySize}</p>
        <p><span>Chipset:</span>${detail.mainFeatures.chipSet}</p>
        <p><span>Memory:</span>${detail.mainFeatures.memory}</p>
        <h4>Sensors:</h4>
        <ul class="sensors">
            <li>${detail.mainFeatures.sensors[0]},</li>
            <li>${detail.mainFeatures.sensors[1]},</li>
            <li>${detail.mainFeatures.sensors[2]},</li>
            <li>${detail.mainFeatures.sensors[3]},</li>
            <li>${detail.mainFeatures.sensors[4]},</li>
            <li>${detail.mainFeatures.sensors[5]}</li>
        </ul>
        <h4>Others:</h4>
        <ul class="others">
            <li><span>WLAN:</span>${detail.others?.WLAN ? detail.others.WLAN : 'Not Found'}</li>
            <li><span>Bluetooth:</span>${detail.others?.Bluetooth ? detail.others.Bluetooth : 'Not Found'}</li>
            <li><span>GPS:</span>${detail.others?.GPS ? detail.others.GPS : 'Not Found'}</li>
            <li><span>NFC:</span>${detail.others?.NFC ? detail.others.NFC : 'Not Found'}</li>
            <li><span>Radio:</span>${detail.others?.Radio ? detail.others.Radio : 'Not Found'}</li>
            <li><span>USB:</span>${detail.others?.USB ? detail.others.USB : 'Not Found'}</li>
        </ul>
    </div>
    `
}