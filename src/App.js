
import './App.css';
import Header from './components/Header/Header';
import { CssBaseline, Grid } from '@material-ui/core';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getPlacesData, getWeatherData} from './api'
import { useEffect } from 'react';
import { useState } from 'react';


function App() {
// console.log(lauda)

  const[places, setPlaces]= useState([])
  const[weatherData, setWeatherData]= useState([])
  const [filteredPlaces, setfilteredPlaces] = useState([])
  const[coordinates, setCoordinates]= useState({});
  const[bounds, setBounds] = useState({});
  const [childClick, setChildClick] = useState(null)
  const[isLoading, setIsLoading] = useState(false);
  const[type, setType]= useState('restaurants')
  const[rating, setRating]= useState('')
 
  //top right and bottom left corner used for list by boundry rapid api are used as bounds


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({lat: latitude, lng:longitude})

    })
  }, [])

  useEffect(()=>{
    const filteredPlaces = places.filter((place)=>place.rating > rating);
    setfilteredPlaces(filteredPlaces);
  }, [rating])

  useEffect(()=>{
   if(bounds.sw && bounds.ne) {
    setIsLoading(true);
    console.log(type, coordinates, bounds)
    // console.log(bounds.sw, bounds.ne)
    //.then accepts callback func whin then have data
    getWeatherData(coordinates.lat, coordinates.lng)
    .then((data)=>{
      setWeatherData(data);
      console.log(data);
    })
    getPlacesData(type, bounds.sw, bounds.ne)
    .then((data)=>{
      console.log(data)

      setPlaces(data.filter((place)=>place.name && place.num_reviews > 0));
      setfilteredPlaces([])
      setIsLoading(false)
      
    })
   }
   console.log(places)
   console.log(filteredPlaces);

  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length? filteredPlaces : places}
          childClick={childClick}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <Map setCoordinates={setCoordinates}
         setBounds={setBounds}
         coordinates ={coordinates}
         places={filteredPlaces.length? filteredPlaces : places}
         setChildClick={setChildClick}
         weatherData ={weatherData}
         />
        
        </Grid>
      </Grid>
    </>
  );
}

export default App;
