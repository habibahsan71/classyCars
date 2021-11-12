import React from 'react';
import useReviews from '../../Hoocks/useReviews';

const ShowReview = () => {
    const [reviews] = useReviews();
    return (
        <div>
            <h3 className='text-center mt-3'>What Our Customer says About Us</h3>
            <div className="row row-cols-1 row-cols-md-6 g-4">
                {
                    reviews.map(review => (
                        <div key={reviews._id} className="col service">
                            <div className="card">

                                <div className="card-body text-center">

                                    <h5 className="card-title">{review.name}</h5>
                                    <p className="card-title text-muted">{review.comments}</p>

                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ShowReview;