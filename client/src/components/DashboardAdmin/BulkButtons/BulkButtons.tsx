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
        Request picks from all
      </button>
      <button className={styles.remind}>Remind all to pick</button>
      <button className={styles.request}>Request all feedbacks</button>
      <button className={styles.remind}>Remind all to feedback</button>
      <button className={styles.warning}>
        Generate all reports (including incomplete)
      </button>
      <button className={styles.approve}> Generate all complete reports</button>
    </div>
  );
};

export default BulkButtons;
