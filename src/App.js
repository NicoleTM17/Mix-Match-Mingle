import { useState, useEffect } from 'react';


import './App.css';
// This is a webpage for getting cocktail recipes
// When a user types in a cocktail name e.g. 'mojito' it should return ONE recipe matching this search
// So when inputting, we need to RETRIEVE the name of the cocktail
// We need to return the name, instructions and ingredients
// If nothing is returned, the 'results' class should be shown

function App() {

  const[name, setName] = useState(''); // useState for inputted cocktail name

  const [ingredients, setIngredients] = useState([]); // useState for the ingredients
  const [instructions, setInstructions] = useState(''); // useState for the instructions
  const [displayedCocktail, setDisplayedCocktail] = useState(''); // useState for displaying cocktail title
  const [formSubmitted, setFormSubmitted] = useState(false); // useState for submitting form
  const [searchError, setSearchError] = useState(false); // useState if search fails
  const [visibleCard, setVisibleCard] = useState(false);

  const apiKey = process.env.REACT_APP_API_NINJAS_API_KEY;


  function handleChange(event){
    // console.log(event.target.value);
    const nameInput = event.target.value;
    setName(nameInput);

    setSearchError(false);  // no results message should not appear
  };

  function handleSubmit(event){
    event.preventDefault();
    // console.log(event);
    setFormSubmitted(true);

    setTimeout(() => {
      setName('');
    }, 100);
  };


  useEffect(() => {
    if (formSubmitted && name) {
      console.log("Fetching data...");
      fetch(`https://api.api-ninjas.com/v1/cocktail?name=${name}`, {
        headers:{'X-api-Key': apiKey},
      })

      .then((response) => response.json())
      .then((data) =>{
        console.log(data);
        const firstCocktail = data[0];
        // setName(firstCocktail.name);
        setVisibleCard(true);

        setIngredients(firstCocktail.ingredients);

        setInstructions(firstCocktail.instructions);

        setFormSubmitted(false);
        setSearchError(false);

        setDisplayedCocktail(firstCocktail.name);
      })

      .catch((error) => {
        console.error('A problem occurred when fetching from Api-Ninjas:', error);
        setSearchError(true);
        setVisibleCard(false);
      });
    }
  }, [formSubmitted, name, apiKey])



  return (
    <div className="container">
      <img className='logo' src='images/logo.png' alt='logo'/>

      {/* SEARCH BAR */}
      <div className='search-bar'>
        <form className='searchbar'>
          <input onChange={handleChange} type='text' className='search' style={{fontStyle: 'italic'}} placeholder='Enter a cocktail of your choice'/>
          <input onClick={handleSubmit} type='submit' className='submit-btn' value='Enter'/>
        </form>
      </div>

      <div className='search-results-section'>
        {/* RESULTS TEXT HERE */}
        <p className={searchError === true ? 'results' : 'results-hidden'}>There are no results matching your search</p>


        <div className={visibleCard === true ? 'cocktail-card' : 'cocktail-card-hidden'} style={{backgroundImage: "url('images/cocktails.png')", backgroundPosition: 'bottom right', backgroundRepeat: 'no-repeat', backgroundSize: '30%'}}>
          {/* COCKTAIL NAME */}
          <h1 className='cocktail-title'>{displayedCocktail.charAt(0).toUpperCase() + displayedCocktail.slice(1)} Recipe</h1>

          {/* INSTRUCTIONS */}
          <span className='instructions'>
            <h3 className='instructions-title'>Instructions:</h3>
            <p className='instructions-text'>{instructions}</p>
          </span>

          <span className='ingredients'>
            <h3 className='ingredients-title'>Ingredients:</h3>

            {/* MAP INGREDIENTS HERE */}
            <ul className='ingredients-list'>
              {ingredients && ingredients.length > 0 ? (
                ingredients.map((ingredient, index) =>
                  <li className='ingredient' key={index}>{ingredient}</li>
                )
              ) : (
                <li className='placeholder'></li>
              )}
            </ul>

          </span>

        </div>


      </div>
      <footer>© Copyright 2023 Nicole Moncrieffe</footer>


    </div>
  );
}

export default App;


// {searchError === true ? 'results' : 'results-hidden'}


// ingredients.map((ingredient, index) =>
// <li className='ingredient' key={index}></li>
//)
