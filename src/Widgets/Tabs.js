import React, { useState } from "react";

function Tabs() {

    const [active, setActive] = useState("FirstTab");

  return (<div>
      <button onClick={()=>setActive("FirstTab")}>One</button>
      <button onClick={()=>setActive("SecondTab")}>Two</button>
      <button onClick={()=>setActive("ThirdTab")}>Three</button>
      <div>
          {active === "FirstTab" && <div>1</div>}
          {active === "SecondTab" && <div>2</div>}
          {active === "ThirdTab" && <div>3</div>}
      </div>
  </div>);
}

export default Tabs;