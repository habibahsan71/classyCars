import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import useAuth from '../../Hoocks/useAuth';
import AddService from '../AddService/AddService';
import MakeAdmin from '../Admin/MakeAdmin';
import ManageServices from '../ManageServices/ManageServices';

const DashBoard = () => {
    let { path, url } = useRouteMatch();
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/checkAdmin/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data[0]?.role === "admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            });
    }, [user?.email]);
    console.log(isAdmin);


    return (
        <div>
            <div className="dashboard-container ">
                <div className="row">
                    <div className="col-md-3 bg-dark">
                        <div className="dashboard">
                            <h5>Dashboard</h5>
                            <Link to={`${url}`}>
                                <li className="dashboard-menu mt-5">Book</li>
                            </Link>

                            <Link to={`${url}/BookingList`}>
                                <li className="dashboard-menu mt-5">Booking list</li>
                            </Link>

                            <Link to={`${url}/review`}>
                                <li className="dashboard-menu mt-5">Review</li>
                            </Link>
                            <div className="admin-dashboard">
                                <li className="dashboard-menu mt-5">Orders list</li>

                                {isAdmin && (
                                    <Link to={`${url}/addService`}>
                                        <li className="dashboard-menu">Add Service</li>
                                    </Link>
                                )}
                                <Link to={`${url}/makeAdmin`}>
                                    <li className="dashboard-menu">Make Admin</li>
                                </Link>
                                <Link to={`${url}/manageServices`}>
                                    <li className="dashboard-menu">Manage Service</li>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <Switch>
                            {/* <Route exact path={path}>
                <MyBookings></MyBookings>
              </Route> */}
                            {/* <Route exact path={`${path}/review`}>
                <Review></Review>
              </Route> */}
                            {/* <Route exact path={`${path}/BookingList`}>
                <MyBookings></MyBookings>
              </Route> */}
                            <Route exact path={`${path}/makeAdmin`}>
                                <MakeAdmin></MakeAdmin>
                            </Route>
                            <Route exact path={`${path}/addService`}>
                                <AddService></AddService>
                            </Route>
                            <Route exact path={`${path}/manageServices`}>
                                <ManageServices></ManageServices>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;