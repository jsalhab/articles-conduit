import React, { useState } from "react";
import ListErrors from "../auth/ListErrors";
import { connect } from "react-redux";
import {
  editArticle,
  createArticle,
  onAddTag,
  onRemoveTag
} from "../../redux/actions";

const ArticleForm = props => {
  // const initialFormData = Object.freeze({
  //   username: "",
  //   description: "",
  //   body: "",
  //   tagList: ""
  // });

  const [formData, updateFormData] = useState();
  const [tag, setTag] = useState();

  const handleChange = e => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleChangeTage = e => {
    setTag(e.target.value.trim());
  };

  const submitForm = e => {
    e.preventDefault();
    let data = { ...formData, tagList: props.tagList };
    props.onSubmit(data);
    e.target.value = "";
  };

  const watchForEnter = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      props.onAddTag(ev.target.value);
      ev.target.value = "";
    }
  };
  const removeTagHandler = tag => {
    props.onRemoveTag(tag);
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {/* <ListErrors errors={this.props.errors}></ListErrors>  */}

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="title"
                    placeholder="Article Title"
                    name="title"
                    onChange={handleChange}
                    defaultValue={props.article ? props.article.title : ""}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="description"
                    placeholder="What's this article about?"
                    onChange={handleChange}
                    defaultValue={
                      props.article ? props.article.description : ""
                    }
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    name="body"
                    placeholder="Write your article (in markdown)"
                    onChange={handleChange}
                    defaultValue={props.article ? props.article.body : ""}
                  ></textarea>
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    name="tagInput"
                    onChange={handleChangeTage}
                    onKeyUp={watchForEnter}
                  />

                  <div className="tag-list">
                    {(props.tagList ? props.tagList : []).map(tag => {
                      return (
                        <span className="tag-default tag-pill" key={tag}>
                          <i
                            className="ion-close-round"
                            onClick={() => removeTagHandler(tag)}
                          ></i>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={submitForm}
                >
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tagInput: state.articles.tagInput,
    tagList: state.articles.tagList
  };
};

export default connect(
  mapStateToProps,
  { editArticle, createArticle, onAddTag, onRemoveTag }
)(ArticleForm);
