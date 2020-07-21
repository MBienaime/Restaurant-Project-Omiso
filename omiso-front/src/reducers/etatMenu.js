import { CHOIX_MENU,HANDLE_CHANGE_COMMENT } from '../actions';

const initialState = {
  choixMenu: 'Entree',
  comment:"",
};

const etatMenu = (state = initialState, action = {}) => {
  switch (action.type) {

    case HANDLE_CHANGE_COMMENT:
    return {
      ...state,
      comment: action.payload,
    };

    case CHOIX_MENU:
      return {
        ...state,
        choixMenu: action.payload,
      };

    default:
      return state;
  }
};

export default etatMenu;

// choix menus avec SELECTOR

export const categoryList = (state) => state.datasMenus.list.filter((d) => (d.category === state.etatMenu.choixMenu && d.status==true));
export const selectMenu = (state) => state.datasMenus.list.filter((d) => d.quantity > 0);
export const sommeCommande = (state) => (state.datasMenus.list.map((selection) => selection.quantity * selection.price).reduce((totale, number) => totale + number, 0).toFixed(2));
