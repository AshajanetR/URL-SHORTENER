import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import { UrlData } from '../../interface/Urldata';
import { serverUrl } from '../../helpers/Constants';
import axios from 'axios';
import DataTable from '../DataTable/DataTable';
interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data,setdata]=React.useState<UrlData[]>([]);
  const [reload,setreload]=React.useState<Boolean>(false);
  const updateReloadState=():void =>{
    setreload(true);
  }
  
  const fetchTableData=async()=>{
    const response=await axios .get(`${serverUrl}/shorturl`);
    console.log("the response from server is:",response.data.length);
    setdata(response.data);
    setreload(false);
  };
  React.useEffect(()=>{
    fetchTableData();
    console.log("refreshed");
  },[reload]);
  return(
    <>
    <FormContainer updateReloadState={updateReloadState} />
    <DataTable updateReloadState={updateReloadState} data={data}/>
    </>
  ) ;
};

export default Container;
