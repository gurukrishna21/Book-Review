package com.examly.springapp.controller;

import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewService;
import com.examly.springapp.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/reviews")
    public List<Review> getReviewsByBookId(@RequestParam Long bookId) {
        return reviewService.getReviewsByBookId(bookId);
    }

    @PostMapping("/reviews")
    public Review addReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    @GetMapping("/reviews/all")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/reviews/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Review r = reviewService.getReviewById(id);
        if (r == null) throw new ResourceNotFoundException("Review not found with id: " + id);
        return ResponseEntity.ok(r);
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review review) {
        Review updated = reviewService.updateReview(id, review);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        Review r = reviewService.getReviewById(id);
        if (r == null) throw new ResourceNotFoundException("Review not found with id: " + id);
        reviewService.deleteReview(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}