import {
  ascentBlueTinyImg,
  blackTinyImg,
  dkLodenTinyImg,
  dkSmokeTinyImg,
  duskNavyTinyImg,
  dustySageTinyImg,
  graphiteTinyImg,
  htrGrayTinyImg,
  lodenTinyImg,
  medIndigoTinyImg,
  mulberryTinyImg,
  pumiceTinyImg,
  rustTinyImg,
  seapineTinyImg,
  slateGreenTinyImg,
  sprigTinyImg,
  stormTinyImg
} from './tinyImageConstants.js';

//Import Individual Products
import { trailTightLeggings }  from './Products/Women/trailTightLeggings.js';
import { guideProPants }  from './Products/Women/guideProPants.js';
import { microtherm20 }  from './Products/Men/microtherm20.js';
import { stargazerTent }  from './Products/NoGender/stargazerTent.js';


const products = [
  microtherm20,
  stargazerTent,
  guideProPants,
  trailTightLeggings,
]

export default products; //this is the ES modules way of exporting

