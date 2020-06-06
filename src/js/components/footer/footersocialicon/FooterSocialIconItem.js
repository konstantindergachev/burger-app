import React from 'react';
import PropTypes from 'prop-types';
import image from '../../../../img/socials-sprite.svg';
import './FooterSocialIcons.scss';

const FooterSocialIconItem = ({ id, data }) => (
  <a
    href={data}
    className={`footer__icon footer__icon-${id.substring(1)}`}
    target="_blank"
  >
    <svg className="footer__svg">
      <use className="footer__img" xlinkHref={`${image}${id}`} />
    </svg>
  </a>
);

FooterSocialIconItem.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default FooterSocialIconItem;
