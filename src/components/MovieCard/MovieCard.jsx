import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, TextField, Typography } from "@material-ui/core";
import React,{ useEffect, useState } from "react";
import _404Poster from '../../statics/404.jpg';


const useStyles = makeStyles(
    
    theme => ({
        root: {
            maxWidth: 345,
            height:535
          },
          media: {
            height: 325,
          },
    })
)
const MovieCard = ({movie,onVote}) => {
  const {name, poster, plot, rating} = movie;
  const [newRating, setNewRating] = useState(0);

  const [error, setError] = useState(undefined);

  useEffect(() => {
    if(newRating % 1 != 0){
      setError("Decimals not allowed");
    }else{
      setError(undefined);
    }
  },[newRating]);

  const handleVoteClick = () => {

    if(newRating ==0 || newRating < 0 ){
      setError("Invalid Rating Value");
    }else{
      onVote(name, newRating);
    }
  }
    const classes = useStyles({});

    return(
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={poster !=="N/A"? poster: _404Poster}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {plot && plot.length > 100 ? `${plot.slice(0, 100)}...`: plot }
            
            </Typography>
          </CardContent>
        </CardActionArea>
      <CardActions>
         
      <Button  
        color="primary"
        variant="contained"
        onClick={()=>handleVoteClick()}
       >
          Vote
        </Button>
      <TextField
          error={!!error}
          value={newRating}
          name="newRating"
          disabled={!!error}
          type="number"
          helperText={error || " "}
          onChange={(e)=> setNewRating(e.target.value)}
          />
        <span>{rating}</span>
      </CardActions>
    </Card>
    )
}

MovieCard.defaultName = "MovieCard";
export default MovieCard;