import CustomSpinner from "../CustomSpinner/CustomSpinner";
import styles from "./Submitted.module.css";

const Submitted = () => {
  return (
    <div>
      <CustomSpinner />
      <h2>Thank you!</h2>
      <p>Please don't close the page, your picks are being submitted...</p>
    </div>
  );
};

export default Submitted;
