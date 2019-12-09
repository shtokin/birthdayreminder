import React from 'react';
import { Link } from 'react-router-dom';

const notificationContent = (birthdayId, name) => {
  return (
    <div className="ui info message blue" style={{width: '100%'}}>
      <Link style={{'font-weight': 'bold'}} to={`/birthday/${birthdayId}/edit`}>{name}</Link> has a birthday today.
    </div>
  );
};

export default notificationContent;