import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';
import '../../css/Bissness.css';


const noPic = 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTeyKTG0Gfx42-5Snmu1-18eMPpuY-s4-Mmu12Xl-uC25VGZbk465RUbHKhJnnL8ajf'; 


const BissnessPage = () => {
  const { id } = useParams(); 
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCard = async () => {
      const config = {
        method: 'get',
        url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        headers: {}
      };
      try {
        const response = await axios(config);
        setCard(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching card data:', error);
        setError(error);
        setLoading(false);
      }
    };

    getCard();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const address = card ? `${card.address.houseNumber} ${card.address.street}, ${card.address.city} ${card.address.country}` : '';
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA_pYPltgWqBbgE-imR1NFG6cNGmaZrjyo&q=${encodeURIComponent(address)}`;
  return (
    <div className='container'  style={{marginLeft: '10px'}}>
      {card && (
      <div className='informaistion' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '0 0 50%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
      <img 
            src={card.image.url} 
            alt={card.title} 
            style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            }} 
            onError={(e) => {
              e.currentTarget.src = noPic;
              e.currentTarget.onerror = null;
            }}
        />
        <h2 style={{marginLeft: '10px'}}> {card.title}</h2>
     
        </div>
        <Divider style={{ width: '450px' }} />
        <p style={{marginLeft: '25px'}}>{card.description}</p>
        <div 
      style={{ 
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '400px',
        marginTop: '10px',
      }}>
        
            <div style={{ display: 'flex'}}>
                <LocalPhoneIcon />
                <span>{card.phone}</span> 
            </div>
            <div style={{ display: 'flex'}}>
                <PlaceIcon />
                <span>{address}</span>
            </div>
            </div>


      </div>
      <div  className='map-container' >
        <iframe
        className='map'
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={googleMapsUrl}
        ></iframe>
      </div>
    </div>
      )}
    </div>
  );
};

export default BissnessPage;