const clearErrorMessage = () => {
    document.getElementById( 'error-container' ).innerHTML = '';
}

const displaySpinner = ( displayStyle ) => {
    document.getElementById( 'spinner' ).style.display = displayStyle;
}
displaySpinner( 'none' );

const displayErrorMessage = ( message ) => {
    document.getElementById( 'error-container' ).innerHTML = `
            <h3 class="text-danger fw-bold text-center">${ message }</h3>
        `;
}

const displaySearchCounter = ( counter ) => {
    const searchCounter = document.getElementById( 'search-counter' );
    searchCounter.innerHTML = `
        Books Found: ${ counter }
    `;
}

const clearSearchCounter = () => {
    document.getElementById( 'search-counter' ).innerHTML = '';
}

const clearResultContainer = () => {
    document.getElementById( 'result-container' ).innerHTML = '';
}

const loadBookData = ( bookName ) => {
    const url = `https://openlibrary.org/search.json?q=${ bookName }`;
    fetch( url )
        .then( res => res.json() )
        .then( data => displayBookData( data ) );
}

const displayBookData = ( books ) => {
    const resultContainer = document.getElementById( 'result-container' );
    displaySpinner( 'none' );

    if ( books.numFound === 0 ) {
        displayErrorMessage( 'NO BOOK FOUND! PLEASE SEARCH AGAIN!!!' );
        return;
    }
    else {
        clearResultContainer();
        displaySearchCounter( books?.numFound );

        books?.docs?.forEach( book => {
            const div = document.createElement( "div" );
            div.classList.add( 'col' );
            div.innerHTML = `
                <div class="card h-100">
                    <img src="" class="card-img-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title fw-bold text-primary"><b>Name:</b> ${ book.title ? book.title : 'Not Avaialable' }</h5>
                        <p class="card-text"><b>Authors: </b> ${ book.author_name ? book.author_name : 'Not Avaiable' }</p>
                        <p class="card-text"><b>Publisher: </b> ${ book.publisher ? book.publisher.slice( 0, 10 ) : 'Not Available' }</p>
                        <p class="card-text"><b>First Published: </b> ${ book.first_publish_year ? book.first_publish_year : 'Not Available' }</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            `;
            resultContainer.appendChild( div );
            console.log( book );
        } );
    }
}

document.getElementById( 'search-button' ).addEventListener( 'click', () => {
    clearSearchCounter();
    clearResultContainer();
    const searchField = document.getElementById( 'search-field' );
    const searchText = searchField.value;
    if ( searchText.length === 0 ) {
        displayErrorMessage( 'PLEASE ENTER A BOOK NAME!!!' );
        return;
    }
    else {
        clearErrorMessage();
        displaySpinner( 'block' );
        searchField.value = '';
        loadBookData( searchText );
    }
} );