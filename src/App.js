import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UpperHeader from "./Components/UpperHeader";
import Login from "./pages/Login";
import loadingGif from "../src/images/Loading_icon.gif";
const Error = React.lazy(() => import("./pages/Error"));
const FeedbackL1AndL2 = React.lazy(() => import("./pages/FeedbackL1AndL2"));
const ReportL1AndL2 = React.lazy(() => import("./pages/ReportL1AndL2"));
const IndentL3 = React.lazy(() => import("./pages/IndentL3"));
const FavoriteL3 = React.lazy(() => import("./pages/FavoriteL3"));
const ReportL3 = React.lazy(() => import("./pages/ReportL3"));
const DayEndReportAdmin = React.lazy(() => import("./pages/DayEndReportAdmin"));
const SendStoreReportAdmin = React.lazy(() =>
  import("./pages/SendStoreReportAdmin")
);
const AdminHome = React.lazy(() => import("./pages/AdminHome"));
const PortalCloseReport = React.lazy(() => import("./pages/PortalCloseReport"));
const FeedbackL1AndL2ForPhysical = React.lazy(() =>
  import("./pages/FeedbackL1AndL2ForPhysical")
);
function App() {
  return (
    <>
      <BrowserRouter basename="/DNpimPortal">
        <Suspense
          fallback={
            <>
              <UpperHeader />
              <div className="text-center">
                <img src={loadingGif} alt="" />
              </div>
            </>
          }
        >
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/feedbackL1andL2/:storeCode/:rsoName/"
              component={FeedbackL1AndL2}
            />
            <Route
              exact
              path="/FeedbackL1AndL2ForPhysical/:storeCode/:rsoName/"
              component={FeedbackL1AndL2ForPhysical}
            />

            <Route
              exact
              path="/reportL1andL2/:storeCode/:rsoName/"
              component={ReportL1AndL2}
            />
            <Route
              exact
              path="/favoriteL3/:storeCode/:rsoName/"
              component={FavoriteL3}
            />
            <Route
              exact
              path="/indentL3/:storeCode/:rsoName/"
              component={IndentL3}
            />
            <Route
              exact
              path="/reportL3/:storeCode/:rsoName/"
              component={ReportL3}
            />
            <Route
              exact
              path="/dayEndReportForAdmin/:storeCode/:rsoName/"
              component={DayEndReportAdmin}
            />
            <Route
              exact
              path="/SendStoreReportAdmin/:storeCode/:rsoName/"
              component={SendStoreReportAdmin}
            />
            <Route
              exact
              path="/AdminHome/:storeCode/:rsoName/"
              component={AdminHome}
            />
            <Route
              exact
              path="/PortalCloseReport/:storeCode/:rsoName/:level/"
              component={PortalCloseReport}
            />
            <Route exact path="/error" component={Error} />
            <Route component={Error} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
