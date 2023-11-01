import React from "react";
import "./PageContainer.scss";

export default function PageContainer({ title, children }) {
  return (
    <div className="pageContainerContainer">
      <h1 className="titleH1">{title}</h1>
      {children}
    </div>
  );
}