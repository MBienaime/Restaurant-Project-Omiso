// == Import : npm
import { connect } from 'react-redux';
import SectionMenu from '../components/SectionMenu';


const mapStateToProps = (state) => ({
  list: state.datasMenus.list,
  

});


const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(SectionMenu);
