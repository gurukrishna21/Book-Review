package com.examly.springapp;

import com.examly.springapp.model.Book;
import com.examly.springapp.model.Review;
import com.examly.springapp.repository.BookRepository;
import com.examly.springapp.repository.ReviewRepository;
import com.examly.springapp.service.BookService;
import com.examly.springapp.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SpringappApplicationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepo;

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private BookService bookService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ObjectMapper objectMapper;

    private Book testBook;

    @BeforeEach
    public void setup() {
        reviewRepo.deleteAll();
        bookRepo.deleteAll();

        testBook = new Book();
        testBook.setTitle("Test Book");
        testBook.setAuthor("Author A");
        testBook.setGenre("Fiction");
        testBook.setDescription("Description A");
        bookRepo.save(testBook);
    }

    // 1 ✅ Context loads
    @Test
    public void SpringBoot_ProjectAnalysisAndUMLDiagram_loadContextAndBeansProperly() {
        assertThat(bookRepo).isNotNull();
        assertThat(reviewRepo).isNotNull();
        assertThat(bookService).isNotNull();
        assertThat(reviewService).isNotNull();
    }

    // 2 ✅ Repository save & find
    @Test
    public void SpringBoot_DatabaseAndSchemaSetup_repositoryLayerBookSaveAndFind() {
        Book book = new Book();
        book.setTitle("Repo Book");
        book.setAuthor("Author B");
        book.setGenre("Drama");
        book.setDescription("Desc B");
        bookRepo.save(book);

        List<Book> books = bookRepo.findAll();
        assertThat(books.stream().anyMatch(b -> "Repo Book".equals(b.getTitle()))).isTrue();
    }

    // 3 ✅ Service save & find
    @Test
    public void SpringBoot_ProjectAnalysisAndUMLDiagram_serviceLayerSaveBook() {
        Book book = new Book();
        book.setTitle("Service Book");
        book.setAuthor("Author C");
        book.setGenre("Horror");
        book.setDescription("Desc C");

        bookService.saveBook(book);
        assertThat(bookRepo.findAll().stream().anyMatch(b -> "Service Book".equals(b.getTitle()))).isTrue();
    }

    // 4 ✅ Get all books endpoint
    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_getAllBooksEndpoint() throws Exception {
        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    // 5 ✅ Post new book endpoint
    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_postNewBookEndpoint() throws Exception {
        Book book = new Book();
        book.setTitle("Posted Book");
        book.setAuthor("Author D");
        book.setGenre("Sci-fi");
        book.setDescription("Desc D");

        mockMvc.perform(post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(book)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Posted Book"));

        assertThat(bookRepo.findAll().stream().anyMatch(b -> "Posted Book".equals(b.getTitle()))).isTrue();
    }

    // 6 ✅ Add review repository & service
    @Test
    public void SpringBoot_ProjectAnalysisAndUMLDiagram_repositoryAndServiceSaveReview() {
        Review review = new Review();
        review.setBookId(testBook.getId());
        review.setReviewText("Nice book");
        review.setRating(5);

        reviewService.saveReview(review);
        assertThat(reviewRepo.findByBookId(testBook.getId())).hasSize(1);
    }

    // 7 ✅ Get reviews by bookId endpoint
    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_getReviewsByBookIdEndpoint() throws Exception {
        Review review = new Review();
        review.setBookId(testBook.getId());
        review.setReviewText("Great book");
        review.setRating(4);
        reviewRepo.save(review);

        mockMvc.perform(get("/api/reviews?bookId=" + testBook.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].reviewText").value("Great book"));
    }

    // 8 ✅ Post review endpoint
    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_postReviewEndpoint() throws Exception {
        Review review = new Review();
        review.setBookId(testBook.getId());
        review.setReviewText("Awesome");
        review.setRating(5);

        mockMvc.perform(post("/api/reviews")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(review)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.reviewText").value("Awesome"));

        assertThat(reviewRepo.findByBookId(testBook.getId())).hasSize(1);
    }

    // 9 ✅ Average rating calculation in service
    @Test
    public void SpringBoot_ProjectAnalysisAndUMLDiagram_averageRatingIsCalculated() {
        Review r1 = new Review();
        r1.setBookId(testBook.getId());
        r1.setReviewText("Good");
        r1.setRating(4);
        reviewRepo.save(r1);

        Review r2 = new Review();
        r2.setBookId(testBook.getId());
        r2.setReviewText("Excellent");
        r2.setRating(5);
        reviewRepo.save(r2);

        List<Book> books = bookService.getAllBooksWithAvgRating();
        assertThat(books.get(0).getDescription()).contains("Avg Rating: 4.50");
    }

    // 10 ✅ Empty books list
    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_getAllBooksReturnsEmptyWhenNoneExist() throws Exception {
        bookRepo.deleteAll();
        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}
