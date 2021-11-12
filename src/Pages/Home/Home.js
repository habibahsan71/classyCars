import React from 'react';
import { useHistory } from 'react-router';
import useServices from '../../Hoocks/useServices';
import ShowReview from '../Review/ShowReview';
import Service from '../Service/Service';


import Banner from './Banner/Banner';

const Home = () => {
    const history = useHistory();
    const [services] = useServices();
    const featuredServices = services.slice(0, 6);
    function GoServices() {
        history.push("/services");
    }
    return (
        <div>
            <Banner></Banner>
            {/* <Services></Services> */}
            <div className='container services-container'>
                <h1>Our Services</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        featuredServices.map(service => <Service
                            key={service._id}
                            service={service}
                        ></Service>
                        )

                    }
                </div>
                <button onClick={GoServices} className='btn btn-outline-warning my-2'>Explore More</button>
            </div>
            <ShowReview></ShowReview>

        </div>
    );
};

export default Home;