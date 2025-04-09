package com.sorsix.timestamps.controller

import com.sorsix.timestamps.service.TimestampService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.format.DateTimeParseException

@RestController
@RequestMapping("/api")
class TimestampController(val timestampService: TimestampService) {

    @GetMapping("{date}")
    fun getTimestamp(@PathVariable("date") date: String): ResponseEntity<Any> {
        try {
            val timestamp = timestampService.createTimestamp(date)
            return ResponseEntity.ok().body(timestamp)
        } catch (e: RuntimeException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mapOf("error" to e.message))
        } catch (e: NumberFormatException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        } catch (e: DateTimeParseException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        }
    }
}