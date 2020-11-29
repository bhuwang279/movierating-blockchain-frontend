function displayError (prevState, error){
    return {
        ...prevState,
        error,
        loading: false
    }
}

function displayLoader (prevState, value){
    return {
        ...prevState,
        loading: value
    }
}

function reduceAppState (prevState, action){
    switch (action.type) {
        case "displayError":
          return displayError(prevState, action.payload.error);
        case "displayLoader":
          return displayLoader(prevState, action.payload.value);
        default:
          return prevState;
      }
}

export default reduceAppState;