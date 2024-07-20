// import Footer from "components/footer/footer";
// import Header from "components/header/header";

import Link from "next/link";




export const metadata = {
  title: "Register page",
  description: "description for Register page",
};

const Page = () => {
  return (
    
    
<>

      <div className="login-container">
        <div className="login-form">
          <h1> انشاء حساب </h1>
          <form>
            <div className="form-group">
              <input type="text" id="username" placeholder=" الاسم "/>
  
              <div className="bar" />
            </div>
            <div className="form-group">
              <input type="email" id="email" placeholder=" البريد الالكتروني "/>
  
              <div className="bar" />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder="كلمة المرور"/>

              
              <div className="bar" />
            </div>
              <div className="suggestion">
                <p>
                  {" "}
                {" "}هل لديك حساب بالفعل؟{" "}
                  <Link href={"/sining"}> تسجيل الدخول </Link>
                </p>
              </div>
            <button type="submit">تسجيل</button>
          </form>
        </div>
      </div>
</>
  );
};

export default Page;
