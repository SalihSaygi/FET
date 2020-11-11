import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
 
// ES5
var ReactMapboxGl = require('react-mapbox-gl');
var Layer = ReactMapboxGl.Layer;
var Feature = ReactMapboxGl.Feature;
require('mapbox-gl/dist/mapbox-gl.css');
 
const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoic2FsaWhzIiwiYSI6ImNrZTY1YndqeTB4OWkyeXBlbmpoa2ltejQifQ.cTw5tuUNpURnf7GZWFZFCQ'
});
 
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

// in render()
<Map
  style="mapbox://styles/salihs/ckhcauz6d0ma619noduml7g1n"
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
>
  <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
  </Layer>
</Map>;