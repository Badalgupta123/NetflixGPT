import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../utils/modalSlice';
import { IMAGE_CDN_URL } from '../utils/constants';

const Modal = () => {
  const dispatch = useDispatch();
  const clickedCard = useSelector(store => store.modal.clickedCard);
  const [showFullDescription,setShowFullDescription]= useState(false);

  const toggleDescription=()=>{
    setShowFullDescription(!showFullDescription)
  }

  const onClose= () => {
    dispatch(showModal());
  }
  const truncateDescription = (description) => {
    if (!description) return '';
    return description.length > 200 ? description.slice(0, 200) + '...' : description;
  };


  return (
    <div
    className={"fixed z-50 inset-0 overflow-y-auto "}
  
  >
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
       
        onClick={onClose}
      ></div>

     
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      
        style={{ width: '800px' }} // Set fixed width for main container
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="text-lg leading-6 font-semibold text-gray-900">{clickedCard.title}</h3>
          <div className="mt-2 flex">
            <div style={{ width: '50%' }}>
              <img 
                src={IMAGE_CDN_URL + clickedCard.img}
                alt="movie_card_icon"
                className='w-full h-auto'
                style={{ width: '100%', height: 'auto' }} // Set width and height
              />
            </div>
            <div style={{ width: '50%', paddingLeft: '20px' }}>
              <p className='font-medium'>Release Date : <i>{clickedCard.release}</i></p>
              <p className='pt-3'>
                <span className='font-medium pb-1'>Description: </span> 
                <br />
                {showFullDescription ? clickedCard.desc : truncateDescription(clickedCard.desc)}
                  {!showFullDescription && clickedCard.desc.length > 200 &&
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={toggleDescription}
                    >
                      Read More
                    </button>
                  }
                  {showFullDescription &&
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={toggleDescription}
                    >
                      Read Less
                    </button>
                  }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
           
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default Modal;