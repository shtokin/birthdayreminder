import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const notificationContent = (birthdayId, name) => {
  return (
    <div className="ui info message blue" style={{width: '100%'}}>
      <Link style={{fontWeight: 'bold'}} to={`/birthday/${birthdayId}/edit`}>{name}</Link>&nbsp;
      <FormattedMessage id="app.birthday-notification"
        defaultMessage="has a birthday today." />
    </div>
  );
};

export default notificationContent;