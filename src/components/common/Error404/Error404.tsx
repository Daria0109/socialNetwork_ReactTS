import React from "react";
import s from './Error404.module.css'
import errorImage from '../../../assets/images/404-error.jpg'

function Error404() {
  return (
    <div className={s.error_block}>
      <img className={s.error_img} src={errorImage} alt="404"/>
      <div className={s.error_text}>
        <div className={s.error_header}>OOOPS! PAGE NOT FOUND...</div>
        <p className={s.error_paragraph}>You must have picked the wrong door because I haven't been able to
          lay my eye on the page you've been searching for.</p>
      </div>
    </div>
  );
}

export default Error404;