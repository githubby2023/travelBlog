import React from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
const SearchBar = () => {
  return (
    <>
      <div className="container" lg="12">
        <div className="row">
          <div className="search-bar-container mx-auto col-xs-4">
            <div className="search-bar-row">
              <InputGroup className="search-bar">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Search"/>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="search-bar">
                        <form className="form-inline">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> */}
    </>
  );
};

export default SearchBar;
