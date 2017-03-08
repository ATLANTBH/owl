import React from 'react';
import cx from 'classnames';
import s from './Footer.css';

function Footer() {
  const containerClassNames = ['container', s.footerContainer].join(' ');
  const containerText = ['text-muted', 'text-center', s.footerContainerText].join(' ');

  return (
    <footer className={s.footer}>
      <div className={containerClassNames}>
        <p className={containerText}>Copyright © 2017 <strong>AtlantBH</strong>.</p>
      </div>
    </footer>
  );
}

export default Footer;
