import { useState } from "react";
import styles from "./name.module.css";

const Name = ({ btnClick }) => {
  const [name, setName] = useState("");
  const [empty, setEmpty] = useState("");
  const handleSubmit = () => {
    setName("");
    if (name === "") {
      setEmpty("cannot be empty");
    } else {
      btnClick(name);
    }
  };

  return (
    <div className={styles.main}>
      <h2>Enter a name</h2>
      <input type="text" placeholder="nickname" onChange={(e) => setName(e.target.value)} value={name} />
      <button onClick={handleSubmit}>submit</button>
      <h3 className={styles.empty}>{empty}</h3>
    </div>
  );
};

export default Name;
