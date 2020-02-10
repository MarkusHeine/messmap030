import React, { useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { Container } from "react-bootstrap";

const MapComponent: React.FC = () => {
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

    useEffect(() => {
        console.log(MAPBOX_TOKEN);
    });
    return (
        <ReactMapGL
            width="100vw"
            height="90vh"
            latitude={37.7577}
            longitude={-122.4376}
            zoom={8}
            onViewportChange={viewport => {
                const { width, height, latitude, longitude, zoom } = viewport;
                // Optionally call `setState` and use the state to update the map.
            }}
            mapboxApiAccessToken={MAPBOX_TOKEN}
        />
    );
};

export default MapComponent;
