import styles from "./waitingRoom.module.css";

const WaitingRoom = ({name, id}) => {
  return (
    <div className={styles.main}>
      <h1>WaitingRoom</h1>
      <h2>hi, {name}</h2>
      <h3>your id is {id}</h3>
      <div className={styles.players}>
        <div className={styles.player}></div>
      </div>
    </div>
  );
};

export default WaitingRoom;
