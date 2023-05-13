//React
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Redux
import {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
} from "../../features/requestPicksApi";
import {
  useGetAllUsersQuery,
  useGetUserByLdapUidQuery,
} from "../../features/userApi";
import { useGetAllTemplatesQuery } from "../../features/templateApi";

//Styling
import styles from "./Profile.module.css";

//Components
import UserProfile from "../../components/UserProfile/UserProfile";

import EmailTest from "../../charts/emailTest";
/** this component currently used for testing purposes only  */

const Profile = () => {
  const userId = useParams();
  const { data, isFetching, error } = useGetAllRequestPicksQuery();
  const getUser = useGetUserByLdapUidQuery(userId as any);
  const user = getUser.data;

  useEffect(() => {
    console.log("data:", "");
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {/* {data ? <>{data}</> : { isFetching } ? <p>Fetching</p> : <></>} */}
        <UserProfile user={user} />
        <EmailTest />
      </div>
    </div>
  );
};

export default Profile;
