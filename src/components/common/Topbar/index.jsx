import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/logo.png";
import logonav from '../../../assets/logonav.png';
import userpic from '../../../assets/userpic.png';
import { TiHome } from "react-icons/ti";
import { FaRegUser,FaSearch } from "react-icons/fa";
// import { TbShirtSport } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import SearchUsers from "../SearchUsers"
import "./index.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <img className="logonav" src={logonav} alt="logonav" />
      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <FaSearch
            size={30}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <TiHome
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <FaRegUser
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/connections")}
          />
          <BsBriefcase size={30} className="react-icon" />
          <MdMessage size={30} className="react-icon" />
          <IoMdNotifications size={30} className="react-icon" />
        </div>
      )}
      <img
        className="userpic"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
