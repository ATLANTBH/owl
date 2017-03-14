import React from 'react';
import classnames from 'classnames';
import style from './Footer.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <p className={classnames('text-muted', 'text-center', style.footerContainerText)}>Copyright © 2017 <strong>AtlantBH</strong>.</p>
      </div>
    </footer>
  );
}

export default Footer;
