import {faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

const CreateAlbum = () => {

    const Navigate = useNavigate()
  return (
    <div className="text-center my-25 font-bold">
         <FontAwesomeIcon icon={faCircleXmark} size='2x' className='text-white mb-4' onClick={()=>Navigate('/')} />
      <h1>COMING SOON!</h1>
    </div>
  )
}

export default CreateAlbum
