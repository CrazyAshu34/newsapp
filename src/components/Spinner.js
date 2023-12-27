import React from 'react';
import loading from './images/loading.gif';

const Spinner = () => {
  return (
    <>

      <div className='text-center'>
        <img className='loading-spinner my-3' style={{ width: '50px', height: '50px' }} src={loading} alt="Loading" />
      </div>
    </>
  );
}


export default Spinner;
