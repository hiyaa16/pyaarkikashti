import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FaPlus } from 'react-icons/fa';

import { db, storage } from './firebase';

// Import your background image and static gallery images here
import galleryBg from './assets/bgw.jpg'; // the attached image example as bg
import wedding1 from './assets/college.jpg';
import wedding2 from './assets/image3.jpg';
import wedding3 from './assets/image.jpg';
import wedding4 from './assets/forever.jpg';

const STATIC_IMAGES = [
  { id: 'static-1', url: wedding1,  },
  { id: 'static-2', url: wedding2,  },
  { id: 'static-3', url: wedding3,  },
  { id: 'static-4', url: wedding4, }
];

export default function GalleryWithUpload() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'photos'), (snapshot) => {
      const imgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(imgs);
    });
    return () => unsubscribe();
  }, []);

  const allImages = [...STATIC_IMAGES, ...photos];

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
      setProgress(0);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    const storageRef = ref(storage, `user-uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => {
        setMessage('Upload failed: ' + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, 'photos'), {
            url: downloadURL,
            caption: '',
            uploadedAt: serverTimestamp(),
            isUserUpload: true
          });
          setMessage('Upload successful!');
          setFile(null);
          setProgress(0);
        });
      }
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${galleryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
      className="px-6 sm:px-12 md:px-16 pt-20 pb-20"
    >
      <h1 className="text-center text-5xl font-extrabold text-white drop-shadow-lg mb-14 font-karla">
        Wedding Photo Gallery
      </h1>

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto mb-12 flex items-center justify-center gap-4">
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer rounded-full bg-white p-4 shadow-md hover:bg-purple-200 transition text-purple-700 flex items-center gap-2"
          title="Click to select photo"
        >
          <FaPlus className="text-xl" />
          <span className="font-semibold">Upload Photo</span>
        </label>
        <input 
          id="file-upload" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <button 
          onClick={handleUpload} 
          className="py-2 px-5 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          disabled={!file}
          title={file ? "Click to upload selected photo" : "Select a photo first"}
        >
          Upload
        </button>
      </div>
      
      {file && (
        <p className="text-center text-white mb-4 italic">{`Selected file: ${file.name}`}</p>
      )}
      {progress > 0 && (
        <p className="text-center text-white mb-4">Uploading: {progress}%</p>
      )}
      {message && (
        <p className="text-center text-white mb-8">{message}</p>
      )}

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto bg-white/95 rounded-3xl shadow-xl p-8 backdrop-blur-sm">
        {allImages.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">
            No wedding photos yet. Be the first to upload!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allImages.map((photo) => (
              <div key={photo.id} className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white">
                <img 
                  src={photo.url} 
                  alt={photo.caption || 'Wedding Photo'} 
                  className="w-full h-60 object-cover" 
                />
                {photo.caption && (
                  <div className="p-3 text-purple-700 font-semibold text-center">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
