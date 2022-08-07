import { Helmet } from 'react-helmet';
const Metadata = ({ title }) => {
    return ( 
        <Helmet>
            <title>{`${title} - MeroShop`}</title>
        </Helmet>
     );
}
 
export default Metadata;