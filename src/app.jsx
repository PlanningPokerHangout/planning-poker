import React from 'react';

import Poker from './components/Poker.react';
import GoogleHangoutDAO from './dao';

GoogleHangoutDAO.init();

React.render(
    <Poker />,
    document.getElementById('app')
);
