//Function for clear error message when new data load.
const clearErrorMessage = () => {
    document.getElementById( 'error-container' ).innerHTML = '';
}

//Function for loading spinner show and hide.
const displaySpinner = ( displayStyle ) => {
    document.getElementById( 'spinner' ).style.display = displayStyle;
}

//By default the spinner is hidden on site load.
displaySpinner( 'none' );

//Function for display error messages for any API error, empty search, and unavaialable book search
const displayErrorMessage = ( message ) => {
    displaySpinner( 'none' );
    document.getElementById( 'error-container' ).innerHTML = `
            <h3 class="text-danger fw-bold text-center">${ message }</h3>
        `;
}

//Function for how many results are found in a search. Number of Books.
const displaySearchCounter = ( counter ) => {
    const searchCounter = document.getElementById( 'search-counter' );
    //Validation for more than 100 results.
    if ( counter > 100 ) {
        searchCounter.innerHTML = `
        Books Found: ${ counter }. But only 100 books shown here.
    `;
    }
    //Validation for less then 100 results. Only show the result counter.
    else {
        searchCounter.innerHTML = `
        Books Found: ${ counter }
    `;
    }


}

//Function for clear the search counter section when data loads.
const clearSearchCounter = () => {
    document.getElementById( 'search-counter' ).innerHTML = '';
}

//Funciton for clear the result container data when new data is being loaded.
const clearResultContainer = () => {
    document.getElementById( 'result-container' ).innerHTML = '';
}

//Funciton for Fetch/Collect the book data through API from openlibrary.org server
const loadBookData = ( bookName ) => {
    const url = `https://openlibrary.org/search.json?q=${ bookName }`;
    fetch( url )
        .then( res => res.json() )
        .then( data => displayBookData( data ) )
        .catch( error => displayErrorMessage( error ) ); //catch the API error and display it.
}

//Function for display the search result on the website.
const displayBookData = ( books ) => {
    const resultContainer = document.getElementById( 'result-container' );
    displaySpinner( 'none' );

    //Error handling if searched book is not available
    if ( books?.numFound === 0 ) {
        displayErrorMessage( 'SORRY!!! NO BOOK FOUND! PLEASE SEARCH AGAIN!!!' );
        return;
    }
    //Publish the search result on the website.
    else {
        clearResultContainer();
        displaySearchCounter( books?.numFound );

        //the fetched data is in object -> object -> array form. Need to loop through the array to find all search result.
        books?.docs?.forEach( book => {
            const div = document.createElement( "div" );
            div.classList.add( 'col' );
            div.innerHTML = `
                <div class="card h-100 rounded-3 p-4">
                    <img src="https://covers.openlibrary.org/b/id/${ book.cover_i ? book.cover_i : '' }-M.jpg" class="card-img-top img-fluid p-1 rounded-3 w-75 mx-auto border border-1 border-info">
                    <div class="card-body">
                        <h5 class="card-title fw-bold text-primary"><b>Name:</b> ${ book.title ? book.title : 'Not Avaialable' }</h5>
                        <p class="card-text"><b>Authors: </b> ${ book.author_name ? book.author_name[ 0 ] : 'Not Avaiable' }</p >
                        <p class="card-text"><b>Publisher: </b> ${ book.publisher ? book.publisher[ 0 ] : 'Not Available' }</p>
                        <p class="card-text"><b>First Published: </b> ${ book.first_publish_year ? book.first_publish_year : 'Not Available' }</p>
                    </div >
                    <div class="card-footer">
                        <small class="text-muted">Last updated 1 mins ago</small>
                    </div>
                </div >
    `;
            //Appned the dynamically created div containing the book informaiton to its parent div.
            resultContainer.appendChild( div );
        } );
    }
}

//Click handler for search button.
document.getElementById( 'search-button' ).addEventListener( 'click', () => {
    //Clear the search result counter and result container section as soon as the search button is clicked.
    clearSearchCounter();
    clearResultContainer();

    //get the search field  and search text by JS DOM.
    const searchField = document.getElementById( 'search-field' );
    const searchText = searchField.value;

    //Error handling for empty search input
    if ( searchText.length === 0 ) {
        displayErrorMessage( 'ERROR!!! PLEASE ENTER A BOOK NAME!!!' );
        return;
    }
    //Result for search button click
    else {
        clearErrorMessage(); //Clear the error message if there is any.
        displaySpinner( 'block' ); //Show the loading spinner after button click.
        searchField.value = ''; //Clear the search field.
        loadBookData( searchText ); //Load the book data from the server through API.
    }
} );