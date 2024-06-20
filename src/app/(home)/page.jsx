"use client";

import Link from "next/link";
import { notFound, usePathname  } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  useEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    // @ts-ignore
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  }, []);

  const [dataa, setdata] = useState([]);
  const [arrinv, setarrinv] = useState(0);
  

  const pathname = usePathname()
  console.log(pathname)





  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://nextback-seven.vercel.app/invoice");
      if (!res.ok) {
        notFound();
      }
      const result = await res.json();
  
      const updatedResult = result.map(user => {
        let totalarruser = 0;
  
        if (user.arrinvoce && user.arrinvoce.length > 0) {
          const getmony = JSON.parse(user.arrinvoce);
          console.log("************user************");
          let arrtoo = [];
          getmony.forEach((arrmoney) => {
            const totalonearr = arrmoney.money.reduce((acc, num) => acc + num, 0);
            totalarruser += totalonearr;
            arrtoo.push(totalarruser);
          });
          console.log(arrtoo);
        }
  
        totalarruser = Math.abs(totalarruser);
        user.total = totalarruser;
        if (totalarruser === 0) {
          user.total = 0;
        }
        return user;
      });
  
      setdata(updatedResult);
    };
  
    getData();
  }, []);
  

  return (
    <div className="container">
<button type="button" className="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover">
  Popover on top
</button>

      <div className="mb-5" style={{ marginTop: 20 }}>
        {dataa.map((user) => (
          <ul className="list-group" key={user._id}>
            <li
              className="list-group-item d-flex justify-content-between"
              style={{ fontWeight: 600, margin: 5, marginTop: 10 }}
              id="div_user"
            >
              <div
                className="d-flex justify-content-between"
                style={{ display: "flex", width: "45%" }}
              >
                <Link href="/info" className="">
                  <i
                    className="fa-solid fa-circle-info fa-2xl"
                    style={{ color: "#dbac00" }}
                  />
                </Link>
                <div className="vr" />
                <Link
                  href={`/view/${user._id}`}
                  className="col-6 badge bg-danger rounded-pill"
                  style={{
                    fontSize: 14,
                    letterSpacing: "1.3px",
                    textDecoration: "none"
                  }}
                >
                  {user.total}
                </Link>
              </div>
              {user.name}


              
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Page;
