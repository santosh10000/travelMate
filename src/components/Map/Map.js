import React from 'react'
import GoogleMapReact from 'google-map-react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import {Paper, paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles'
import '../../App.css'
import mapStyles from '../../mapStyles';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClick, weatherData}) => {
const classes = useStyles();
const isDesktop = useMediaQuery('(min-width:600px)');
const {isLoaded} = useLoadScript({
  googleMapsApiKey : "AIzaSyCjFKUZBIUILkLmb2LGjDlbKISU-3SMMYU",
});
if(!isLoaded) return <div>Loading.......</div>


  return (
    <div className={classes.mapContainer}>
       <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={10}
        margin= {[50,50.50,50]}
        options={{
          disableDefaultUI: true, zoomControl: true, styles: mapStyles
        }}
        onChange={
          (e)=>{
            console.log(e);
            setBounds({ne: e.marginBounds.ne, sw:e.marginBounds.sw})
            //bounds ne, sw gonna be rally helpful to set  top right and bottom left corner
            setCoordinates({lat: e.center.lat, lng:e.center.lng})
          }
        } 
      onChildClick={(child)=>{setChildClick(child)}}
       >
        {places?.map((place, i)=>
        (
          <div className={classes.markerContainer} 
          lat={Number(place.latitude)} lng={Number(place.longitude)}
          key={i}>
            {!isDesktop?(
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ): (
              <Paper elevation={3} className={classes.paper}>
                <Typography classsName={classes.typography} variant="subtitle2"
                gutterBottom>
           {place.name}
                </Typography>
           <img className={classes.pointer} src={place.photo?place .photo.images.large.url :
        'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
      } alt={place.name} srcset="" />
      <Rating size="small" value={place.rating} readOnly/>
              </Paper>
            )}
           

          </div>
        ))}
        {weatherData?.list?.map((data, i)=>(
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={
              `http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
         
        ))}

       </GoogleMapReact>

    </div>
  )
}

export default Map