import side from "./sidebar.module.css";

import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

const Communities = () => {
  const GET_USER_GROUPS = gql`
    query Allusers {
      allusers {
        groups {
          name
          id
          createdDate
        }
      }
    }
  `;
  const {
    loading: userGroupsLoading,
    error: userGroupsError,
    data: userGroupsData,
  } = useQuery(GET_USER_GROUPS, {
    context: {
      headers: {
        authorization: `Bearer ${Cookies.get("Token")}`,
      },
    },
  });

  const [data3, setData3] = useState(null);

  useEffect(() => {
    if (!userGroupsLoading && !userGroupsError) {
      setData3(userGroupsData.allusers.groups);
    }
  }, [userGroupsLoading, userGroupsError, userGroupsData]);

  return (
    <div className={side.communities}>
      {!data3 ? (
        <div className={side.loaderContainer}>
          <BeatLoader color="#d63636" size={25} />
        </div>
      ) : (
        <div className={side.followed}>
          {data3.map((item) => (
            <div className={side.community} key={item.id}>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Communities;
