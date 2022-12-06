import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerText}>Poker online tool</h1>
    </header>
  );
};

export default Header;
