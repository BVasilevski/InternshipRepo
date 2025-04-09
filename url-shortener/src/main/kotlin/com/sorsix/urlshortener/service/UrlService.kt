package com.sorsix.urlshortener.service

import com.sorsix.urlshortener.model.Url
import com.sorsix.urlshortener.repository.UrlRepository
import org.springframework.stereotype.Service

@Service
class UrlService(val urlRepository: UrlRepository) {

    fun findById(id: Long): Url = urlRepository.findById(id).orElseThrow { RuntimeException("Short url $id not found") }

    fun shortenUrl(originalUrl: String): Url? {
        return urlRepository.save(Url(0, originalUrl))
    }
}