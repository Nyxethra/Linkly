import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import GroupsScreen from "./screens/GroupsScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import ReportScreen from "./screens/ReportScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listGroups } from "./Redux/Actions/GroupActions";
import { listReports } from "./Redux/Actions/ReportActions";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listGroups());
      dispatch(listReports());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/groups" component={GroupsScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/reports" component={ReportScreen} />
          <PrivateRouter path="/report/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
