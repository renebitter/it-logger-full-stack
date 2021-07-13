import { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs } from "../../actions/logActions";
import { getLogs } from "../../actions/logActions";

const SearchBar = ({ searchLogs, getLogs }) => {
  const text = useRef("");

  const onChange = () => {
    if (text.current.value === "") {
      getLogs();
    } else {
      searchLogs(text.current.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const clearInput = () => {
    text.current.value = "";
    onChange();
  };

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form onSubmit={onSubmit}>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search here..."
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons" onClick={clearInput}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
  getLogs: PropTypes.func.isRequired,
};

export default connect(null, { searchLogs, getLogs })(SearchBar);
