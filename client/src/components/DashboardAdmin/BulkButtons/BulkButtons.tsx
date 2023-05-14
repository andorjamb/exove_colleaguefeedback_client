import axios from "axios";

import styles from "./BulkButtons.module.css";

const BulkButtons = () => {
  const newPick1 = {
    requestedTo: "tempt",
  };

  const newPick2 = {
    requestedTo: "newton",
  };

  const postPick = async (newPick: { requestedTo: string }) => {
    try {
      const { data } = await axios.post(
        "https://exove.vercel.app/api/picks",
        { ...newPick },
        {
          withCredentials: true,
        }
      );
      console.log("Response", data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.buttons_container}>
      <button
        onClick={() => {
          postPick(newPick1);
          postPick(newPick2);
        }}
        className={styles.request}
      >
        <span className="material-symbols-outlined">group_add</span>Request
      </button>
      <button className={styles.remind}>
        <span className="material-symbols-outlined">group_add</span>
        <span className="material-symbols-outlined">timer</span>
      </button>
      <button className={styles.request}>
        <span className="material-symbols-outlined">rate_review</span>Request
      </button>
      <button className={styles.remind}>
        <span className="material-symbols-outlined">rate_review</span>{" "}
        <span className="material-symbols-outlined">timer</span>
      </button>
      <button className={styles.warning}>
        <span className="material-symbols-outlined">description</span> Generate
        all
      </button>
      <button className={styles.approve}>
        {" "}
        <span className="material-symbols-outlined">description</span> Generate
        complete
      </button>
    </div>
  );
};

export default BulkButtons;
