const searchPhone = () => {
    const searchField = document.getElementById('search-phone')
    const searchText = searchField.value
    searchField.value = ''

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(response => response.json())
    .then(data => loadPhone(data))
}

const loadPhone = phones => {
    console.log(phones);
}