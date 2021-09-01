const displaySpinner = ( displayStyle ) => {
    document.getElementById( 'spinner' ).style.display = displayStyle;
}
displaySpinner( 'none' );

const displayErrorMessage = ( message ) => {
    document.getElementById( 'error-container' ).innerHTML = `
            <h3 class="text-danger fw-bold text-center">${ message }</h3>
        `;
}
const hideErrorMessage = () => {
    document.getElementById( 'error-container' ).style.display = 'none';
}

const searchBookData = ( bookName ) => {
    const url = `http://openlibrary.org/search.json?q=${ bookName }`;
    fetch( url )
        .then( res => res.json() )
        .then( data => displayBookData( data ) );
}

const displayBookData = ( books ) => {
    displaySpinner( 'none' );
    if ( books.numFound === 0 ) {
        displayErrorMessage( 'NO BOOK FOUND! PLEASE SEARCH AGAIN!!!' );
    }
    else {
        hideErrorMessage();
        console.log( books, books.numFound );
    }
}

document.getElementById( 'search-button' ).addEventListener( 'click', () => {
    const searchField = document.getElementById( 'search-field' );
    const searchText = searchField.value;
    if ( searchText.length === 0 ) {
        displayErrorMessage( 'PLEASE ENTER A BOOK NAME!!!' );
    }
    else {
        searchBookData( searchText );
        hideErrorMessage();
        displaySpinner( 'block' );
        searchField.value = '';
    }
} );