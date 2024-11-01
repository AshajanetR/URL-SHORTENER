import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return(
    <div className='bg-[#1A120B] text-white text-center text-base py-5'>
        Copyright &#169; URLShortener | Ashajanet R
    </div>
  ) ;
};

export default Footer;
