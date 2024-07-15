"use client"



import { useState } from "react";
import "./style.css"
import Head from "components/Head";

const Page = () => {

  const [name, setname] = useState(null);
  const [addres, setaddres] = useState(null);
  const [phone, setphone] = useState(null);
  const [arrinvoce, setarrinvoce] = useState([]);
  

  const setuser = async (e) =>{
    e.preventDefault()

    console.log(name + ' / ' + addres + ' / ' + phone)

    const response = await fetch("api/setuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        addres,
        phone,
        arrinvoce,
      }),
    });
 
    const dataFromBackend = await response.json();
    console.log(dataFromBackend);

    if(response.ok){
      console.log("yes")
    }

  }





  return (
<>
<Head actev={"adduser"} />
  <h4> اضافة عميل جديد </h4>
  <div className="container mt-3">
    <form onSubmit={setuser} style={{ direction: "rtl" }} >
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          {" "}
          أسم العميل{" "}
        </label>
        <input
          onChange={(e)=>{
            setname(e.target.value)
          }}
          type="text"
          name="name"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          {" "}
          العنوان{" "}
        </label>
        <input
          onChange={(e)=>{
            setaddres(e.target.value)
          }}
          type="text"
          name="addres"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          {" "}
          رقم الهاتف{" "}
        </label>
        <input
          onChange={(e)=>{
            setphone(e.target.value)
          }}
          type="number"
          name="phone"
          className="form-control"
          id="exampleInputPassword1"
        />
        <input
          style={{ display: "none" }}
          type="number"
          name="invoicesprice"
          className="form-control"
          id="exampleInputPassword1"
          defaultValue={0}
        />
        <input
          style={{ display: "none" }}
          type="number"
          name="invoicespay"
          className="form-control"
          id="exampleInputPassword1"
          defaultValue={0}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</>

  );
}

export default Page;
