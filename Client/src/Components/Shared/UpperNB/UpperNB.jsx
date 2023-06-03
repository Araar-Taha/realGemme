/* eslint-disable jsx-a11y/alt-text */

import logo from "../../../assets/icons/logo.png";
import ghosts from "../../../assets/icons/ghosts.svg";
import notif from "../../../assets/icons/notification.svg";
import upperChat from "../../../assets/icons/upperChat.svg";
import nb from "./UpperNB.module.css";
import { useContext, useRef, useState, useEffect } from "react";
import { AppPageContext } from "./../../../App";
import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/toast";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

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

const GET_ALL_GROUPS = gql`
  query Groups {
    groups {
      name
      id
    }
  }
`;

const JOIN_GROUP = gql`
  mutation JoinGroup($groupId: ID!) {
    joinGroup(groupId: $groupId) {
      name
    }
  }
`;

function UpperNB() {
  const [inputt, setInput] = useState("");
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const searchInputRef = useRef(null);
  const groupsDisplayRef = useRef(null);
  const toast = useToast();
  const [joinGroup] = useMutation(JOIN_GROUP, {
    onCompleted: () => {
      toast({
        title: `Groupe joined !`,
        position: "top",
        isClosable: true,
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: `You already joined this group`,
        position: "top",
        isClosable: true,
        status: "error",
      });
    },
  });


  const { loading: userGroupsLoading, error: userGroupsError, data: userGroupsData } = useQuery(GET_USER_GROUPS, {
    context: {
      headers: {
        authorization: `Bearer ${Cookies.get("Token")}`,
      },
    },
  });

  const {
    loading: allGroupsLoading,
    error: allGroupsError,
    data: allGroupsData,
  } = useQuery(GET_ALL_GROUPS);

  useEffect(() => {
    if (!allGroupsLoading && !allGroupsError) {
      setData1({ groups: allGroupsData.groups });
      setData2({ groups: allGroupsData.groups });
    }
  }, [allGroupsLoading, allGroupsError, allGroupsData]);

  useEffect(() => {
    if (!userGroupsLoading && !userGroupsError) {
      setData3(userGroupsData.allusers.groups);
    }
  }, [userGroupsLoading, userGroupsError, userGroupsData]);
  
  const {
    cardVisible1,
    cardVisible2,
    cardVisible3,
    setCardVisible1,
    setCardVisible2,
    setCardVisible3,
  } = useContext(AppPageContext);

  const [isFocused, setIsFocused] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState(null);

  

  const handleDivClick = () => {
    searchInputRef.current.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    const timeout = setTimeout(() => {
      setIsFocused(false);
    }, 200); // Adjust the delay as needed (in milliseconds)
    setBlurTimeout(timeout);
  };

  const filtering = (event) => {
    const inputValue = event.target.value.toUpperCase();
    setInput(inputValue);

    const filteredData = data1.groups.filter((group) => {
      const namee = group.name.toUpperCase();
      return namee.startsWith(inputValue);
    });

    setData2({ groups: filteredData });
  };

  useEffect(() => {
    return () => {
      // Clear the timeout if the component unmounts or before the next blur
      if (blurTimeout) {
        clearTimeout(blurTimeout);
      }
    };
  }, [blurTimeout]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        groupsDisplayRef.current &&
        !groupsDisplayRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={nb.UpperNB}>
      <img src={logo} alt="logo" id={nb.logo}></img>
      <div className={nb.searcchContainer}>
        <input
          id={nb.search}
          placeholder="Search"
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={searchInputRef}
          onChange={filtering}
          value={inputt}
        ></input>
        
        {isFocused   && (
          <div
            className={nb.groupsDisplay}
            ref={groupsDisplayRef}
            onClick={handleDivClick}
          >
            {!data1 ?  <div className={nb.loaderContainer}><BeatLoader color="#d63636" className={nb.loader} size={25}/></div> : data2.groups.map((group) => (
              <div
                className={nb.group}
                key={group.id}
                onClick={handleDivClick}
              >
                <h3>{group.name}</h3>

                {data3.some((item) => item.id.includes(group.id)) ? (
                  <button
                    onClick={()=>{joinGroup({
                      variables: { groupId: group.id },
                      context: {
                        headers: {
                          authorization: `Bearer ${Cookies.get("Token")}`,
                        },
                      },
                    })}}
                    className={nb.followed}
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={()=>{joinGroup({
                      variables: { groupId: group.id },
                      context: {
                        headers: {
                          authorization: `Bearer ${Cookies.get("Token")}`,
                        },
                      },
                    })}}
                    className={nb.notFollowed}
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={nb.UpperNBIcons}>
        <img
          src={notif}
          className={nb.icon}
          onClick={() => {
            if (cardVisible3 || cardVisible2) {
              setCardVisible3(false);
              setCardVisible2(false);
            }
            setCardVisible1(!cardVisible1);
          }}
        ></img>
        <img
          src={ghosts}
          className={nb.icon}
          onClick={() => {
            if (cardVisible1 || cardVisible3) {
              setCardVisible1(false);
              setCardVisible3(false);
            }
            setCardVisible2(!cardVisible2);
          }}
        ></img>
        <img
          src={upperChat}
          className={nb.icon}
          alt=""
          onClick={() => {
            if (cardVisible1 || cardVisible2) {
              setCardVisible1(false);
              setCardVisible2(false);
            }
            setCardVisible3(!cardVisible3);
          }}
        />
        <Link to="/Profile">
          <img
            src="https://www.residencescogir.com/DATA/NOUVELLE/79~v~comment-creer-un-profil-facebook-.jpg"
            className={nb.Myprofilepic}
          ></img>
        </Link>
      </div>
    </div>
  );
}

export default UpperNB;
