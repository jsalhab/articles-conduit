import React from "react";
import { getFeed } from "../../redux/actions/index";
import { connect } from "react-redux";

const UserFeedTab = props => {
  const onclickTab = event => {
    event.preventDefault();
    props.getFeed();
  };

  return (
    <li className="nav-item">
      <a
        href=""
        className={props.tab === "feed" ? "nav-link active" : "nav-link"}
        onClick={onclickTab}
      >
        Your Feed
      </a>
    </li>
  );
  return null;
};

export default connect(
  null,
  { getFeed }
)(UserFeedTab);
