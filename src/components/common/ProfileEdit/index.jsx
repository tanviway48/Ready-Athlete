import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from "../../../api/FirestoreAPI";
import "./index.scss";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>

      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />
        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          value={editInputs.headline}
          name="headline"
        />
        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        {/* <label>Company</label> */}
        <label>Current Position</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Current Position"
          value={editInputs.company}
          name="Company"
        />
        {/* <label>Industry</label> */}
        <label>Sports Category </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Sports Category"
          name="Industry"
          value={editInputs.industry}
        />
        {/* <label>College</label> */}
        <label>Current Sport Camp</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Current Sport Camp"
          name="college"
          value={editInputs.college}
        />
        {/* <label>Website</label> */}
        <label>News Article featuring you (Link)</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="News Article featuring you (Link)"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>
        <textarea
          placeholder="About Me"
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        {/* <label>Skills</label> */}
        <label>Acheivements/Awards</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Acheivements/Awards"
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
}
