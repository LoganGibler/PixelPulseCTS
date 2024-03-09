// import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";

// // import { testingProtectedRoute } from "../auth/auth";

// import Spinner from "../components/Spinner";

// function ProtectedRoute({ element: Element, ...rest }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   async function checkAuthentication() {
//     const authenticated = await testingProtectedRoute();
//     // console.log("THIS IS authenticated", authenticated);
//     setIsAuthenticated(authenticated);
//   }

//   useEffect(() => {
//     checkAuthentication();
//   }, []);

//   if (isAuthenticated === null) {
//     return (
//       <div className="flex text-slate-400 justify-center grow min-h-screen">
//         <div className="flex flex-col">
//           <p className="text-sm xs:text-base">
//             {" "}
//             Bad Auth. Please log out to refresh your token.
//           </p>
//           <div className="flex justify-center mt-5">
//             <Spinner />
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return isAuthenticated ? (
//       <Element {...rest} />
//     ) : (
//       <Navigate to="/access-denied" replace />
//     );
//   }
// }

// export default ProtectedRoute;
