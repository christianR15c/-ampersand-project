import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1IjoiaGFiaW5lemFjMTUiLCJhIjoiY2xjNHQ2NmtzMGc5bjNxdDhwZzEybDVtbSJ9.HoL5SQDzYvIDPIKWnQsJjA";
class App extends React.Component {
    componentDidMount() {

        const map = new mapboxgl.Map({
            container: this.mapWrapper,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [30.054957, -1.9675547],
            zoom: 14
        });

        map.on('load', () => {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': JSON.parse(localStorage.coordinates)
                    }
                }
            });
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#888',
                    'line-width': 8
                }
            });
        });

    }
    render() {
        return (
            <div
                ref={el => (this.mapWrapper = el)}
                className="mapWrapper"
            />
        );
    }
}
export default App;