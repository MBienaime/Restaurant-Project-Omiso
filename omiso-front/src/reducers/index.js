import { combineReducers } from 'redux';

import datasMenus from './datasMenus';
import etatMenu from './etatMenu';

import etatModal from './etatModal';
import etatUser from './etatUser';
import orders from './orders';


export default combineReducers({
  datasMenus, etatMenu, etatModal, etatUser, orders,
});
