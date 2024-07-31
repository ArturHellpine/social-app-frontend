import React from 'react';
import {useNavigate} from "react-router-dom";
import {FaRegArrowAltCircleLeft} from "react-icons/fa";

const GoBack = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
      <div onClick={handleGoBack} className='text-default-500 flex items-center gap-2 mb-8 cursor-pointer w-max'>
        <FaRegArrowAltCircleLeft size={18} />
        Назад
      </div>
  );
};

export default GoBack;