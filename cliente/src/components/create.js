import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const navigate = useNavigate();

 const [form, setForm] = useState({
   firstName: "",
   lastName: "",
   addresLine: "",
   addresLineTwo: "",
   town: "",
   city: "",
   zipCode: "",
   phone: "",
   dateBirth: ""
  });

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:6535/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ firstName: "",
   lastName: "",
   addresLine: "",
   addresLineTwo: "",
   town: "",
   city: "",
   zipCode: "",
   phone: "",
   dateBirth: "" });

   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div className="container">
     <h3>Crear Nuevo Usuario</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group row">
        <div className="col-md-6">
         <label htmlFor="name">Nombre</label>
         <input type="text" className="form-control" id="name" value={form.firstName} onChange={(e) => updateForm({ firstName: e.target.value })}
         />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName">Apellidos</label>
          <input type="text" className="form-control" id="lastName" value={form.lastName} onChange={(e) => updateForm({ lastName: e.target.value })}
          />
        </div>
       </div>
       <div className="form-group ">
        <label htmlFor="addresLine">Dirección</label>
        <input type="text" className="form-control" id="addresLine" value={form.addresLine} onChange={(e) => updateForm({ addresLine: e.target.value })}
        />
       </div>
       <div className="form-group">
         <label htmlFor="addresLineTwo">Dirección 2</label>
         <input type="text" className="form-control" id="addresLineTwo" value={form.addresLineTwo} onChange={(e) => updateForm({ addresLineTwo: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="town">Delegación</label>
         <input type="text" className="form-control" id="town" value={form.town} onChange={(e) => updateForm({ town: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="city">Ciudad</label>
         <input type="text" className="form-control" id="city" value={form.city} onChange={(e) => updateForm({ city: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="zipCode">Código Postal</label>
         <input type="text" className="form-control" id="zipCode" value={form.zipCode} onChange={(e) => updateForm({ zipCode: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="phone">Teléfono</label>
         <input type="text" className="form-control" id="phone" value={form.phone} onChange={(e) => updateForm({ phone: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="dateBirth">Fecha de Nacimiento:</label>
         <input type="date" className="form-control" id="dateBirth" value={form.dateBirth} onChange={(e) => updateForm({ dateBirth: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input type="submit" value="Crear Usuario" className="btn btn-primary btn-block"/>
       </div>
     </form>
   </div>
 );
}