import preloader from '../../../assets/images/preloader.gif';
import React from 'react';

type PreloaderPropsType = {

}

const Preloader = function (props:PreloaderPropsType) {
    return (
        <div>
            <img src={preloader} alt="Preloader"/>
        </div>
    )
}
export default Preloader;