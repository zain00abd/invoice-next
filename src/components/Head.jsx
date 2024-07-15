// @ts-nocheck

import React from 'react';
import Link from "next/link";
import "./stylecomp.css"

const Head = () => {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Offcanvas navbar large">
    <div className="container-fluid">
      <button style={{ border: "none" }} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbar2Label">Offcanvas</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-satrt flex-grow-1 pe-3">
            <li className="">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>

          <form className="d-flex mt-3 mt-lg-0 d-none d-lg-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          </ul>
        </div>
      </div>

      <form className="d-flex mt-lg-0 d-lg-none" role="search">
            <button className="btn btn-outline-primary" type="submit"><i class="fa-solid fa-magnifying-glass fa-lg"></i></button>
            <input className="form-control ms-2 " type="search" placeholder="Search" aria-label="Search"/>
          </form>

      <Link className="d-lg-none" href="/">
            <i
              className="fa-solid fa-house-user fa-2xl"
              style={{ color: "#005186" }}
            />
      </Link>
      
      <Link className="d-lg-none" href="/adduser">
      <i className="fa-solid fa-user-plus fa-lg gradient-icon" style={{color: "#e0ecff",}} ></i>
      </Link>

    </div>
  </nav>
    
  );
}

export default Head;
