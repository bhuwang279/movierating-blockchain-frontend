import MovieRatingContract from "./contracts/MovieRating.json";
import getWeb3 from "./getWeb3";
import './App.css';
import React, { useEffect, useState } from "react";
import useNotifier from "./containers/hooks/useNotifier";
import { Button, LinearProgress, makeStyles, TextField } from "@material-ui/core";
import MovieCard from "./components/MovieCard";
import MovieApi from "./config";


const api_key = process.env.REACT_APP_OPENDB_API_KEY
const useStyles = makeStyles(
  theme => ({
    container: {
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit,minmax(300px,1fr))`,
      gridAutoRows: 220,
      gridRowGap: "25em",
      gridColumnGap: "3em",
      margin: "2em",

    },
    addMovie: {
      display: "flex",
      flexDirection: "row",
      width: 300,
      marginTop: 50,
      margin: "auto",

      "& button": {
        marginLeft: 10,
        marginTop: "19px"
      }
    },
    appLoader: {
      height: 4,
      marginBottom: theme.spacing(3.25),
      zIndex: 1201
    },
    appLoaderPlaceholder: {
      height: 4,
      marginBottom: theme.spacing(3.25)
    },
  })
)
function App() {

  const classes = useStyles({})

  const [movies, setMovies] = useState([]);
  const [web3Instance, setWeb3Instance] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contractInstance, setContractInstance] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const notify = useNotifier();
  useEffect(async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      setWeb3Instance(web3);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      setAccounts(accounts)

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = MovieRatingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MovieRatingContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setContractInstance(instance);
      ///Dont use contractInstance because setState is a async call
      try {

        setLoading(true);

        let movies = await instance.methods.getMovies().call();

        for (const [i, movie] of movies.entries()) {
          let { totalRater, totalRating } = await instance.methods.movieRatings(i).call();
          let rating = 0;
          if (parseInt(totalRater) !== 0) {
            rating = parseInt(totalRating) / parseInt(totalRater);
            rating = rating.toFixed(2);
          }


          MovieApi.get(`?t=${movie}&apikey=${api_key}`)
            .then(res => {
              const { data: { Poster, Plot, Response } } = res;

              if (Response) {
                setMovies(prevState => [...prevState, { name: movie, poster: Poster, plot: Plot, rating: rating }]);

              } else {
                setMovies(prevState => [...prevState, { name: movie, poster: null, plot: null, rating: rating }]);

              }

            })

        }



      } catch (e) {
        const { reason } = e;
        notify({
          status: "error",
          text: "Something went wrong."
        });
      }finally{
        setLoading(false);
      }


    } catch (error) {
      // Catch any errors for any of the above operations.
      notify({
        status: "error",
        text: `Please check Metamask provider.`,
      });
      

    }
  }, [])

  const handleVote = async (movieName, rating) => {


    const movieIndex = movies.findIndex(item => item.name === movieName);
    setLoading(true);
    try {
      
      let { status } = await contractInstance.methods.rate(movieIndex, rating).send({ from: accounts[0] });


      if (status) {
        let { totalRater, totalRating } = await contractInstance.methods.movieRatings(movieIndex).call();
        
        let newRating = parseInt(totalRating) / parseInt(totalRater);
        newRating = newRating.toFixed(2);

        //Below should be done through events and webscokets
        setMovies([
          ...movies.slice(0, movieIndex),
          {
            ...movies[movieIndex],
            "rating": newRating
          },
          ...movies.slice(movieIndex + 1)
        ]);
        notify({
          status: "success",
          text: "Your vote was successfull."
        });
      } else {
        notify({
          status: "error",
          text: "Something went wrong."
        });
      }

    } catch (e) {
      notify({
        status: "error",
        text: "Something went wrong."
      });
    }
    setLoading(false);

  }


  const handleAddMovie = async (movieName) => {
    setLoading(true);
    try {
      let { status } = await contractInstance.methods.add(movieName).send({ from: accounts[0] });

      if (status) {
        let { totalRater, totalRating } = await contractInstance.methods.movieRatings(movies.length).call();
        let rating = 0;
        if (parseInt(totalRater) !== 0) {
          rating = parseInt(totalRating) / parseInt(totalRater);
          rating = rating.toFixed(2);
        }


        MovieApi.get(`?t=${movieName}&apikey=${api_key}`)
          .then(res => {
            const { data: { Poster, Plot, Response } } = res;

            if (Response) {
              setMovies(prevState => [...prevState,{ name: movieName, poster: Poster, plot: Plot, rating: rating }]);

            } else {
              setMovies(prevState => [...prevState,{ name: movieName, poster: null, plot: null, rating: rating }]);

            }
            notify({
              status: "success",
              text: "Movie Added Successfully."
            });

          })
      }


    } catch (e) {
      notify({
        status: "error",
        text: "OOps!! Only contract owner can add movie."
      });
    }finally{
      setLoading(false);
    }
    

  }

  const [newMovieName, setNewMovieName] = useState(" ");
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (newMovieName === "") {
      setError("Movie Name Cannot be empty");
    } else {
      setError(undefined);
    }
  }, [newMovieName]);

  return (
    <>
      <div>
        {loading ? (
          <LinearProgress className={classes.appLoader} color="primary" />
        ) : (
            <div className={classes.appLoaderPlaceholder} />
          )}
      </div>
      <div className={classes.addMovie}>
        <TextField
          error={!!error}
          value={newMovieName}
          defaultValue="Only Contract owner can add"
          name="newMovieName"
          helperText={error || " "}
          onChange={(e) => setNewMovieName(e.target.value)}
        />
        <Button
          color="primary"
          variant="contained"
          disabled={!!error}
          onClick={() => handleAddMovie(newMovieName)}
        >
          Add Movie
        </Button>
      </div>
      <div className={classes.container}>

        {movies.length > 0
          &&
          movies.map(movie => <MovieCard
            key={movie.name}
            movie={movie}
            onVote={handleVote} />)
        }

      </div>
    </>

  );
}

export default App;
