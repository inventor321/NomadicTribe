import React from "react";
import Tabs from "../Widgets/Tabs";

function ErrorPage() {

  
  console.log(window.location.href);

  return <body >PAGE DOES NOT EXIST
      <h1> Window url {window.location.href}</h1>;
      <h1> windown url path {window.location.pathname}</h1>;
      <Tabs></Tabs>
  </body>;
  
}

export default ErrorPage;