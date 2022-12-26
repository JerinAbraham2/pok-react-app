import { useState } from "react";
import styles from "./name.module.css";
import Button from '@mui/material/Button';
import { Input } from "@mui/material";

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
      <Input sx={{ input: {color: "white"} }}  color="primary" type="text" placeholder="name" onChange={(e) => setName(e.target.value)} value={name} />
      <Button onClick={handleSubmit} variant="contained">submit</Button>
      <h3 className={styles.empty}>{empty}</h3>
    </div>
  );
};

export default Name;
