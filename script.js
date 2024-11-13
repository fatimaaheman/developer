// Selecting the container that holds all seats
const container = document.querySelector('.container');

// Selecting all seats in rows that are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// Selecting the HTML elements that display count of selected seats and total price
const count = document.getElementById('count');
const total = document.getElementById('total');

// Selecting the movie dropdown element
const movieSelect = document.getElementById('movie');

// Initializing the UI with previously selected seats
populateUI();

// Getting the ticket price based on the selected movie
let ticketPrice = +movieSelect.value;

// Function to save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Function to update count and total based on selected seats
function updateSelectedCount() {
    // Getting all selected seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Mapping selected seats to their indices
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    // Saving selected seats to local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Updating the count and total in the UI
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Function to populate the UI based on data from local storage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // If there are selected seats in local storage, mark them as selected
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
}

// Setting the selected movie index if it exists in local storage
const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
}

// Event listener for movie selection change
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Event listener for seat selection in the container
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Initial call to update the count and total on page load
updateSelectedCount();
