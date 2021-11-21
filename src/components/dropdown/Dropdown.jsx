import React, { useRef } from "react";

import "./dropdown.css";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};

const LOGOUT_ITEM = {
  icon: "bx bx-log-out-circle bx-rotate-180",
  content: "Logout",
};

const Dropdown = (props) => {
  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);
  const { logout } = useAuth();

  clickOutsideRef(dropdown_content_el, dropdown_toggle_el);

  return (
    <div className="dropdown">
      <button ref={dropdown_toggle_el} className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ""}
        {props.badge ? (
          <span className="dropdown__toggle-badge">{props.badge}</span>
        ) : (
          ""
        )}
        {props.customToggle ? props.customToggle() : ""}
      </button>
      <div ref={dropdown_content_el} className="dropdown__content">
        {/* {props.contentData && props.renderItems
          ? props.contentData.map((item, index) =>
              props.renderItems(item, index)
            )
          : ""} */}
        <div onClick={logout} className="notification-item">
          <i className={LOGOUT_ITEM.icon}></i>
          <span>{LOGOUT_ITEM.content}</span>
        </div>

        {props.renderFooter ? (
          <div className="dropdown__footer">{props.renderFooter()}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  badge: PropTypes.any, // must be a string and defined
  icon: PropTypes.any, // must be a number and defined
  customToggle: PropTypes.any, // must be a string and defined
  renderFooter: PropTypes.any, // must be a string and defined
  renderItems: PropTypes.any, // must be a string and defined
  contentData: PropTypes.any, // must be a string and defined
};
export default Dropdown;
