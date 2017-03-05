import React from 'react';
import './styles.scss';

const Spinner = ({ show }) => (
  <div className={`main ${show ? 'show' : ''}`}>
    <div className="load-9">
      <div className="spinner">
          <div className="bubble-1"></div>
          <div className="bubble-2"></div>
      </div>
    </div>
  </div>
);

export default Spinner;
