import React, { useEffect, useRef, useState } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import { Box } from "@mui/material";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  const params = useParams();
  const movieId = params.movieId;
  const [rating, setRating] = useState(0);
  const urlap = process.env.REACT_APP_API_URL;


  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;

    try {
      const response = await api.post(`${urlap}/api/v1/reviews`, {
        reviewBody: rev.value,
        imdbId: movieId,
        rating: rating,
      });

      const updatedReviews = [...reviews, { body: rev.value, rating: rating }];

      rev.value = "";
      setReviews(updatedReviews);
      setRating(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" margin={"10px"}>
        <h3>Reviews</h3>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Col md={4}>
          <Card style={{ width: "100%", height: "400px" }}>
            <Card.Img
              src={movie?.poster}
              alt=""
              style={{ objectFit: "contain", height: "100%" }}
            />
          </Card>
        </Col>
      </Box>
      <Box display="flex" justifyContent="center">
        <Col md={8}>
          <Form onSubmit={addReview}>
            <Form.Group>
              <Form.Label>Write a Review</Form.Label>
              <Form.Control
                ref={revText}
                as="textarea"
                rows={3}
                placeholder="Write your review here"
              />
            </Form.Group>
            <Form.Group>
              <Rating
                value={rating}
                size={24}
                onChange={(value) => setRating(value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit Review
            </Button>
          </Form>
          <hr />
          {reviews?.map((r, index) => (
            <div key={index}>
              <p>{r.body}</p>
              <Rating value={r.rating} size={24} />
              <hr />
            </div>
          ))}
        </Col>
      </Box>
      <hr />
    </Container>
  );
};

export default Reviews;
