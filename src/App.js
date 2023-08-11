
import './App.css';

function App() {





















  return (
    <div className="container">
      <img className='logo' src='images/logo.png' alt='logo'/>

      <div className='search-bar'>
        <form className='searchbar'>
          <input type='text' className='search' style={{fontStyle: 'italic'}} placeholder='Enter a cocktail of your choice'/>
          <input type='submit' className='submit-btn' value='Enter'/>
        </form>
      </div>

      <div className='search-results-section'>
        <p className='results results-hidden'>There are no results matching your search</p>


        <div className='cocktail-card' style={{backgroundImage: "url('images/cocktails.png')", backgroundPosition: 'bottom right', backgroundRepeat: 'no-repeat', backgroundSize: '30%'}}>
          <h1 className='cocktail-title'>Sex on the beach recipe</h1>

          <span className='instructions'>
            <h3 className='instructions-title'>Instructions:</h3>
            <p className='instructions-text'>Build all ingredients in a highball glass filled with ice. Garnish with orange slice.</p>
          </span>

          <span className='ingredients'>
            <h3 className='ingredients-title'>Ingredients:</h3>

            <ul className='ingredients-list'>
              <li className='ingredient'>4 cl Vodka</li>
              <li className='ingredient'>2 cl Peach schnapps</li>
              <li className='ingredient'>4 cl Orange juice</li>
              <li className='ingredient'>4 cl cranberry juice</li>
            </ul>

          </span>

        </div>
      </div>
      <footer>© Copyright 2023 Nicole Moncrieffe</footer>


    </div>
  );
}

export default App;
