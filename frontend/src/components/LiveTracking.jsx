import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh',
};

const LiveTracking = () => {
    const [map, setMap] = useState(null);
    const [userMarker, setUserMarker] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userPosition = { lat: latitude, lng: longitude };
                    setCurrentPosition(userPosition);
                    
                    if (map) {
                        map.setCenter(userPosition);
                    }
                    if (userMarker) {
                        userMarker.setPosition(userPosition);
                    }
                },
                (error) => {
                    console.error('Error obtaining location', error);
                    alert('Error obtaining location. Please enable location services.');
                },
                { enableHighAccuracy: true, maximumAge: 0 }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }, [map, userMarker]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
                onLoad={(mapInstance) => {
                    setMap(mapInstance);
                    const marker = new window.google.maps.Marker({
                        position: currentPosition,
                        map: mapInstance,
                        title: 'Your Location',
                    });
                    setUserMarker(marker);
                }}
            />
        </LoadScript>
    );
};

export default LiveTracking;
