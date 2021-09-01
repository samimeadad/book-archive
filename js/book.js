const displaySpinner = ( displayStyle ) => {
    document.getElementById( 'spinner' ).style.display = displayStyle;
}
displaySpinner( 'none' );

const displayErrorMessage = ( message ) => {
    document.getElementById( 'error-container' ).innerHTML = `
            <h3 class="text-danger fw-bold text-center">${ message }</h3>
        `;
}
const clearErrorMessage = () => {
    document.getElementById( 'error-container' ).style.display = 'none';
}

const clearResultContainer = () => {
    document.getElementById( 'result-container' ).innerHTML = '';
}

const searchBookData = ( bookName ) => {
    const url = `https://openlibrary.org/search.json?q=${ bookName }`;
    fetch( url )
        .then( res => res.json() )
        .then( data => displayBookData( data ) );
}

const displayBookData = ( books ) => {
    displaySpinner( 'none' );
    if ( books.numFound === 0 ) {
        clearResultContainer();
        displayErrorMessage( 'NO BOOK FOUND! PLEASE SEARCH AGAIN!!!' );
        return;
    }
    else {
        clearErrorMessage();
        clearResultContainer();
        console.log( books.numFound );

        const resultContainer = document.getElementById( 'result-container' );

        const resultCounter = document.createElement( 'h6' );
        resultCounter.classList.add( 'text-center' )
        resultCounter.innerHTML = `
            Serch Result Found: ${ books.numFound }
        `;
        /* const div = document.createElement( 'div' );
        div.classList.add( 'row', 'row-cols-1', 'row-cols-md-3', 'g-4' );
        div.innerHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text"></p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            </div>
        `; */
        resultContainer.appendChild( resultCounter );
    }
}

document.getElementById( 'search-button' ).addEventListener( 'click', () => {
    const searchField = document.getElementById( 'search-field' );
    const searchText = searchField.value;
    if ( searchText.length === 0 ) {
        clearResultContainer();
        displayErrorMessage( 'PLEASE ENTER A BOOK NAME!!!' );
        return;
    }
    else {
        searchBookData( searchText );
        // clearResultContainer();
        // clearErrorMessage();
        displaySpinner( 'block' );
        searchField.value = '';
    }
} );