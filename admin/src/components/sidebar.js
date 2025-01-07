import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/icon.png"
              style={{ height: "46" }}
              className="logo"
              alt="Admin facebook"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/reports"
              >
                <i class="icon fas fa-exclamation-triangle"></i>
                <span className="text">Reports</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text"> All Users</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/groups"
              >
                <i className="icon fa fa-users"></i>
                <span className="text">All Groups</span>
              </NavLink>
            </li>

            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addproduct"
              >
                <i class="icon fas fa-person"></i>
                <span className="text">Profile</span>
              </NavLink>
            </li> */}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
