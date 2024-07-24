import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import 'leaflet/dist/leaflet.css';

const Index = () => {
  const [markers, setMarkers] = useState([]);
  const [tripDetails, setTripDetails] = useState({
    name: '',
    date: '',
    duration: '',
    description: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveTrip = () => {
    console.log('Saving trip:', tripDetails);
    toast({
      title: "Trip Saved",
      description: "Your trip details have been saved successfully.",
    });
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newMarker = {
          id: Date.now(),
          position: e.latlng,
        };
        setMarkers(prev => [...prev, newMarker]);
      },
    });
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Kayaking Trip Planner</h1>
        <p className="text-xl">Plan your perfect kayaking adventure</p>
      </header>

      <main className="flex-grow p-4 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents />
            {markers.map(marker => (
              <Marker key={marker.id} position={marker.position}>
                <Popup>
                  Latitude: {marker.position.lat.toFixed(4)}, Longitude: {marker.position.lng.toFixed(4)}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="w-full md:w-1/3 space-y-4">
          <Input
            name="name"
            placeholder="Trip Name"
            value={tripDetails.name}
            onChange={handleInputChange}
          />
          <Input
            name="date"
            type="date"
            value={tripDetails.date}
            onChange={handleInputChange}
          />
          <Input
            name="duration"
            type="number"
            placeholder="Duration (hours)"
            value={tripDetails.duration}
            onChange={handleInputChange}
          />
          <Textarea
            name="description"
            placeholder="Trip Description"
            value={tripDetails.description}
            onChange={handleInputChange}
          />
          <Button onClick={handleSaveTrip} className="w-full">Save Trip</Button>
        </div>
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>Happy Kayaking!</p>
      </footer>
    </div>
  );
};

export default Index;