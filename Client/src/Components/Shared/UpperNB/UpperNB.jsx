/* eslint-disable jsx-a11y/alt-text */

import logo from "../../../assets/icons/logo.png";
import ghosts from "../../../assets/icons/ghosts.svg";
import notif from "../../../assets/icons/notification.svg";
import upperChat from "../../../assets/icons/upperChat.svg";
import nb from "./UpperNB.module.css";
import { useContext, useRef, useState, useEffect } from "react";
import { AppPageContext } from "./../../../App";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

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


function UpperNB() {

  const [inputt, setInput] = useState("");
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const searchInputRef = useRef(null);
  const groupsDisplayRef = useRef(null);


  const { loading: userGroupsLoading, error: userGroupsError, data: userGroupsData } = useQuery(GET_USER_GROUPS);


  const { loading: allGroupsLoading, error: allGroupsError, data: allGroupsData } = useQuery(GET_ALL_GROUPS);

  useEffect(() => {
    if (!allGroupsLoading && !allGroupsError) {
      setData2({ groups: allGroupsData.groups });
    }
  }, [allGroupsLoading, allGroupsError, allGroupsData]);



  
  useEffect(() => {
    if (!userGroupsLoading && !userGroupsError) {
      setData3( userGroupsData );
    }
  }, [userGroupsLoading, userGroupsError, userGroupsData]);
  

  console.log(data3);
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

  const dataa = {
    groups: [
      { name: "rouge", id: "76786387" },
      { name: "matouk", id: "0128009" },
      { name: "matouk", id: "012222228009" },
      { name: "matYUK", id: "012852009" },
      { name: "matofk", id: "01280063639" },
      { name: "matofk", id: "0173428009" },
      { name: "matodk", id: "018328009" },
      { name: "matofk", id: "0128912083009" },
      { name: "matoqk", id: "012801823009" },
      { name: "matouk", id: "0120917838009" },
      { name: "job", id: "01873" },
      { name: "job", id: "0122873" },
      { name: "job", id: "0133873" },
      { name: "job", id: "041873" },
      { name: "job", id: "051873" },
      { name: "job", id: "061873" },
      { name: "job", id: "071873" },
      { name: "job", id: "018873" },
      { name: "job", id: "013873" },
      { name: "job", id: "01888873" },
      { name: "job", id: "0187343" },
      { name: "job", id: "01877773" },
      { name: "job", id: "01878883" },
      { name: "job", id: "01871233" },
      { name: "job", id: "018788883" },
      { name: "job", id: "0187513" },
      { name: "job", id: "018124573" },
      { name: "job", id: "018715123" },
      { name: "job", id: "0181231573" },
      { name: "job", id: "018521512573" },
      { name: "job", id: "15201873" },
      { name: "job", id: "0123351873" },
      { name: "wael", id: "01661232120101" },
    ],
  };



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

  const sayhi = () => {
    console.log("oi");
  };

  const filtering = (event) => {
    const inputValue = event.target.value.toUpperCase();
    setInput(inputValue);

    const filteredData = data.groups.filter((group) => {
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
      if (groupsDisplayRef.current && !groupsDisplayRef.current.contains(event.target)) {
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
        {isFocused && (
          <div className={nb.groupsDisplay} ref={groupsDisplayRef} onClick={handleDivClick}>
            {data2.groups.map((group) => (
              <div
                className={nb.group}
                key={group.id}
                onMouseDown={handleDivClick}
              >
                <h3>{group.name}</h3>
                <button onClick={sayhi}>Follow</button>
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
