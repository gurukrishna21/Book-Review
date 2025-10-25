package com.examly.springapp.service;

import com.examly.springapp.model.Review;
import com.examly.springapp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByBookId(Long bookId) {
        return reviewRepository.findByBookId(bookId);
    }
    
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
    
    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }
    
    public Review updateReview(Long id, Review updated) {
        return reviewRepository.findById(id).map(r -> {
            r.setBookId(updated.getBookId());
            r.setReviewText(updated.getReviewText());
            r.setRating(updated.getRating());
            return reviewRepository.save(r);
        }).orElseGet(() -> {
            updated.setId(id);
            return reviewRepository.save(updated);
        });
    }
    
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}