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
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
          <option value="Comedy">Comedy</option>
          <option value="Family">Family</option>
          <option value="Documentary">Documentary</option>
          <option value="History">History</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Action">Action</option>
        </select>
      </div>
    </div>
  );
}
