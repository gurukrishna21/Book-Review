package com.examly.springapp.service;

import com.examly.springapp.model.Book;
import com.examly.springapp.model.Review;
import com.examly.springapp.repository.BookRepository;
import com.examly.springapp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    
    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private ReviewRepository reviewRepository;

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public Book updateBook(Long id, Book updated) {
        return bookRepository.findById(id).map(b -> {
            b.setTitle(updated.getTitle());
            b.setAuthor(updated.getAuthor());
            b.setGenre(updated.getGenre());
            b.setDescription(updated.getDescription());
            return bookRepository.save(b);
        }).orElseGet(() -> {
            // if not found, create new with provided id
            updated.setId(id);
            return bookRepository.save(updated);
        });
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getAllBooksWithAvgRating() {
        List<Book> books = bookRepository.findAll();
        for (Book book : books) {
            List<Review> reviews = reviewRepository.findByBookId(book.getId());
            if (!reviews.isEmpty()) {
                double avgRating = reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
                book.setDescription(book.getDescription() + " - Avg Rating: " + String.format("%.2f", avgRating));
            }
        }
        return books;
    }
}