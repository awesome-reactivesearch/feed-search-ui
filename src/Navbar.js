import React from "react";
import { BiLinkExternal } from "react-icons/bi";

import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={"bg-white fw-bold navbar p-3 text-light shadow"}>
      <div className="text-black me-2">Reactivesearch</div>
      <span className={`text-white ${styles.headingTag}`}>Feed Search</span>
      <a href="https://blog.reactivesearch.io/discover-personalized-search-tailor-made-experiences-with-reactivesearch-and-elasticsearch">
        How this is built
        <BiLinkExternal />
      </a>
    </nav>
  );
}
