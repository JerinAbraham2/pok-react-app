import styles from "./waitingRoom.module.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:5000");

const WaitingRoom = ({ name }) => {
    const [ready, setReady] = useState("❌");
    const [users, setUsers] = useState([]);

    // incase we want to use this, else delete
    // useEffect(() => {
    //   socket.on("connect", () => {
    //     setUserId(socket.id);
    //   });
    // }, [socket]);

    // its rendering twice because of react strict mode
    useEffect(() => {
        socket.emit("client joined", name);
        socket.on("add client to table", (data) => {
            setUsers(data);
        });
    }, [socket]);

    return (
        <div className={styles.main}>
            <h1>WaitingRoom</h1>
            <h2>hi, {name}</h2>
            <table className={styles.table}>
                <tr>
                    <th>Name</th>
                    <th>Ready</th>
                </tr>

                {users.map((user) => (
                    <tr key="">
                        <td>{user.name}</td>
                        <td>{user.ready ? "✅" : "❌"}</td>
                    </tr>
                ))}

            </table>
            <div>
                <h3>Are you ready?</h3>
                <button onClick={() => (ready === "❌" ? setReady("✅") : setReady("❌"))}>ready</button>
            </div>
        </div>
    );
};

export default WaitingRoom;
