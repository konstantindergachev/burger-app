import React from 'react';
import { Context } from '../../provider/Provider';
import Copyright from './copyright/Copyright';
import './Footer.scss';
import FooterSocialIconItem from './footersocialicon/FooterSocialIconItem';

const Footer = () => (
  <footer className="footer">
    <Context.Consumer>
      {(context) =>
        Object.entries(context.state.footerSection).map(
          ([ key, value ]) =>
            key !== 'social' ? (
              <Copyright key={key} data={value} />
            ) : key !== 'copyright' ? (
              Object.entries(value).map(
                ([ key, value ]) =>
                  key !== '#facebook' ? (
                    <FooterSocialIconItem key={key} id={key} data={value} />
                  ) : key !== '#github' ? (
                    <FooterSocialIconItem key={key} id={key} data={value} />
                  ) : (
                    ''
                  )
              )
            ) : (
              ''
            )
        )}
    </Context.Consumer>
  </footer>
);
export default Footer;
