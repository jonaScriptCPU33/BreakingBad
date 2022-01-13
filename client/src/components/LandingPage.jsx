import React from "react";
import { Link } from "react-router-dom";

export default function LandigPage() {
  return (
    <div>
      <h1> Bienvenidos a Breaking Bad</h1>
      <Link to="/home">
        <button>Ingresa</button>
      </Link>
    </div>
  );
}
