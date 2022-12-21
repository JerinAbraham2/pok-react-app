import React from "react";
import Button from "../Button";
import Input from "../Input";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <main className={styles.main}>
      <h1>How many players</h1>
      <Input />
      <Button />
    </main>
  );
};

export default Main;
