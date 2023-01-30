import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UpperHeader from "./Components/UpperHeader";
import Indent from "./pages/Indent";
import Login from "./pages/Login";
const Error = React.lazy(() => import("./pages/Error"));
const FeedbacL1AndL2 = React.lazy(() => import("./pages/FeedbacL1AndL2"));
const ReportL1AndL2 = React.lazy(() => import("./pages/ReportL1AndL2"));
const IndentL3 = React.lazy(() => import("./pages/IndentL3"));
const FavoriteL3 = React.lazy(() => import("./pages/FavoriteL3"));
const ReportL3 = React.lazy(() => import("./pages/ReportL3"));
const DayEndReportAdmin = React.lazy(() => import("./pages/DayEndReportAdmin"));
const SendStoreReportAdmin = React.lazy(() =>
  import("./pages/SendStoreReportAdmin")
);
const AdminHome = React.lazy(() => import("./pages/AdminHome"));
const PortelCloseReport = React.lazy(() => import("./pages/PortelCloseReport"));
const FeedbacL1AndL2ForPhysical = React.lazy(() =>
  import("./pages/FeedbacL1AndL2ForPhysical")
);
function App() {
  return (
    <>
      <BrowserRouter basename="/DNpimPortal">
        <Suspense
          fallback={
            <>
              <UpperHeader />
              <center>
                <h1 className="mt-5 pt-5">Loading...</h1>
              </center>
            </>
          }
        >
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/feedbackL1andL2/:storeCode/:rsoName/"
              component={FeedbacL1AndL2}
            />
            <Route
              exact
              path="/FeedbacL1AndL2ForPhysical/:storeCode/:rsoName/"
              component={FeedbacL1AndL2ForPhysical}
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
              path="/dayEndreportForAdmin/:storeCode/:rsoName/"
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
              path="/PortelCloseReport/:storeCode/:rsoName/:level/"
              component={PortelCloseReport}
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
