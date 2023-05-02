import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React from "react";
import { GrFormAdd } from "react-icons/gr";

import "components/Create/Create.scss";

const CreatePage = () => {
  return (
    <>
      <ExamplesNavbar isTransparent={false} />
      <div className="filler" />
      <div className="section">
        <div className="container" lg="12">
          <div className="row">
            <div className="create-post-container col-md-9 mx-auto">
              <h1>Create Post</h1>
              <div className="add-image">
                <GrFormAdd className="add-icon" />
                <h4 className="create-text">Add Image</h4>
              </div>
              <label className="label-text">
                <h4>Write your content here. Remember to put some emoji!</h4>
                <textarea
                  className="input-text"
                  placeholder="Default"
                  type="textarea"
                />
              </label>
              <button className="submit-button" type="submit">
                <h6>Post</h6>
              </button>
            </div>
            <div className="tag-container col-md-3">
              <label className="label-text">
                <h6>Add tag</h6>
                <input
                  className="input-text"
                  placeholder="Default"
                  type="text"
                />
              </label>
              <div className="selected-container">
                <label className="tag">Primary</label>
                <label className="tag">Primary</label>
              </div>
              <div className="divider" />
              <div className="unselected-container">
                <label className="tag">Primary</label>
                <label className="tag">Primary</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
