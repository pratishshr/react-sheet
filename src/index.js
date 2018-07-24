import smoothscroll from 'smoothscroll-polyfill';
import Input from './Input';
import Select from './Select';
import Hagrid from './Hagrid';
import withKeyEvents from './hoc/withKeyEvents';

smoothscroll.polyfill();

export default Hagrid;
export { Input, Select, withKeyEvents };
