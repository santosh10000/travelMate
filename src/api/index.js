import axios from 'axios';
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
 
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
   
  },
  headers: {
    'X-RapidAPI-Key': 'bba285a1a6mshaada792a37c1a1ap1ebb10jsnc0268d4da2ec',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

export const getPlacesData = async (type, sw, ne) =>{
    try{
        //request
       const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
 
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
         
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      });
       
       return data;
    }catch(error){
        console.log(error)
    }
  }
  const appid = process.env.REACT_APP_OPENWEATHER_API_KEY
   
  export const getWeatherData = async (lat, lng) =>{
    try{
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${appid}`, {
        params:{
          lat: lat,
          lng: lng,
          units: 'metric',
          
        }
      })
    return data;
    }
  catch(error){
  console.log(error)
  }
  }