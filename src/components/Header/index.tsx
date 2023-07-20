import { Header as MuiHeader } from '@j-meira/mui-theme';
import Logo2 from '../../assets/logo/logo-text.svg';

export const Header = () => (
  <MuiHeader
    navigation={<img className='logo' src={Logo2} alt='Logo ShopList' />}
  />
);
