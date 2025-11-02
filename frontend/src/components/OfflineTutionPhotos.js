import React from 'react';

import t1Photo from '../assets/tution-photos/t1.jpg';
import t2Photo from '../assets/tution-photos/t2.jpg';
import t3Photo from '../assets/tution-photos/t3.jpg';
import t4Photo from '../assets/tution-photos/t4.jpg';

const OfflineTutionPhotos = () => {
  const tutionPhotos = [
    { id: 't1', src: t1Photo, alt: 'Offline Tution Photo 1' },
    { id: 't2', src: t2Photo, alt: 'Offline Tution Photo 2' },
    { id: 't3', src: t3Photo, alt: 'Offline Tution Photo 3' },
    { id: 't4', src: t4Photo, alt: 'Offline Tution Photo 4' }
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Offline Tution Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {tutionPhotos.map((photo) => (
          <div key={photo.id} className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform">
            <img 
              src={photo.src} 
              alt={photo.alt} 
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflineTutionPhotos;
