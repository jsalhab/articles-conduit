import React from "react";
import { connect } from "react-redux";
import { applyTagFilter } from "../../redux/actions";
const Tags = props => {
  const tags = props.tags;

  const handleClick = (event, tag) => {
    event.preventDefault();
    props.applyTagFilter(tag);
  };
  if (tags) {
    return (
      <div className="tag-list">
        {tags.map(tag => {
          return (
            <a
              href=""
              className="tag-default tag-pill"
              key={tag}
              onClick={event => handleClick(event, tag)}
            >
              {tag}
            </a>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading Tags...</div>;
  }
};

export default connect(
  null,
  { applyTagFilter }
)(Tags);
