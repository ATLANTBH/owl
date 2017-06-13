import React from 'react';
import classNames from 'classnames';
import style from './style.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <p className={classNames('text-muted', 'text-center', style.footerContainerText)}>
          Copyright © 2017 <strong>AtlantBH</strong>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
