import React, { Component } from 'react';
import ReactMap, { Layer, Feature } from 'react-mapbox-gl';

const accessToken = "pk.eyJ1IjoiYWxleDMxNjUiLCJhIjoiY2o0MHp2cGtiMGFrajMycG5nbzBuY2pjaiJ9.QDApU0XH2v35viSwQuln5w";
const style = "mapbox://styles/salihs/ckhcauz6d0ma619noduml7g1n";

const Map = ReactMap({
  accessToken
});

const mapStyle = {
  height: '100vh',
  width: '100vw'
};

class MapPage extends Component {
  render() {
    return (
      <Map
        style={style}
        containerStyle={mapStyle}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
    );
  }
}

export default MapPage;