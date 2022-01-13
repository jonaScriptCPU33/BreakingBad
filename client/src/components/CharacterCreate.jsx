import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postCharacter, getOccupations } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requere un nombre";
  } else if (!input.nickname) {
    errors.nickName = "Nickname debe ser completado";
  } else if (!input.birthday) {
    errors.birthday = "Birthday deber ser completado";
  }
  return errors;
}

export default function CharacterCreated() {
  const dispatch = useDispatch();
  const history = useHistory();
  const occupations = useSelector((state) => state.occupations);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    occupation: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postCharacter(input));
    alert("Personaje creado!");
    setInput({
      name: "",
      nickName: "",
      birthday: "",
      status: "",
      occupation: [],
    });
    history.push("/character");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      occupation: input.occupation.filter((occ) => occ !== el),
    });
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crear tu personaje</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            value={input.nickname}
            name="nickname"
            onChange={(e) => handleChange(e)}
          />
          {errors.nickName && <p className="errors">{errors.nickName}</p>}
        </div>
        <div>
          <label htmlFor="">Imagen:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Birthday:</label>
          <input
            type="text"
            value={input.birthday}
            name="birthday"
            onChange={(e) => handleChange(e)}
          />
          {errors.birthday && <p className="errors">{errors.birthday}</p>}
        </div>
        <div>
          <label>Status</label>
          <label>
            <input
              type="checkbox"
              name="Alive"
              value="Alive"
              onChange={(e) => handleCheck(e)}
            />
            Alive
          </label>
          <label>
            <input
              type="checkbox"
              name="Decease"
              value="Decease"
              onChange={(e) => handleCheck(e)}
            />
            Decease
          </label>
          <label>
            <input
              type="checkbox"
              name="Unknown"
              value="Unknown"
              onChange={(e) => handleCheck(e)}
            />
            Unknown
          </label>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {occupations.map((occ) => (
            <option value={occ.name}>{occ.name}</option>
          ))}
        </select>
        <ul>
          <li>{input.occupation.map((el) => el + " ,")}</li>
        </ul>
        <button type="submit">Crear personaje</button>
        
      </form>
      {input.occupation.map((el) => (
        <div className="divOcc">
          <p>{el}</p>
          <button className="buttonX" onClick={() => handleDelete(el)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
