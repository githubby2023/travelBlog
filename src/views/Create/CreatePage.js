import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import React from "react";

import "components/Create/Create.scss";

const CreatePage = () => {
  return (
    <>
      <ExamplesNavbar isTransparent={false} />
      <div className="filler" />
      <div className="section">
        <div className="container" lg="12">
          <div className="row">
            <div className="col-md-9 mx-auto">
              <h1>Create Post</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
