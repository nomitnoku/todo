import React from 'react';
import PropTypes from 'prop-types';
import {
  Search, ArrowHead, Trash, EditIcon,
} from './svg';

const Svg = (props) => {
  const {
    svg,
  } = props;
  switch (svg) {
    case 'search': return <Search {...props} />;
    case 'arrowHead': return <ArrowHead {...props} />;
    case 'trash': return <Trash {...props} />;
    case 'edit': return <EditIcon {...props} />;
    default: return null;
  }
};

Svg.propTypes = {
  svg: PropTypes.string.isRequired,
};

export default Svg;
