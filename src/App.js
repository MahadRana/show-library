import { useEffect, useState } from 'react';
import SearchIcon from './search.svg'
import ShowCard from './components/ShowCard'

const API_URL = "https://www.episodate.com/api/search?"

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchShows = async (title) => {
    const response = await fetch(`${API_URL}q=${title}&page=1`)
    const data = await response.json()

    if (response.ok){
      setShows(data.tv_shows)
    } else {
      setShows([])
      throw Error("Could not fetch data from API")
    }
  }
  
  const mostPopular = async () => {
    const response = await fetch("https://www.episodate.com/api/most-popular?page=1")
    const data = await response.json()

    if (response.ok){
      console.log(data);
      setShows(data.tv_shows)
    } else {
      setShows([])
      throw Error("Could not fetch data from API")
    }
  }

  useEffect(() => {
    mostPopular()
  }, [])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchTerm === '' ? mostPopular() : searchShows(searchTerm)
    }
};

  return(
    <div className="Home">
      <div className="title-container">
        <h1>Show Library</h1>
      </div>
      <div className='search-container'>
        <div className="search">
          <input 
            placeholder='Search for Shows' 
            value={searchTerm}
            onChange={(e)=>{setSearchTerm(e.target.value)}}
            onKeyDown={handleKeyPress}
          />
          <img src={SearchIcon} 
            alt="search"
            onClick={()=>{searchTerm === '' ? mostPopular() : searchShows(searchTerm)}}
          />
        </div>
      </div>


       {shows?.length > 0 
        ? (
          <div className='show-container'> 
            <div className="Shows">
              {shows.map((show) => (
                <ShowCard show={show}/>
              ))}
            </div>
          </div>
        ) : 
        (<div className='empty'>
          <h2>No shows found</h2>
        </div>)}
    </div>

    
  )

}

export default App;
