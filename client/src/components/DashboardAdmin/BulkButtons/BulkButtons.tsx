import axios from "axios";

import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

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
      <Tooltip
        TransitionComponent={Fade}
        title="Request colleague picks from all users"
        placement="bottom-start"
      >
        <button
          onClick={() => {
            postPick(newPick1);
            postPick(newPick2);
          }}
          className={styles.request}
        >
          <span className="material-symbols-outlined">group_add</span>Request
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Remind all users to pick colleagues"
        placement="bottom-start"
      >
        <button className={styles.remind}>
          <span className="material-symbols-outlined">group_add</span>
          <span className="material-symbols-outlined">timer</span>
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Request feedbacks from all users"
        placement="bottom-start"
      >
        <button className={styles.request}>
          <span className="material-symbols-outlined">rate_review</span>Request
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Remind all users to give feedbacks"
        placement="bottom-start"
      >
        <button className={styles.remind}>
          <span className="material-symbols-outlined">rate_review</span>
          <span className="material-symbols-outlined">timer</span>
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Generate all reports (including incomplete) and make them available to competence managers"
        placement="bottom-start"
      >
        <button className={styles.warning}>
          <span className="material-symbols-outlined">description</span>{" "}
          Generate all
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Generate all complete reports and make them available to competence managers"
        placement="bottom-start"
      >
        <button className={styles.approve}>
          <span className="material-symbols-outlined">description</span>
          Generate complete
        </button>
      </Tooltip>
    </div>
  );
};

export default BulkButtons;
