import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'japan',
    name: 'Japan',
    country: 'Japan',
    flag: '🇯🇵',
    region: 'Asia',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    summary: 'Land of the rising sun, ancient shrines, bullet trains, and world-class culinary traditions.',
    languages: ['Japanese'],
    popularCities: ['Tokyo', 'Kyoto', 'Osaka', 'Sapporo'],
    emergencyNumbers: { police: '110', ambulance: '119', general: '110' }
  },
  {
    id: 'france',
    name: 'France',
    country: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    summary: 'Iconic art, timeless architecture, romantic cafes, and world-class wine country.',
    languages: ['French'],
    popularCities: ['Paris', 'Nice', 'Lyon', 'Marseille'],
    emergencyNumbers: { police: '17', ambulance: '15', general: '112' }
  },
  {
    id: 'germany',
    name: 'Germany',
    country: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop',
    summary: 'Rich history, historic castles, fairytale forests, and modern tech hubs.',
    languages: ['German'],
    popularCities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
    emergencyNumbers: { police: '110', ambulance: '112', general: '112' }
  },
  {
    id: 'italy',
    name: 'Italy',
    country: 'Italy',
    flag: '🇮🇹',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop',
    summary: 'Cradle of the Renaissance, breathtaking coastal villages, ancient monuments, and pasta perfection.',
    languages: ['Italian'],
    popularCities: ['Rome', 'Florence', 'Venice', 'Milan'],
    emergencyNumbers: { police: '113', ambulance: '118', general: '112' }
  },
  {
    id: 'spain',
    name: 'Spain',
    country: 'Spain',
    flag: '🇪🇸',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=800&auto=format&fit=crop',
    summary: 'Flamenco rhythms, Mediterranean beaches, tapas culture, and historic architectural marvels.',
    languages: ['Spanish'],
    popularCities: ['Barcelona', 'Madrid', 'Seville', 'Valencia'],
    emergencyNumbers: { police: '091', ambulance: '061', general: '112' }
  },
  {
    id: 'uae',
    name: 'UAE',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Asia',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    summary: 'Futuristic skyscrapers, luxury shopping, desert safaris, and Arabian hospitality.',
    languages: ['Arabic', 'English'],
    popularCities: ['Dubai', 'Abu Dhabi', 'Sharjah'],
    emergencyNumbers: { police: '999', ambulance: '998', general: '999' }
  },
  {
    id: 'usa',
    name: 'USA',
    country: 'United States of America',
    flag: '🇺🇸',
    region: 'Americas',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop',
    summary: 'Bustling metropolises, famous national parks, Hollywood culture, and diverse landscapes.',
    languages: ['English', 'Spanish'],
    popularCities: ['New York', 'Los Angeles', 'Chicago', 'San Francisco'],
    emergencyNumbers: { police: '911', ambulance: '911', general: '911' }
  },
  {
    id: 'uk',
    name: 'UK',
    country: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
    summary: 'Historic royal landmarks, countryside hills, iconic black cabs, and rich literary heritage.',
    languages: ['English'],
    popularCities: ['London', 'Edinburgh', 'Manchester', 'Oxford'],
    emergencyNumbers: { police: '999', ambulance: '999', general: '112' }
  },
  {
    id: 'india',
    name: 'India',
    country: 'India',
    flag: '🇮🇳',
    region: 'Asia',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop',
    summary: 'Subcontinent of ancient heritage, majestic monuments, diverse culinary cultures, and 22 official languages.',
    languages: ['Hindi', 'Marathi', 'Tamil', 'Gujarati', 'Bengali', 'Telugu', 'Kannada', 'Malayalam', 'Punjabi'],
    popularCities: ['New Delhi', 'Mumbai', 'Jaipur', 'Bengaluru', 'Varanasi', 'Kolkata', 'Kochi'],
    emergencyNumbers: { police: '112', ambulance: '102', general: '112' }
  }
];
