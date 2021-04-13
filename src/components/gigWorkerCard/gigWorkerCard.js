import React, { useEffect, useState } from "react";
import bookmarkIcon from "../../assets/bookmark (1).png";
import filledbookmark from "../../assets/bookmarks.png";
import select from "../../assets/gigselect.png";
import noShortlistIcon from "../../assets/shortlisted.png";
import MarkNotHiredIcon from "../../assets/marknothired.svg";
import Relocation from "../../assets/relocation (2).png";
import location from "../../assets/location.png";
import Modal from "react-bootstrap/Modal";
import SendRrquestIcon from "../../assets/send-request.svg";
import CartIcon from "../../assets/cart (1).png";
import RateIcon from "../../assets/rate.svg";
import RemoveCartIcon from "../../assets/remove-cart.svg";
import StarRating from "../Ratingstar/ratingStar";
import "./gigWorkerCard.css";
import { put, authPost } from "../../api/api";
import {
  BasePath,
  AddToCart,
  BookmarkGigWorker,
  ShortlistGigWorker,
  MarkGigWorkerNotHired,
} from "../../globals/serviceURLs";
import {
  jobLevel,
  GigWorkerJobStatus,
  UserType,
} from "../../globals/applicationConstants";
import { getDaysFromToday } from "../../utils/validationUtils";
import { useQuery } from "../../globals/useQuery";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addFromPage } from "../../redux/actions/uiActions";

// const todayDate = new Date().toISOString().split("T")[0];
// let dayMS = 86400000 * 30 * 6;
// const minDateMS = Date.parse(todayDate) + dayMS;
// const minDate = new Date(minDateMS).toISOString().split("T")[0];
// dayMS = 86400000 * 30 * 12;
// const maxDateMS = Date.parse(todayDate) + dayMS;
// const maxDate = new Date(maxDateMS).toISOString().split("T")[0];

