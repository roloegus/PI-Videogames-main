import React from "react";
import "../Catalogo/Catalogo.css";
import styles from "./Paginate.module.css";

export default function Paginate({
  charactersPerPage,
  allCharacters,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={styles.pagination}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <a className={styles.number} onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))}
      </div>
    </nav>
  );
}
