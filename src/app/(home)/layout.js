export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import 'react-toastify/dist/ReactToastify.css';





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: "aliceblue"}}>
      {/* <Header /> */}

        {children}
        </body>
    </html>
  )
}
