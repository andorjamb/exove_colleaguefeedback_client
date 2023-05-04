import React from "react";
import {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
} from "../../features/requestPicksApi";

//Styling
import styles from "./Profile.module.css";

/** this component currently used for testing purposes only  */

const Profile = () => {
  const { data, isFetching, error } = useGetAllRequestPicksQuery();

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {data ? (
          <>{data}</>
        ) : (
          <>
            <p>Fetching</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
