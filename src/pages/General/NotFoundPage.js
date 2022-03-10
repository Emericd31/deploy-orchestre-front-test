import React from "react";
import MenuComponent from "../../components/MenuComponent";

export default function NotFoundPage() {
  return (
    <div>
    <div style={{height: '100vh', display: "flex", flexDirection: "Column", alignItems: "center", justifyContent: "center"}}>
      <p>Oups, la page n'existe pas.</p>
    </div>
  </div>
  );
}
