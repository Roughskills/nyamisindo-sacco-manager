
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Save, Navigation, RotateCcw, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FarmLocatorProps {
  onComplete: (data: any) => void;
  data?: any;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

const FarmLocator = ({ onComplete, data }: FarmLocatorProps) => {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  
  const [coordinates, setCoordinates] = useState<Coordinates | null>(
    data?.farmLocation || null
  );
  const [address, setAddress] = useState<string>(data?.farmAddress || '');
  const [isLoading, setIsLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const defaultCenter = { lat: -1.940278, lng: 29.873888 }; // Rwanda center
      
      const map = new google.maps.Map(mapRef.current, {
        zoom: 10,
        center: coordinates ? 
          { lat: coordinates.latitude, lng: coordinates.longitude } : 
          defaultCenter,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
      });

      mapInstanceRef.current = map;

      // Add click listener to map
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          
          setCoordinates({ latitude: lat, longitude: lng });
          updateMarker(lat, lng);
          reverseGeocode(lat, lng);
        }
      });

      // Add existing marker if coordinates exist
      if (coordinates) {
        updateMarker(coordinates.latitude, coordinates.longitude);
      }

      setMapReady(true);
      setIsLoading(false);
    };

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      }
    };
  }, []);

  const updateMarker = (lat: number, lng: number) => {
    if (!mapInstanceRef.current) return;

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // Add new marker
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: mapInstanceRef.current,
      title: 'Farm Location',
      draggable: true,
    });

    // Add drag listener to marker
    marker.addListener('dragend', () => {
      const position = marker.getPosition();
      if (position) {
        const newLat = position.lat();
        const newLng = position.lng();
        setCoordinates({ latitude: newLat, longitude: newLng });
        reverseGeocode(newLat, newLng);
      }
    });

    markerRef.current = marker;
    
    // Center map on marker
    mapInstanceRef.current.setCenter({ lat, lng });
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ 
        location: { lat, lng } 
      });
      
      if (response.results[0]) {
        setAddress(response.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Available",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setCoordinates({ latitude: lat, longitude: lng });
        updateMarker(lat, lng);
        reverseGeocode(lat, lng);
        setIsLoading(false);
        
        toast({
          title: "Location Found",
          description: "Your current location has been set as the farm location.",
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsLoading(false);
        toast({
          title: "Location Error",
          description: "Unable to get your current location. Please click on the map to set farm location.",
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const resetLocation = () => {
    setCoordinates(null);
    setAddress('');
    
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat: -1.940278, lng: 29.873888 });
      mapInstanceRef.current.setZoom(10);
    }
  };

  const handleSave = () => {
    if (!coordinates) {
      toast({
        title: "Location Required",
        description: "Please select a farm location on the map before proceeding.",
        variant: "destructive"
      });
      return;
    }

    const farmLocationData = {
      farmLocation: coordinates,
      farmAddress: address,
      timestamp: new Date().toISOString()
    };

    onComplete(farmLocationData);
    
    toast({
      title: "Farm Location Saved!",
      description: "Farm location has been successfully recorded.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <MapPin className="h-5 w-5" />
            Farm Location Mapping
          </CardTitle>
          <p className="text-sm text-green-700">
            Click on the map or use your current location to mark the exact farm location
          </p>
        </CardHeader>
      </Card>

      {/* Map and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Interactive Farm Map</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={getCurrentLocation}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  My Location
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetLocation}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div 
                ref={mapRef} 
                className="w-full h-96 rounded-lg border"
                style={{ minHeight: '400px' }}
              />
              
              {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Instructions:</strong> Click anywhere on the map to set the farm location, 
                or drag the marker to adjust the position. You can also use "My Location" to use your current GPS coordinates.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {coordinates ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Location Set
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Latitude</label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {coordinates.latitude.toFixed(6)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Longitude</label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {coordinates.longitude.toFixed(6)}
                    </p>
                  </div>
                  
                  {address && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <p className="text-sm bg-gray-100 p-2 rounded">
                        {address}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No location selected</p>
                <p className="text-xs text-gray-400 mt-1">
                  Click on the map to set farm location
                </p>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button
                onClick={handleSave}
                disabled={!coordinates}
                className="w-full flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Farm Location
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>GPS Coordinate Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-2">✓ Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Mark the center of the farm area</li>
                <li>• Use satellite view for better accuracy</li>
                <li>• Verify the location with local landmarks</li>
                <li>• Enable location services for better precision</li>
                <li>• Double-check coordinates before saving</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-700 mb-2">⚠ Important Notes</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GPS coordinates are permanent once saved</li>
                <li>• Accuracy affects service delivery</li>
                <li>• Remote areas may have limited precision</li>
                <li>• Consider accessibility for field officers</li>
                <li>• Contact support if location seems incorrect</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline">
          Back to Liveness Detection
        </Button>
        <Button
          onClick={handleSave}
          disabled={!coordinates}
          className="px-8"
        >
          Continue to KYC Verification
        </Button>
      </div>
    </div>
  );
};

export default FarmLocator;