function Workercard({
  data,
  addFromPage,
  currency,
  removeCard,
  jobId,
  userType,
}) {
  const {
    bm,
    comm,
    comp,
    gwid,
    rel,
    otace,
    co,
    sl,
    nme,
    eml,
    jsts,
    lvl,
    tech,
    crt,
    minrph,
    maxrph,
    rtd,
    sd,
  } = data;

  const [bookmark, setBookmark] = useState(false);
  const [shortlisted, setShortlisted] = useState(false);
  const [Relocation, setRelocationRequired] = useState(true);
  const [addCart, setAddCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statusDisplay, setStatusDisplay] = useState();
  const history = useHistory();

  const params = useQuery();
  const jid = parseInt(params.get("jid"));
  const token = localStorage.AccessToken;
  const cmid = parseInt(localStorage.userId);
  const startDateDaysFromToday = getDaysFromToday(sd);
  const endDateDaysFromToday = getDaysFromToday(sd);

  useEffect(() => {
    setBookmark(bm);
    setRelocationRequired(rel);
    setShortlisted(sl);
    setAddCart(crt);

    Object.entries(GigWorkerJobStatus).map((i) => {
      if (i[1].sts === jsts) {
        setStatusDisplay(i[1].name);
      }
    });
  }, []);
  function toggleBookmark(e) {
    e.stopPropagation();
    const toBookmark = !bookmark;

    const config = {
      gwid: gwid,
      cmid: cmid,
      bmk: toBookmark,
    };

    put(BasePath, BookmarkGigWorker, config, token)
      .then((res) => {
        setBookmark(toBookmark);
        if (!toBookmark) {
          if (removeCard) {
            removeCard(data);
          }
        }
      })
      .catch((err) => {
        alert(err.err);
      });
  }

  const initialsDisp = () => {
    if (nme) {
      const initials = nme.split(" ");
      return (
        initials[0][0].toUpperCase() +
        initials[initials.length - 1][0].toUpperCase()
      );
    } else if (eml) {
      const initials = eml[0];
      return initials.toUpperCase();
    } else return "";
  };

  const addToCart = (e) => {
    e.stopPropagation();
    const config = {
      gwid: gwid,
      cmid: cmid,
      jid: jid || jobId,
      add: !addCart,
    };

    authPost(BasePath, AddToCart, config, token)
      .then((res) => {
        if (removeCard) {
          removeCard(data);
        } else {
          setAddCart(!addCart);
        }
      })
      .catch((err) => {
        alert(err.err);
      });
  };

  function createJob(e) {
    e.stopPropagation();
    setShowModal(false);
    addFromPage("search");
    history.push("/job-builder-industry?prefill=true");
  }

  function dailogeDisp() {
    return (
      <div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>Attention !</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="preview-dailog">
              <p>Create a job to shortlist the gig worker</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary modal-button"
              onClick={createJob}
            >
              Create job
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  const rateClick = (e) => {
    e.stopPropagation();
    history.push(`/feedback?jid=${jid || jobId}&gwid=${gwid}&name=${nme}`);
  };

  const shortlistClick = (e) => {
    e.stopPropagation();
    const toShortlist = !shortlisted;
    if (jid > 0) {
      setShowModal(false);
      const config = {
        cmid: cmid,
        gwid: gwid,
        jid: jid,
        sl: toShortlist,
      };

      put(BasePath, ShortlistGigWorker, config, token)
        .then((res) => {
          if (!toShortlist && removeCard) {
            removeCard(data);
          }
          setShortlisted(toShortlist);
        })
        .catch((err) => {
          alert(err.err);
        });
    } else setShowModal(true);
  };

  const markNotHired = (e) => {
    e.stopPropagation();
    const config = {
      cmid: cmid,
      gwid: gwid,
      jid: jid || jobId,
    };

    authPost(BasePath, MarkGigWorkerNotHired, config, token)
      .then((res) => {
        jsts = GigWorkerJobStatus.NotHired.sts;
        crt = false;
      })
      .catch((err) => {
        alert(err.err);
      });
  };

  function actions() {
    switch (jsts) {
      case GigWorkerJobStatus.AcceptedRequest.sts:
        return [
          {
            src: MarkNotHiredIcon,
            onClick: markNotHired,
            alt: "mark not hired",
            className: null,
          },
          {
            src: addCart ? RemoveCartIcon : CartIcon,
            onClick: addToCart,
            alt: "add to cart",
            className: null,
          },
        ];

      case GigWorkerJobStatus.JobCompleted.sts:
        return rtd
          ? []
          : [
              {
                src: RateIcon,
                onClick: rateClick,
                alt: "rate",
                className: null,
              },
            ];

      default:
        return [];
    }
  }

  return (
    <div
      className="worker-card"
      onClick={() => {
        history.push(
          userType === UserType.customerManager
            ? "/gig-worker-details?&gwid=" + gwid + "&jid=" + (jid || jobId)
            : "/partner/admin/gig-worker-details?" + "gwid=" + gwid
        );
      }}
    >
      {dailogeDisp()}
      <div className="card-head">
        <div className="head-icon">
          <p>{initialsDisp()}</p>
        </div>
        <div className="id-no">
          <p>ID: {gwid} </p>
          <p>{Object.keys(jobLevel).find((i) => jobLevel[i] === lvl)}</p>
          <p className="status-display">{statusDisplay}</p>
        </div>
        <div className="cardHead-img">
          {userType === UserType.customerManager &&
            actions().map((i, index) => (
              <img
                src={i.src}
                alt={i.alt}
                className={i.className}
                onClick={i.onClick}
                key={index}
              />
            ))}
          {userType === UserType.customerManager &&
            !crt &&
            (jsts === null || jsts === undefined) && (
              <>
                <img
                  src={bookmark ? filledbookmark : bookmarkIcon}
                  onClick={toggleBookmark}
                  alt="bookmark"
                  className="bookmarked"
                />
                <img
                  src={shortlisted ? noShortlistIcon : select}
                  onClick={shortlistClick}
                  alt="shortlist"
                />
              </>
            )}
        </div>
      </div>
      <div className="component-card">
        {/*todo stars should be in green color, define a green color variable in main index.css and use everywhere for green. refer mblue */}
        {otace && otace > 0 && comm && comm > 0 && comp && comp > 0 ? (
          <div className="c-tags-rate">
            <div className="star1">
              <StarRating rating={comp} />
              <p>Competency</p>
            </div>
            <div className="star1">
              <StarRating rating={otace} />
              <p>OTACE</p>
            </div>
            <div className="star1">
              <StarRating rating={comm} />
              <p>Communication</p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="c-tags-tech">
          {tech.map((i, index) => (
            <div className="c-tags">
              <p>{i}</p>
            </div>
          ))}
        </div>
        {minrph &&
          minrph[currency] > 0 &&
          endDateDaysFromToday > 0 &&
          startDateDaysFromToday <= 1 && (
            <div>
              <hr className="no-padding no-margin" />
            </div>
          )}
        <div className="available_rate">
          {(endDateDaysFromToday > 0 &&
            ((startDateDaysFromToday <= 1 && (
              <p style={{ color: "green" }}>Available Now</p>
            )) ||
              (startDateDaysFromToday <= 30 && (
                <p style={{ color: "green" }}>
                  Available in {startDateDaysFromToday} days
                </p>
              )) || <p style={{ color: "green" }}>Available from {sd}</p>)) || (
            <p></p>
          )}

          {minrph &&
            minrph[currency] > 0 &&
            (minrph[currency] !== maxrph[currency] && maxrph[currency] ? (
              <p className="rates">
                Rate per hour :{" "}
                {minrph[currency] + " - " + maxrph[currency] + " " + currency}
              </p>
            ) : (
              <p>{minrph[currency] + " " + currency}</p>
            ))}
        </div>
      </div>
      {/*<div className="card-footer">
        <img src={Relocation} alt="icon" />
        {Rel ? <p>Yes</p> : <p>No</p>}
        <div className="card-footer-right">
          <img src={location} alt="icon" />
          <p>{co}</p>
        </div>
          </div>*/}
    </div>
  );
}

const mapActionToProps = {
  addFromPage,
};
export default connect(null, mapActionToProps)(Workercard);

//todo verify below - icons on card depending on status:
/*
    null : bookmark and send request
    SentRequest : no action possible show status on card
    AcceptedRequest : if (not added to cart, show Mark not hired and add to cart with status) else ( show status as added to cart, also show the single rate per hour received from service, no action possible )
    CWRejectedRequest : Show status, no action possible
    PARejectedRequest : Show status, no action possible
    NotHired(71) : Show status, no action possible
    Offered(81) : Show status, no action possible
    AcceptedOffer(91) : Show status, no action possible
    CWRejectedOffer(101) : Show status, no action possible
    PARejectedOffer(111) : Show status, no action possible
    Ongoing(121) : Show status, no action possible
    JobCompleted(131) : Show status, show star icon for rating

    please note, in other cases the icons/buttons are not shown, eg: book mark is shown only when status = null and not in other cases
*/
