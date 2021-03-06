import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.firstname}</td>
   <td>{props.record.lastname}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record.objectId}`}>Editar</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.objectId);
       }}
     >
       Borrar
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:6535/record/`);
     console.log("enter")
     if (!response.ok) {
       console.log("here")
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     
     const records = await response.json();
     
     console.log("RECORDS");
     console.log(records["data"].length);
     setRecords(records["data"]);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:6535/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record.objectId)}
         key={record.objectId}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Nombre</th>
           <th>Apellidos</th>
           <th>Acción</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}