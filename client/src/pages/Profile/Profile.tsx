import React, { useEffect } from "react";
import {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
} from "../../features/requestPicksApi";
import { useGetAllUsersQuery } from "../../features/userApi";

//Styling
import styles from "./Profile.module.css";

/** this component currently used for testing purposes only  */

const Profile = () => {
  const { data, isFetching, error } = useGetAllRequestPicksQuery();

  useEffect(() => {
    console.log("data:", "");
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {data ? <>{data}</> : { isFetching } ? <p>Fetching</p> : <></>}
      </div>
    </div>
  );
};

export default Profile;
