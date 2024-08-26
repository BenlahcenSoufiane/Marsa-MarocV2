import Addadmin from '../components/add-admin';
import AdminTable from '../components/add_table';
import { useState } from 'react';

function Roote() {
  const [dataChanged, setDataChanged] = useState(false);
  const handleDataChange=()=>{
    setDataChanged((prev)=>!prev);
    console.log('here I am',dataChanged);
    
  };
  return (
    <div >
      <AdminTable ondataChange={dataChanged}/>
      <Addadmin onDatachange={handleDataChange} />
    </div>
      
    
    
  );
}

export default Roote;
