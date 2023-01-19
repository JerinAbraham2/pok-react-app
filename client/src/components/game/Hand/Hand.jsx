import styles from "./hand.module.css";

const Hand = ({player}) => {
    return (
        <div className={styles.main}>
            <h2>Name: {player.name}</h2>
            <div className={styles.hand}>
                <h3>Hand:</h3>
                <h4>{player.hand[0].number + " of " + player.hand[0].suite}</h4>
                <h4>and</h4>
                <h4>{player.hand[1].number + " of " + player.hand[1].suite}</h4>
            </div>
            <h3>Money: {player.money}$</h3>
        </div>
    );
};

export default Hand;