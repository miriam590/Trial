None selected 

Skip to content
Using Gmail with screen readers
Conversations
1.72 GB of 15 GB used
Terms · Privacy · Program Policies
Last account activity: in 1 minute
Open in 1 other location · Details
document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieRuntime = document.getElementById('movie-runtime');
    const movieShowtime = document.getElementById('movie-showtime');
    const availableTickets = document.getElementById('available-tickets');
    const buyTicketButton = document.getElementById('buy-ticket');

    let currentMovieId;
    let currentAvailableTickets;

    //Fetching all films
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
            data.forEach(movie => {
                const li = document.createElement('li');
                li.className = 'film item';
                li.textContent = movie.title;
                li.dataset.id = movie.id;
                li.addEventListener('click', () => loadMovieDetails(movie.id));
                filmsList.appendChild(li);
            });
            //Loading the first movie's details
            if (data.length > 0) {
                loadMovieDetails(data[0].id);
            }
        });

    //Loading movie details
    function loadMovieDetails(id) {
        fetch(`http://localhost:3000/films/${id}`)
            .then(response => response.json())
            .then(movie => {
                currentMovieId = movie.id;
                currentAvailableTickets = movie.capacity - movie.tickets_sold;

                movieTitle.textContent = movie.title;
                moviePoster.src = movie.poster;
                movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
                movieShowtime.textContent = `Showtime: ${movie.showtime}`;
                availableTickets.textContent = `Available Tickets: ${currentAvailableTickets}`;

                buyTicketButton.textContent = currentAvailableTickets > 0 ? 'Buy Ticket' : 'Sold Out';
                if (currentAvailableTickets === 0) {
                    document.querySelector(`li[data-id="${movie.id}"]`).classList.add('sold-out');
                } else {
                    document.querySelector(`li[data-id="${movie.id}"]`).classList.remove('sold-out');
                }
            });
    }

    //Buy ticket
    buyTicketButton.addEventListener('click', () => {
        if (currentAvailableTickets > 0) {
            currentAvailableTickets--;
            availableTickets.textContent = `Available Tickets: ${currentAvailableTickets}`;

            if (currentAvailableTickets === 0) {
                buyTicketButton.textContent = 'Sold Out';
                document.querySelector(`li[data-id="${currentMovieId}"]`).classList.add('sold-out');
            }

            //Update tickets sold on the server
            fetch(`http://localhost:3000/films/${currentMovieId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tickets_sold: (parseInt(movie.tickets_sold) + 1) })
            });
        }
    });
});
script.txt
Displaying script.txt.