document.getElementById('searchButton').addEventListener('click', searchMovies);
    document.getElementById('searchInput').addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        searchMovies();
      }
    });
    // document.getElementById('refreshButton').addEventListener('click', function () {
    //   location.reload();  // Refresca la página
    // });

    let api_key = 'e0bbffbb6db360b50a0b0db180529825';
    let urlBase = 'https://api.themoviedb.org/3/search/movie';
    let urlImg = 'https://image.tmdb.org/t/p/w500';

    function searchMovies() {
      let searchInput = document.getElementById('searchInput').value;

      fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then((response) => response.json())
        .then((response) => displayMovies(response.results));
    }

    function displayMovies(movies) {
      let resultContainer = document.getElementById('results');
      resultContainer.innerHTML = '';

      if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados en tu búsqueda</p>';
        return;
      }

      movies.forEach((movie) => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        let title = document.createElement('h2');
        title.textContent = movie.title;

        let releaseDate = document.createElement('p');
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let posterPath = urlImg + movie.poster_path;
        let poster = document.createElement('img');
        poster.src = posterPath;

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);

        resultContainer.appendChild(movieDiv);
      });
    }

    //boton refresh
   
    const button = document.getElementById('refreshButton');

    // Guardar el estado antes de recargar
    button.addEventListener('click', function () {
      // Marca que la animación está activa
      localStorage.setItem('buttonAnimation', 'active');
    
      // Recarga la página
      location.reload();
    });
    
    // Recuperar el estado al cargar la página
    window.addEventListener('load', function () {
      if (localStorage.getItem('buttonAnimation') === 'active') {
        const button = document.getElementById('refreshButton');
        button.style.transform = 'scale(1.1)';
        button.style.backgroundColor = 'rgb(155, 119, 119)';
        
        // Después de 2 segundos, resetea la animación
        setTimeout(() => {
          button.style.transform = 'scale(1)';
          button.style.backgroundColor = '#333';
          localStorage.removeItem('buttonAnimation'); // Limpia el estado
        }, 500);
      }
    });
    