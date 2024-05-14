import React from 'react';
import ReactPlayer from 'react-player';
import video from '../Assets/videos/video.mp4';
import backgroundImage from '../Assets/background.png';

const Shop = () => {
  return (
    <div className="shop-container" style={{
      display: 'flex',
      padding: '2%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <ReactPlayer
        url={video}
        playing={true}
        muted={true}
        loop={true}
        controls={false}
        width='80%'
        height='80%'
      />
    </div>
  );
};

export default Shop;