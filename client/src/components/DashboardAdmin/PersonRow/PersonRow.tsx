// Styles
import { IRequestPicks } from "../../../types/picks";
import styles from "./PersonRow.module.css";

interface IPersonRowProps {
  userPicks: IRequestPicks;
}

const PersonRow: React.FC<IPersonRowProps> = ({ userPicks }) => {
  return (
    <tr className={styles.table_row}>
      <td>
        <span className="material-symbols-outlined">chevron_right</span>
        {userPicks._id}
      </td>
      <td>
        {
          userPicks.selectedList.filter(
            (pick) => pick.selectedRole === "colleague"
          ).length
        }
      </td>
      <td>
        {
          userPicks.selectedList.filter(
            (pick) => pick.selectedRole === "subordinate"
          ).length
        }
      </td>
      <td>
        {
          userPicks.selectedList.filter((pick) => pick.selectedRole === "pm")
            .length
        }
      </td>
      <td>
        {
          userPicks.selectedList.filter((pick) => pick.selectedRole === "cm")
            .length
        }
      </td>
    </tr>
  );
};

export default PersonRow;
