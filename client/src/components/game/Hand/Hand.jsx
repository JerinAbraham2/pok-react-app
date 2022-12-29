import styles from "./hand.module.css";

const Hand = ({player}) => {
    return (
        <div>
            <h1>{player.name}</h1>
        </div>
    );
};

export default Hand;
