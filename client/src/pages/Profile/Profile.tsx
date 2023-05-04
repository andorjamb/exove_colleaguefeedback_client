import React, { useEffect } from "react";
import {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
} from "../../features/requestPicksApi";

//Styling
import styles from "./Profile.module.css";

/** this component currently used for testing purposes only  */

const Profile = () => {
  const { data, isLoading, error } = useGetAllRequestPicksQuery();

  useEffect(() => {
    console.log("data:", "");
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {data ? <>{data}</> : { isLoading } ? <p>Fetching</p> : <></>}
      </div>
    </div>
  );
};

export default Profile;
