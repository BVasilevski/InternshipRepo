package com.sorsix.urlshortener.service

import com.sorsix.urlshortener.model.Url
import com.sorsix.urlshortener.repository.UrlRepository
import org.springframework.stereotype.Service

@Service
class UrlService(val urlRepository: UrlRepository) {

    fun findById(id: Long): Url = urlRepository.findById(id).orElseThrow { RuntimeException("Short url $id not found") }

    fun shortenUrl(originalUrl: String): Url? {
        if (!isValidHttpUrl(originalUrl)) {
            throw RuntimeException("invalid url")
        }
        return urlRepository.save(Url(0, originalUrl))
    }

    fun isValidHttpUrl(url: String): Boolean {
        val regex =
            Regex("""https?:\/\/(?:www\.)?[a-zA-Z0-9\-._~%]+(?:\.[a-zA-Z]{2,})(?::\d+)?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?""")
        return regex.matches(url)
    }
}