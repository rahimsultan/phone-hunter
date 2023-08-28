const dataLoad = async(name = 'iphone', isShowAll)=>{
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`)
        const data = await res.json();
        let phones = data.data
        displayData(phones, isShowAll);
        showError(phones)
}

function showError(phones){
    const container = document.getElementById('error');
    phones.length === 0? container.classList.remove('hidden') : container.classList.add('hidden')
}


function displayData(phones, isShowAll){
    const container = document.getElementById('card-container');
    // clear container
    container.textContent ='';
    // for show all button 
    if(phones.length > 12 && !isShowAll){
        document.getElementById('btn-container').classList.remove('hidden')
    }else{
        document.getElementById('btn-container').classList.add('hidden')
    }
    // show first 12 phone
    !isShowAll ? phones = phones.slice(0, 9) : phones
       

    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList = 'card bg-green-100 shadow-xl';
        div.innerHTML = `
        <figure class="px-10 pt-10">
            <img
              src="${phone.image}"
              alt="mobile"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.brand}</h2>
            <p>${phone.phone_name}</p>
            <div class="card-actions">
              <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
        `
        container.appendChild(div)
    });
    // hide spinner
    toggleSpinner(false)
}
// show details
async function showDetails (id){
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const details = data.data;
    displayDetails(details)
}
function displayDetails(details){
    const img = document.getElementById('img');
    img.setAttribute('src', `${details.image}`);
    document.getElementById('name').innerText = `${details.name}`
    document.getElementById('date').innerText =`${details.releaseDate || 'No release date found'}`
    document.getElementById('chip').innerText =`${details.mainFeatures.chipSet || 'Not found'}`
    document.getElementById('display').innerText =`${details.mainFeatures.displaySize|| 'Not found'}`
    document.getElementById('memory').innerText =`${details.mainFeatures.memory || 'Not found'}`
    document.getElementById('storage').innerText =`${details.mainFeatures.storage || 'Not found'}`
    // show modal
    showDetailsModal.showModal()
}

function searchMobile(isShowAll){
    toggleSpinner(true)
    const searchInputValue = document.getElementById('search-input').value
    dataLoad(searchInputValue, isShowAll);
}

function toggleSpinner(isLoading){
    const spinner = document.getElementById('spinner')
    isLoading ? spinner.classList.remove('hidden') : spinner.classList.add('hidden');
}

function showAll(){
    searchMobile(true)
}

dataLoad()