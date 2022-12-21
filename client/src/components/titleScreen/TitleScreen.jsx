import styles from "./titleScreen.module.css"

const TitleScreen = ({btnClick}) => {
  return (
    <div className={styles.title}>
      <h1>Welcome To The Poker Project</h1>
      <button className={styles.button} onClick={btnClick}>Let's Jump right in</button>
    </div>
  );
};

export default TitleScreen;
