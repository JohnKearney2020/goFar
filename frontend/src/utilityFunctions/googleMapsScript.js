import axios from 'axios';

// Google Maps Mounting Script Function
export const addGoogleMapsScript = async () => {
  console.log('call addGoogleMapsScript')
  try {
    const { data: mapsAPIKey } = await axios.get('/api/config/googlemaps');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsAPIKey}`;
    script.async = true;
    // if(!unmounted && !window.google){
      console.log('MOUNTING GOOGLE MAPS SCRIPT')
      document.body.appendChild(script);
    // }
  } catch (error) {
    console.log('Error fetching Google Maps API Key...')
  }
}