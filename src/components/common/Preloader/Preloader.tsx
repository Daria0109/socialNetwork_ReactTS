import preloader from '../../../assets/images/preloader.gif';
import React, {FC} from 'react';

type PreloaderPropsType = {

}

const Preloader: FC<PreloaderPropsType> = function (props) {
    return (
        <div>
            <img src={preloader} alt="Preloader"/>
        </div>
    )
}
export default Preloader;