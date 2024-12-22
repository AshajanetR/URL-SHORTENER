import * as React from 'react';
import { UrlData } from '../../interface/Urldata';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../helpers/Constants';
import axios from 'axios';
interface IDataTableProps {
  data:UrlData[];
  updateReloadState:()=>void;
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
const {data,updateReloadState}= props;
console.log("data in datatable is:",data);
const renderTableData=()=>{
   return data.map((item)=>{
    return(
      <>
      <tr key={String(item._id)} className='border-b text-[#1A120B] bg-[#E5E5CB] hover:bg-[#D5CEA3] hover:text-[#3C2A21]'>
      <td className='px-6 py-3 break-words'>
        <Link to={String(item.fullUrl)} target="_blank" rel="noreferrer noopener" >
        {item.fullUrl}
        </Link>
      </td>
      <td className='px-6 py-3 break-words'>
        <Link  to={`${serverUrl}/shortUrl/${String(item.shortUrl)}`} target="_blank" rel="noreferrer noopener">
        {item.shortUrl}
        </Link>
      </td>
      <td className='px-6 py-3 '>
        {String(item.clicks)}
      </td>
      <td className='px-6 py-3 flex gap-2'>
        <div onClick={()=>copyToClipboard(item.shortUrl)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
      <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
      <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
      </svg>
      </div>
      <div onClick={()=>deleteUrl(item._id)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" color='black'>
      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
      </svg>
      </div>
      </td>
      </tr>
      </>
    );
   });
};
const copyToClipboard=async(url:String)=>{
  try {
       await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
       alert(`URL copied:${serverUrl}/shortUrl/${url}`);
  } catch (error) {
   console.log(error);
  }
 }
const deleteUrl=async(id:String)=>{
   try {
    const response=await axios.delete(`${serverUrl}/shortUrl/${id}`);
    updateReloadState();
    console.log(response);
   } catch (error) {
    console.log(error);
   }
}
  return(
    <div className='container mx-auto pt-2 pb-10'>
      <div className='relative overflow-x-auto shadow-sm sm:rounded-lg'>
        <table className='w-full table-fixed text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-md uppercase text-gray-50 bg-[#3C2A21]'>
            <tr>
              <th scope="col" className='px-6 py-3 w-6/12'>FullUrl</th>
              <th scope="col" className='px-6 py-3 w-3/12'>ShortUrl</th>
              <th scope="col" className='px-6 py-3 '>Clicks</th>
              <th scope="col" className='px-6 py-3 '>Action</th> 
            </tr>
          </thead>
          <tbody>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    </div>
  ) ;
};

export default DataTable;
