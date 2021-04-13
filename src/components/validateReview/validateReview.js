import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { stripTags } from "../../utils/validationUtils";
import { BasePath, ValidateReview } from "../../globals/serviceURLs";
import { authPost } from "../../api/api";
import "./validateReview.css";

function ValidateReviews({ page }) {
  const token = localStorage.AccessToken;
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const validateReview = () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);
    // setDescription(newInput);
    const config = {
      rev: stripTags(document.getElementById("text").innerHTML),
      nme: "abcdef",
    };

    authPost(BasePath, ValidateReview, config, token)
      .then((res) => {
        document.getElementById("text").innerText = "";
        const str = res.reviewedString;
        const arr = res.err;

        const edit = document.createElement("div");
        if (arr.length > 0) {
          edit.innerHTML =
            "<div>" +
            str.substr(0, arr[0].startIndex) +
            arr
              .map((i, index) => {
                if (arr[index + 1]) {
                  return (
                    " <span class='bld'>" +
                    str.substr(i.startIndex, i.endIndex - i.startIndex + 1) +
                    "</span>" +
                    str.substr(
                      i.endIndex + 1,
                      arr[index + 1].startIndex - i.endIndex - 1
                    )
                  );
                } else
                  return (
                    " <span class='bld'>" +
                    str.substr(i.startIndex, i.endIndex - i.startIndex + 1) +
                    "</span>"
                  );
              })
              .join(" ") +
            str.substr(arr[arr.length - 1].endIndex + 1, str.length) +
            "</div>";
          setError(
            "We promote gender neutrality, please consider rephrasing the job description"
          );
          setSuccessMessage("");
        } else {
          edit.innerHTML = "<div>" + str + "</div";
          //setIsValid(true);
          setError("");
          setSuccessMessage("The description looks gender neutral");
        }
        document.getElementById("text").append(edit);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.err);
      });
  };

  return (
    <>
      <div className="reviews">
        <div id="text" contentEditable className="text-area"></div>
      </div>
      <div className="button-box">
        {page == "jobForm" ? (
          <p onClick={validateReview}>Check Gender Neutrality</p>
        ) : (
          <button
            className="btn btn-primary submit-button"
            onClick={validateReview}
          >
            Validate Review
          </button>
        )}
      </div>
      <div className="feedback-error">
        <span className="error-text">{error}</span>
        <span className="error-text green">{successMessage}</span>
      </div>
    </>
  );
}

export default ValidateReviews;
