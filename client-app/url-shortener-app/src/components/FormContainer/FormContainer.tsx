import * as React from 'react';
import axios from "axios";
import { serverUrl } from '../../helpers/Constants';
interface IFormContainerProps {
  updateReloadState:()=>void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const [fullUrl,setfullUrl]=React.useState<string>("");
  const {updateReloadState}=props;
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
     try {
      await axios.post(`${serverUrl}/shortUrl`,{
        fullUrl:fullUrl,
      });
      setfullUrl("");
      updateReloadState();
     } catch (error) {
      console.log(error);
     }
  };
  return(
    <div className='container mx-auto p-2'>
        <div className='bg-[#D5CEA3] my-8 rounded-xl bg-cover bg-center shadow-2xl'>
          <div className='w-full h-full rounded-xl p-20 background-brightness-50'>
          <h2 className='text-center text-[#3C2A21] text-4xl pb-4'>URL Shortener</h2>
          <p className='text-[#3C2A21] text-center pb-2 text-xl font-extralight'>Paste your untidy link to shorten it</p>
          <p className='text-[#3C2A21] text-center pb-4 text-sm'>free tool to shorten a URL or reduce link,Use our URL shortener to create a shortened & neat link making it easy to use.</p>
          <form onSubmit={handleSubmit}>
            <div className='flex'>
              <div className='relative w-full '>
                <div className='absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800' >urlshortener.link/</div>
                <input type="text" placeholder=' add your link' required className='block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#E5E5CB] ps-32 focus:ring-blue-500 focus:border-blue-500 shadow-2xl shadow-[#54473F] '
                value={fullUrl}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setfullUrl(e.target.value)}
                />
              <button type="submit" className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#1A120B] rounded-lg border border-[#3C2A21] focus:ring-4 focus:outline-none focus:ring-blue-300 '>
                Shorten URL
              </button>
              </div>
            </div>
          </form>
          </div>
        </div>
    </div>
  ) ;
};

export default FormContainer;
