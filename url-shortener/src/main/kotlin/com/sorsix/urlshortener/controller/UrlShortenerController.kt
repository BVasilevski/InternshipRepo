package com.sorsix.urlshortener.controller

import com.sorsix.urlshortener.service.UrlService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class UrlShortenerController(val urlService: UrlService) {
    @PostMapping("/shorturl")
    fun shortenUrl(@RequestParam url: String): ResponseEntity<Any> {
        try {
            val shortenedUrl = urlService.shortenUrl(url)
            return ResponseEntity.ok(mapOf("original_url" to url, "short_url" to shortenedUrl?.id));
        } catch (e: RuntimeException) {
            return ResponseEntity.badRequest().body(mapOf("error" to e.message))
        }
    }

    @GetMapping("/shorturl/{shortUrl}")
    fun redirectToOriginalUrl(@PathVariable shortUrl: Long): ResponseEntity<Any> {
        try {
            val originalUrl = urlService.findById(shortUrl)
            return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", originalUrl.originalUrl).build()
        } catch (e: RuntimeException) {
            return ResponseEntity.notFound().build();
        }
    }
}