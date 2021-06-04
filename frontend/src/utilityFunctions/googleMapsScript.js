import axios from 'axios';

// Google Maps Mounting Script Function
export const addGoogleMapsScript = async (string, dispatchFunction, type) => {
  console.log(`calling addGoogleMapsScript from: ${string}`)
  //This if() should technically be redundant, since this function should not be called at all
  //if the script has already been mounted ( by using the same if() before this function is even called )
  //but I will leave the if() just in case
  if(!window.google){ 
    try {
      const { data: mapsAPIKey } = await axios.get('/api/config/googlemaps');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsAPIKey}`;
      script.id = 'mapsScript'
      script.async = true;
      //Very rarely it seems the script gets mounted more than once when the Oders page loads
      //I can't figure out why and it seems very very hard to reproduce. I'm assuming it's some asynchronous shennanigans, so I've 
      //added one more check here just before we mount the script just in case
      if(!window.google){
        console.log('MOUNTING GOOGLE MAPS SCRIPT');
        document.body.appendChild(script);
        // The global state seems to update faster than the script gets added to the body and the necessary Google Maps stuff gets
        // loaded. This setTimeout seems to give enough time /// for the script to be added to the body before the global state gets 
        // updated. This is important b/c our OrderMap component useEffect doesn't create the map until the map script is loaded - it /// looks for 'window.google' before proceeding
        setTimeout(() => {
          dispatchFunction(type);
          
          // return Promise.resolve("success");          
        }, 350);
      }
    } catch (error) {
      console.log('Error fetching Google Maps API Key...')
    }
  } else {
    return "fail";
  }
}