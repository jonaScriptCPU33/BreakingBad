import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, image, nickname, id}) {
  return (
    <div className="tarjeta">
      <Link to= {`/details/${id}`} >
        <h3>{name}</h3>
        <h5>{nickname}</h5>
        <img src={image} alt="img not found" width="200px" height="250px" />
      </Link>
    </div>
  );
}
