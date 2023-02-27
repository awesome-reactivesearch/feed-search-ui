import React from "react";

import styles from "./TagSelector.module.css";

export default function TagSelector({ options, setOptions }) {
  return (
    <div className="row">
      <div className="col">
        {options.map((option, idx) => (
          <span
            onClick={() => setOptions(options.filter((opt) => opt !== option))}
            className={`badge bg-primary rounded-pill p-2 m-1 ${styles.tag}`}
            key={option}
          >
            <span className="me-1">{option}</span>
            <i className="fa-solid fa-xmark"></i>
          </span>
        ))}
      </div>
      <div className="col">
        <select
          onChange={(e) =>
            setOptions([e.target.value, ...options].filter((_, i) => i < 3))
          }
          value="1"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="1">Select an option</option>
          <option value="Harry Potter">Harry Potter</option>
          <option value="Lord of the Rings">Lord of the Rings</option>
          <option value="Moby Dick">Moby Dick</option>
          <option value="Hunger Games">Hunger Games</option>
        </select>
      </div>
    </div>
  );
}
