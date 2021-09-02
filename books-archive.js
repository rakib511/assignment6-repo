console.log('its working');


// load data
const loadData = () => {
    const searchField = document.getElementById('search-text')
    const searchText = searchField.value;
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displayResult(data))

    searchField.value = '';
}

// display result
const displayResult = data => {
    const totalResult = data.numFound;

    console.log(totalResult)
    if(totalResult > 0){
        const allResults = data.docs;
        const resultInfo = document.getElementById('result-info');
        resultInfo.innerText = `${totalResult} results found. ${allResults.length} showing.`
        console.log(allResults)
        const containerId =  document.getElementById('results')

        allResults.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('card', 'mx-1', 'my-3', 'col-6')

            div.innerHTML = `
                        <div class="col-12">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-12">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-subtitle">by ${book.author_name}</p>
                                <p class="card-text">First published: ${book.first_publish_year}</p>
                            </div>
                        </div>
                `
            containerId.appendChild(div);
        });
    }
};