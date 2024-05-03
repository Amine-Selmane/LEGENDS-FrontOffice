import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from './Action/cartSlice';

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userTokenResponse = await axios.get('http://localhost:5000/api/userToken', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userEmail = userTokenResponse.data.email;

                    const recommendationsResponse = await axios.get(`http://localhost:5000/recommendations/${userEmail}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setRecommendations(recommendationsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error.message);
            }
        };

        fetchRecommendations();
    }, []);

    const handleAddToCart = (event) => {
        const { eventId, eventName, location, description } = event;
        dispatch(addToCart({ eventId, name: eventName, location, description }));
        navigate('/EventList');
    };

    return (
        <section className="event-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="sec-title">Recommended Events</h2>
                    </div>
                </div>
                <div className="row">
                    {recommendations.length === 0 ? (
                        <div className="col-md-12 text-center">
                            <p>No available recommendations</p>
                        </div>
                    ) : (
                        recommendations.map((event, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="event-item-1">
                                    <div className="ci-thumb" style={{ width: '100%' }}>
                                        {/* Assuming imageUrl is available in the recommendations */}
                                        <img src={event.imageUrl} style={{ maxWidth: '100%', height: 'auto' }} alt={event.eventName} />
                                    </div>
                                   
                                    <h4>{event.eventName}</h4>
                                    <button className="bisylms-btn" onClick={() => handleAddToCart(event)}>Check this Event</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Recommendations;
