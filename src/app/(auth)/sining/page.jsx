import Link from "next/link";

export const metadata = {
  title: "Signin page",
  description: "description for Signin page",
};

const Page = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1> تسجيل الدخول </h1>
          <form>
            <div className="form-group">
              <div className="bar" />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder=" البريد الالكتروني "
              />

              <div className="bar" />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder="كلمة المرور" />
              <div className="bar" />
            </div>
              <div className="suggestion">
                <p>
                  {" "}
                  اذا لم يكن لديك حساب{" "}
                  <Link href={"/register"}> انشاء حساب </Link>
                </p>
              </div>

            <button type="submit"> تسجيل الدخول </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
