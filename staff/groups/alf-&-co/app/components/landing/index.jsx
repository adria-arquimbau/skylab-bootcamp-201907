const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: '', search: false, query: undefined, movies: [], movie: undefined, error: undefined, user: undefined, favs: [] }

        this.handleGoToFavorites=this.handleGoToFavorites.bind(this)
        this.handleGoToCollections=this.handleGoToCollections.bind(this)
        this.handleLogout=this.handleLogout.bind(this)
        this.handleGoToSearch=this.handleGoToSearch.bind(this)
        this.handleGoToLogin=this.handleGoToLogin.bind(this)
        this.handleSearch=this.handleSearch.bind(this)
        this.handleRetrieveMovie=this.handleRetrieveMovie.bind(this)
        this.handleToggleFavMovieFromMovieDetail=this.handleToggleFavMovieFromMovieDetail.bind(this)
        this.handleBackFromDetail=this.handleBackFromDetail.bind(this)
        this.handleToggleFavMovieFromMovieItem=this.handleToggleFavMovieFromMovieItem.bind(this)
    }

    handleGoToFavorites(){

    }

    handleGoToCollections(){

    }

    handleLogout(){

    }

    handleGoToSearch(event){
        event.preventDefault()
        this.setState({ search: true })

    }

    handleGoToLogin(){

    }

    handleSearch(query){
        const { props: { credentials } } = this
        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchMovies(id, token, query)
            .then(movies => this.setState( {movies, query, view: 'results'} ))
            .catch(error => this.setState( { error: error.message }))
    }

    handleRetrieveMovie(id){
        console.log(id)

    }

    handleToggleFavMovieFromMovieDetail(movieId) {
        const { props : { goToLogin, credentials }, handleRetrieveMovie } = this

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavMovie(id, token, movieId, () => handleRetrieveMovie(movieId)) : goToLogin()
    }

    handleBackFromDetail(){

    }

    handleToggleFavMovieFromMovieItem(movieId) {
        const { props : { goToLogin, credentials }, handleSearch, state: { query } } = this

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavMovie(id, token, movieId, () => handleSearch(query)) : goToLogin()
    }

    
/* Handlers */

/* Render */
    render() {
        const {
            state: { view, search, movie, movies, query, error, user, favs },
            handleSearch, handleRetrieveMovie, handleLogout,
            handleBackFromDetail, handleGoToSearch, handleGoToLogin,
            handleToggleFavMovieFromMovieItem, handleToggleFavMovieFromMovieDetail, handleGoToCollections, handleGoToFavorites
        } = this

        return <>
            <header>
                <nav>
                    <ul>
                        <li><a href="" onClick={handleGoToFavorites}>Favorites</a></li>
                        <li><a href="" onClick={handleGoToCollections}>Collections</a></li>
                        <li><a href="" onClick={handleLogout}>Logout</a></li>
                    </ul>
                    <ul>
                        <img></img>
                        <li><a href="" onClick={handleGoToSearch}>Search</a></li>
                        <li><a href="" onClick={handleGoToLogin}>Login</a></li>
                    </ul>
                </nav>
            </header>
            <main>

                {/* Search state is false by default. It's only displayed when clicked on search button */}
                {search && <Search onSearch={handleSearch}></Search>}

                {/* Only displayed after query search or click on a collection. Composed by a grid of movie items with title, rating, poster, director and a fav button */}
                {view === 'results' &&
                    <Results movies={movies} paintItem={movie => {
                        return <MovieItem movie={movie} onToggle={handleToggleFavMovieFromMovieItem} />
                    }} onItem={handleRetrieveMovie} />}

                {/* Movie detail which displays title, poster, overview, director, rating, release_date, main cast. Includes fav button and back button  */}
                {view === 'detail' &&
                    <MovieDetail movie={movie} onBack={handleBackFromDetail} onToggle={handleToggleFavMovieFromMovieDetail} />}
            </main>
            <footer>
                <p>Movie Lab © 2019 Alf & Co.</p>
                <ul>
                    <li><a href="">Twitter</a></li>
                    <li><a href="">Facebook</a></li>
                    <li><a href="">Instagram</a></li>
                </ul>
            </footer>
        </>
    }

}