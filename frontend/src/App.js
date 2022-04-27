import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login";
import Dashboard from "./pages/DashBoard/DashBoard";
import StartSell from "./pages/DashBoard/StartSell";
import AddCompany from "./pages/DashBoard/AddCompany";
import AddCategory from "./pages/DashBoard/AddCategory";
import CompanyReport from "./pages/DashBoard/CompanyReport";
import OrderPage from "./pages/DashBoard/Orderpage";
import OrderReports from "./pages/DashBoard/OrderReports";
import AddProduct from "./pages/DashBoard/AddMedicine";
import CategoryReport from "./pages/DashBoard/CategoryReport";
import AddStock from "./pages/DashBoard/Add Stock";
import AddMedicine from "./pages/DashBoard/AddMedicine";
import MedicineReport from "./pages/DashBoard/MedicineReport";
import StockReport from "./pages/DashBoard/StockReport";
import UpdateMedicine from "./pages/DashBoard/UpdateMedicine";
import UpdateCompany from "./pages/DashBoard/UpdateCompany";
import UpdateCategory from "./pages/DashBoard/UpdateCategory";
import ComboBox from "./pages/DashBoard/masti";
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <Login />
          </Route>
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard>test</Dashboard>
          </Route>
          <Route exact path={"/AddCompany"}>
            <Dashboard>
              <AddCompany />
            </Dashboard>
          </Route>
          <Route exact path={"/AddCategory"}>
            <Dashboard>
              <AddCategory />
            </Dashboard>
          </Route>
          <Route exact path={"/CompanyReport"}>
            <Dashboard>
              <CompanyReport />
            </Dashboard>
          </Route>
          <Route exact path={"/StartSell"}>
            <Dashboard>
              <StartSell />
            </Dashboard>
          </Route>
          <Route exact path={"/masti"}>
           
              <ComboBox />
        
          </Route>
          <Route exact path={"/OrderReport"}>
            <Dashboard>
              <OrderReports />
            </Dashboard>
          </Route>
          <Route exact path={"/MedicineReport"}>
            <Dashboard>
              <MedicineReport />
            </Dashboard>
          </Route>
          <Route exact path={"/UpdateMedicine/:id"}>
            <Dashboard>
              <UpdateMedicine />
            </Dashboard>
          </Route>
          <Route exact path={"/UpdateCompany/:name"}>
            <Dashboard>
              <UpdateCompany />
            </Dashboard>
          </Route>
          <Route exact path={"/UpdateCategory/:name"}>
            <Dashboard>
              <UpdateCategory />
            </Dashboard>
          </Route>
          <Route exact path={"/CategoryReport"}>
            <Dashboard>
              <CategoryReport />
            </Dashboard>
          </Route>
          <Route exact path={"/AddMedicine"}>
            <Dashboard>
              <AddMedicine />
            </Dashboard>
          </Route>
          <Route exact path={"/AddStock"}>
          <Dashboard>
            <AddStock />
            </Dashboard>
          </Route>
          <Route exact path={"/StockReport"}>
            <Dashboard>
              <StockReport />
            </Dashboard>
          </Route>
          <Route exact path={"/Logout"}>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
