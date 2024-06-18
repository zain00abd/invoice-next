// @ts-nocheck
"use client";

import { useEffect, useState, useRef } from "react";
import "./style.css";
import { notFound, useSearchParams } from "next/navigation";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
const port = 3000 || process.env.PORT

console.log(moment().format("D/MM/YYYY"));

const Page = ({ params }) => {
  const [today, settoday] = useState("");
  const [oclock, setoclock] = useState("");

  const [name, setname] = useState(null);
  const [adres, setadres] = useState(null);
  const [phone, setphone] = useState(null);
  const [total, settotal] = useState(null);
  const [arrinvoice, setarrinvoice] = useState([]);
  const [dateinv, setdateinv] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const pathname = useSearchParams();
  const buttonRef = useRef(null);
  const [plusinvoice, setplusinvoice] = useState(0);
  const [showinvoice, setshowinvoice] = useState("d-none");
  const inputRef = useRef(null);
  const [invoices, setinvoices] = useState(0);
  const [allindexarr, setallindexarr] = useState(0);
  const [uninvoice, setuninvoice] = useState("");
  const [iduser, setiduser] = useState(null);
  const [lastinvoice, setlastinvoice] = useState(null);
  
  

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [InvMode, setInvMode] = useState("");

  const addinvoice = (modeinvoice) => {
    if (modeinvoice === "minis") {
      setInvMode("danger");
      addItem(`danger`, "");
    } else {
      setInvMode("success");
      addItem(`success`, "تسديد مبلغ");
      handelarr("inv_des_0", "تسديد مبلغ");
    }
    console.log("zain");
    buttonRef.current.click();

    setshowinvoice("");
    inpfucas();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://nextback-seven.vercel.app/invoice/${params.id}`
        );
        const result = response.data;
        setname(result.name);
        setadres(result.addres);
        setphone(result.phone);
        setiduser(result._id)
        console.log(result.phone);

        console.log(result.arrinvoce.length);
        if (result.arrinvoce.length !== 0) {
          

          setarrinvoice(JSON.parse(result.arrinvoce));
          setlastinvoice(JSON.parse(result.arrinvoce)[JSON.parse(result.arrinvoce).length-1])
          const getmony = JSON.parse(result.arrinvoce);
          // console.log("************user************");
          let totalarruser = 0;
          let arrinvo = [];
          let dateinvoice = [];

          getmony.forEach((arrmoney) => {
            dateinvoice.push(arrmoney.date);
            const totalonearr = arrmoney.money.reduce(
              (acc, num) => acc + num,
              0
            );
            totalarruser += totalonearr;
            arrinvo.push(totalarruser);
          });
          setCurrentTotal(arrinvo);
          console.log(currentTotal)
          setdateinv(dateinvoice);
          console.log(dateinv)

          console.log("2");
        } else {
          setuninvoice("لم يتم تسجيل فواتير بعد");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          notFound();
        } else {
          console.error("Unexpected error occurred:", error);
        }
      }
    };
    settotal(pathname.toString().replace("=", ""));

    getData();
  }, [params.id, pathname]);

  const [indexli, setindexli] = useState(0);
  const [items, setItems] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addItem = (mode, value) => {
    setindexli((prevCounter) => prevCounter + 1);
    const newItem = {
      id: indexli + 1,
      classi: `list-group-item-${mode}`,
      valueinp: `${value}`,
    };

    console.log("indexli");
    setItems([...items, newItem]);
    console.log(items);
    setinvoices((prevCounter) => prevCounter + 2);
  };

  const inpfucas = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
    sessionStorage.removeItem("arr1");
    sessionStorage.removeItem("arr2");
  }, []);

  let arrdes = [];
  let arrmoney = [];


  const handelarr = (id, value) => {
    if (
      sessionStorage.getItem("arr1") !== null ||
      sessionStorage.getItem("arr2") !== null
    ) {
      arrmoney = JSON.parse(sessionStorage.getItem("arr1"));
      arrdes = JSON.parse(sessionStorage.getItem("arr2"));
    }

    let namearr = id.split("_")[1];
    let indexarr = parseInt(id.split("_")[2], 10);

    if (namearr === "des") {
      arrdes[indexarr] = value;
    } else {
      if (InvMode == "danger") arrmoney[indexarr] = +-value;
      else arrmoney[indexarr] = +value;
    }

    sessionStorage.setItem("arr1", JSON.stringify(arrmoney));
    sessionStorage.setItem("arr2", JSON.stringify(arrdes));

    filterarr();
  };

  const [description, setdescription] = useState([]);
  const [money, setmoney] = useState([]);

  const filterarr = () => {
    settoday(moment().format("D/MM/YYYY"));
    setoclock(moment().format("LT"));

    let arrdesfilter = arrdes.filter(function (value) {
      return value !== null && value !== undefined && value !== "";
    });

    let arrmoneyfilter = arrmoney.filter(function (value) {
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0 &&
        !isNaN(value)
      );
    });

    console.log("Filtered arrdes:", arrdesfilter);
    console.log("Filtered arrmoney:", arrmoneyfilter);

    setdescription(arrdesfilter);
    setmoney(arrmoneyfilter);

    setallindexarr(arrdesfilter.length + arrmoneyfilter.length);

    setplusinvoice(
      arrmoneyfilter.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  };

  const deleteitem = (item) => {
    let indexdeletitem = +item.id;
    handelarr(`inv_des_${indexdeletitem}`, null);

    handelarr(`inv_mon_${indexdeletitem}`, null);
    item.parentElement.remove();
    setinvoices((prevCounter) => prevCounter - 2);
  };

  const addnewinvoice = (arr) => {
    settoday(moment().format("D/MM/YYYY"));
    setoclock(moment().format("LT"));
    let lastarrinvoice = arrinvoice[arrinvoice.length-1]
    setlastinvoice(lastarrinvoice)

    if (arrinvoice != "") {

      if (lastarrinvoice.date == today) {
        updateoldinvoice()
      } 
      else {
        creatnewinvoice()
      }





    } else {
      console.log("no arr");
      creatnewinvoice()
    }
  };

  const creatnewinvoice = () => {
    
    const repeatValue = (value, times) => {
      return Array.from({ length: times }, () => value);
    };
    let time = repeatValue(oclock, description.length);
    let user = repeatValue(localStorage.getItem("name"), description.length);

    let newobj = {};
    newobj = {
      date: today,
      description: description,
      money: money,
      user: user,
      dateofregistration: time,
    };
    arrinvoice.push(newobj);
    console.log(newobj);
    console.log(JSON.stringify(arrinvoice));
    SubmitUpdate()
  };

  const updateoldinvoice = () => {

    console.log(lastinvoice.money)

    SubmitUpdate()

  };

  const SubmitUpdate = async (e) =>{
    


    const response = await fetch(`https://invoice-next-three.vercel.app/api/updateinvoice`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        adres,
        phone,
        arrinvoice:JSON.stringify(arrinvoice),
        iduser,
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
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ direction: "rtl" }}
        data-bs-theme="dark"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-white text-center m-auto"
                id="exampleModalLabel"
              >
                {" "}
                اختر نوع العملية{" "}
              </h1>
            </div>
            <div className="modal-body text-center">
              <div className="row p-3 m-auto justify-content-between">
                <button
                  className="btn btn-success m-auto w-60 col-5"
                  style={{ height: 90, padding: 25 }}
                  id="inv_price"
                  onClick={() => {
                    addinvoice("plus");
                  }}
                >
                  تسديد مبلغ
                  <i
                    className="fa-solid fa-hand-holding-dollar fa-xl"
                    style={{ height: 50, fontWeight: 600 }}
                  />
                </button>
                <button
                  className="btn btn-danger m-auto w-60 col-5"
                  style={{ height: 90, padding: 25 }}
                  id="inv_unprice"
                  onClick={() => {
                    addinvoice("minis");
                  }}
                >
                  اضافة فاتورة
                  <i
                    className="fa-solid fa-file-circle-plus fa-xl"
                    style={{ height: 50, fontWeight: 600 }}
                  />
                </button>
              </div>
              <button
                className="btn btn-warning d-block mt-3 m-auto w-50"
                style={{ height: 50, fontWeight: 600 }}
              >
                تعديل
                <i
                  className="fa-solid fa-pen-to-square fa-xl"
                  style={{ color: "#000000" }}
                />
              </button>
            </div>
            <div className="modal-footer">
              <button
                ref={buttonRef}
                id="btn_cname"
                type="button"
                className="btn btn-secondary text-center m-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <form action="/edit/<%= arr._id %>?_method=PUT" method="post">
        <p className="d-none" id="date_today"></p>
        <p className="d-none" id="data_req"></p>
        <input
          className="d-none"
          name="arrinvoce"
          type="text"
          defaultValue="<%= arr.arrinvoce %>"
          id="inp_ReqAdd_invoice"
        />
        <div className="container mt-3" style={{ direction: "rtl" }}>
          <div>
            <div>
              الاسم:{name}
            </div>
            <div>
              العنوان:{adres}
            </div>
            <div>
              الهاتف:{phone}
            </div>
          </div>

          {/* style requst invoice */}

          {arrinvoice.map((arr, index) => {
            return (
              <ul
                className="list-group mb-4 mt-4"
                style={{ padding: 0 }}
                key={index}
              >
                <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary">
                  <div style={{ width: "50%", textAlign: "center" }}>الوصف</div>
                  <div className="vr" />
                  <div style={{ width: "50%", textAlign: "center" }}>
                    المبلغ
                  </div>
                  <div className="vr" />
                  <div style={{ width: "50%", textAlign: "center" }}>
                    اخراج والوقت
                  </div>
                </li>
                {/*** body invoce ***/}

                {arr.money.reduce((acc, num) => acc + num, 0) && index != 0 ? (
                  <div>
                    <li
                      className={`list-group-item d-flex justify-content-between align-items-center list-group-item-warning`}
                    >
                      <input
                        className=""
                        type="text"
                        style={{ width: "50%", textAlign: "center" }}
                        id="inv_Ms"
                        defaultValue={"فاتورة سابقة"}
                      />

                      <div className="vr" />
                      <input
                        className={`${
                          currentTotal[index - 1] < 0
                            ? "text-danger"
                            : currentTotal[index - 1] > 0
                            ? "text-success"
                            : ""
                        }`}
                        type="text"
                        name="rtty"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        style={{
                          width: "50%",
                          textAlign: "center",
                          direction: "ltr",
                        }}
                        id="inv_Ms"
                        defaultValue={
                          currentTotal[index - 1] > 0
                            ? "+" + currentTotal[index - 1]
                            : Math.abs(currentTotal[index - 1])
                        }
                      />

                      <div className="vr" />
                      <button
                        style={{
                          width: "48%",
                          textAlign: "center",
                          fontWeight: 600,
                          border: "none",
                          color: "#000000",
                        }}
                        type="button"
                        className="btn"
                        data-bs-container="body"
                        data-bs-toggle="popover"
                        data-bs-placement="right"
                        data-bs-content="thth"
                      >
                        {dateinv[index - 1]}
                      </button>
                    </li>
                  </div>
                ) : (
                  ""
                )}

                {arr.money.map((inv, Larr) => {
                  return (
                    <div key={Larr}>
                      <li
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          arr.description[Larr] !== "تسديد مبلغ"
                            ? "list-group-item-danger"
                            : "list-group-item-success"
                        }`}
                      >
                        <input
                          className=""
                          type="text"
                          style={{ width: "50%", textAlign: "center" }}
                          id="inv_Ms"
                          defaultValue={arr.description[Larr]}
                        />

                        <div className="vr" />
                        <input
                          className=""
                          type="text"
                          name="rtty"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          style={{
                            width: "50%",
                            textAlign: "center",
                            direction: "ltr",
                          }}
                          id="inv_Ms"
                          defaultValue={Math.abs(arr.money[Larr])}
                        />

                        <div className="vr" />
                        <button
                          style={{
                            width: "48%",
                            textAlign: "center",
                            fontWeight: 600,
                            border: "none",
                            color: "#000000",
                          }}
                          type="button"
                          className="btn"
                          data-bs-container="body"
                          data-bs-toggle="popover"
                          data-bs-placement="right"
                          data-bs-content="thth"
                        >
                          {arr.user[Larr]}
                        </button>
                      </li>
                    </div>
                  );
                })}

                {/*** body invoce ***/}

                {/* end invoce */}

                <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary border border-1 border-secondary-subtle">
                  <div
                    className=""
                    style={{ width: "50%", textAlign: "center" }}
                    id="date"
                  >
                    {arr.date}
                  </div>
                  <div
                    className=""
                    style={{
                      backgroundColor: "black",
                      fontSize: 2,
                      height: 22,
                    }}
                  >
                    |
                  </div>
                  <div style={{ width: "50%", textAlign: "center" }}>
                    الاجمالي:
                    <small
                      className="text-danger"
                      id=""
                      style={{ direction: "ltr" }}
                    >
                      {currentTotal[index]}
                    </small>
                  </div>
                </li>
              </ul>
            );
          })}

          {arrinvoice == "" && (
            <h3
              style={{
                margin: "auto",
                textAlign: "center",
                color: "rgba(255, 0, 0, 0.623)",
                padding: 80,
              }}
            >
              {" "}
              {uninvoice}{" "}
            </h3>
          )}
          {/* style add invoice */}

          <div
            className={showinvoice}
            style={{
              backgroundColor: "rgba(196, 196, 196, 0.349)",
              margin: "20px ,0px",
              borderRadius: 15,
            }}
          >
            <ul
              className="list-group mt-4"
              id="inv_new"
              style={{ left: 20, position: "relative" }}
            >
              <h3 className="text-center text-white">اضافة فاتورة</h3>
              {/* top invoce */}
              <li
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary"
                id="dis_mode"
              >
                <div style={{ width: "50%", textAlign: "center" }}>الوصف</div>
                <div className="vr" />
                <div style={{ width: "50%", textAlign: "center" }}>المبلغ</div>
              </li>
              {/*** body invoce ***/}
              {/*** inp add ***/}

              <div key={1}>
                {items.map((item, index) => (
                  <div className="" key={index}>
                    <li
                      className={`list-group-item d-flex justify-content-between align-items-center ${item.classi}`}
                    >
                      <input
                        onChange={(e) => {
                          handelarr(e.target.id, e.target.value);
                        }}
                        className=""
                        type="text"
                        style={{ width: "48%", textAlign: "center" }}
                        id={`inv_des_${item.id}`}
                        defaultValue={item.valueinp}
                        ref={inputRef}
                      />

                      <div className="vr" />
                      <input
                        onChange={(e) => {
                          handelarr(e.target.id, e.target.value);
                        }}
                        className=""
                        type="text"
                        name="rtty"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        style={{
                          width: "48%",
                          textAlign: "center",
                          direction: "ltr",
                        }}
                        id={`inv_mon_${item.id}`}
                        defaultValue={item.value2}
                      />

                      {InvMode == "danger" && (
                        <>
                          <div
                            className="vr"
                            style={{
                              left: "40px",
                              position: "absolute",
                              height: "25px",
                            }}
                          />
                          <button
                            id={item.id}
                            onClick={(e) => {
                              deleteitem(e.currentTarget);
                            }}
                            className="btn"
                            style={{ position: "absolute", left: "0px" }}
                          >
                            <i
                              className="fa-regular fa-circle-xmark fa-lg"
                              style={{ color: "#800000" }}
                            ></i>
                          </button>
                        </>
                      )}
                    </li>
                  </div>
                ))}
              </div>

              {/*** body invoce ***/}
              {/* end invoce */}
              <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary">
                <div
                  style={{
                    width: "50%",
                    textAlign: "center",
                    color: "rgb(0, 110, 46)",
                  }}
                  id="date1"
                >
                  {today}
                </div>

                {InvMode == "danger" && (
                  <>
                    <button
                      onClick={() => {
                        addItem(`${InvMode}`, "");
                        inpfucas();
                      }}
                      id="btn_addinv"
                      type="button"
                      className="btn btn-warning rounded-circle"
                    >
                      <i className="fa-solid fa-plus" />
                    </button>
                  </>
                )}

                <div style={{ width: "50%", textAlign: "center" }}>
                  الاجمالي:
                  <small className="text-danger" id="total_inv">
                    {plusinvoice}
                  </small>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <ul className="list-group" style={{ marginTop: 180 }}>
          <li
            className="list-group-item d-flex justify-content-between align-items-center list-group-item-light"
            style={{ position: "fixed", bottom: 0, width: "100%", height: 50 }}
          >
            <div
              style={{
                width: "45%",
                textAlign: "center",
                color: "rgb(0, 110, 46)",
              }}
            >
              {InvMode === "danger" || InvMode === "success" ? (
                <>
                  <button
                    onClick={addnewinvoice}
                    href="#"
                    className={`btn btn-primary w-100 ${
                      allindexarr != invoices ? "disabled" : ""
                    }`}
                    role="button"
                    id="btn_save"
                  >
                    حفظ التغييرات
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    id="btn_whats"
                  >
                    <i
                      className="fa-brands fa-whatsapp fa-xl"
                      style={{ color: "#ffffff" }}
                    />
                    WhatsApp
                  </button>
                </>
              )}
            </div>

            <div
              style={{ width: "45%", textAlign: "center" }}
              id="gro_btn_invoice"
            >
              {InvMode === "danger" || InvMode === "success" ? 
                
                  <Link
                    className="btn btn-danger w-100"
                    href={`/`}
                    id="btn_close"
                  >
                    الغاء
                  </Link>
                
               : 
                
                  <div
                    className="dropup-center dropup"
                    id="btn_section"
                    style={{ width: "100%" }}
                  >
                    <button
                      style={{
                        width: "100%",
                        fontWeight: 600,
                        letterSpacing: "1.1px",
                      }}
                      className="btn btn-danger"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <i
                        className="fa-solid fa-sack-dollar fa-lg"
                        style={{ color: "#ffffff" }}
                      />
                      {Math.abs(currentTotal[currentTotal.length-1])}
                    </button>
                    <small className="d-none" id="ttt-1">
                      4546
                    </small>
                  </div>
                
              }
            </div>
          </li>
        </ul>

        <button className="d-none" type="submit" id="myForm" />
      </form>
    </>
  );
};

export default Page;
