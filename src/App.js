import { useState, useEffect } from 'react';


import './App.css';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      'Noto+Sans+JP:wght@200;300;400',
    ],
  },
});



function App() {

  const[name, setName] = useState(''); // useState for inputted cocktail name

  const [ingredients, setIngredients] = useState([]); // useState for the ingredients
  const [instructions, setInstructions] = useState(''); // useState for the instructions
  const [displayedCocktail, setDisplayedCocktail] = useState(''); // useState for displaying cocktail title
  const [formSubmitted, setFormSubmitted] = useState(false); // useState for submitting form
  const [searchError, setSearchError] = useState(false); // useState if search fails
  const [visibleCard, setVisibleCard] = useState(false); // useState for cocktail card visibility

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
    setFormSubmitted(true); // so that useEffect will occur after form submission
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
        const firstCocktail = data[0]; // Accessing ONLY the first instance of cocktail that comes through
        // setName(firstCocktail.name);
        setVisibleCard(true); // cocktail-card is visible

        setIngredients(firstCocktail.ingredients);

        setInstructions(firstCocktail.instructions);

        setFormSubmitted(false);
        setSearchError(false);

        setDisplayedCocktail(firstCocktail.name);

        setName(''); // clears the input field after form submission
      })

      .catch((error) => {
        console.error('A problem occurred when fetching from Api-Ninjas:', error);
        setSearchError(true); // results class will show up
        setVisibleCard(false); // cocktail card will be hidden
      });
    }
  }, [formSubmitted, name, apiKey]) // dependent on these variables



  return (
    <div className="container">
      <img className='logo' src='images/logo.png' alt='logo'/>
      <p className='slogan'>Unleash your inner mixologist ✧</p>

      {/* SEARCH BAR */}
      <div className='search-bar'>
        <form onSubmit={handleSubmit} className='searchbar'>
          <input onChange={handleChange} type='text' value={name} className='search' style={{fontStyle: 'italic'}} placeholder='Enter a cocktail of your choice'/> {/* the value attribute of the input field needs to be correctly bound to the name state for the input to clear! */}
          <input  type='submit' className='submit-btn' value='Enter'/>
        </form>
      </div>

      <div className='search-results-section'>
        {/* RESULTS TEXT HERE */}
        <p className={searchError === true ? 'results' : 'results-hidden'}>There are no results matching your search</p>


        <div className={visibleCard === true ? 'cocktail-card' : 'cocktail-card-hidden'} style={{backgroundImage: "url('images/cocktails.png')", backgroundPosition: 'bottom right', backgroundRepeat: 'no-repeat', backgroundSize: '30%'}}>
          {/* COCKTAIL NAME */}
          <h1 className='cocktail-title'>{displayedCocktail.charAt(0).toUpperCase() + displayedCocktail.slice(1)} Recipe</h1> {/* displayed cocktail title is converted to capitalised */}

          {/* INSTRUCTIONS */}
          <span className='instructions'>
            <h3 className='instructions-title'>Instructions:</h3>
            <p className='instructions-text'>{instructions}</p>
          </span>

          <span className='ingredients'>
            <h3 className='ingredients-title'>Ingredients:</h3>

            {/* MAP INGREDIENTS HERE */}
            {/* If there is a field called ingredients and it contains data */}
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
