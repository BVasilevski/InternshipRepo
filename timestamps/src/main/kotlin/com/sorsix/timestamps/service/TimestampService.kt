package com.sorsix.timestamps.service

import com.sorsix.timestamps.model.Timestamp
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import java.util.Locale

@Service
class TimestampService(
    val zoneId: ZoneId = ZoneId.of("GMT"),
    val locale: Locale = Locale.ENGLISH,
) {

    fun createTimestampFromMillis(date: String): Timestamp {
        val millis = date.toLong()
        val instant = Instant.ofEpochMilli(millis)
        val formattedUtc = DateTimeFormatter.RFC_1123_DATE_TIME
            .withZone(zoneId)
            .format(instant)

        return Timestamp(date.toLong(), formattedUtc)
    }

    fun createTimestampFromDate(date: String): Timestamp {
        val zonedTime = LocalDate.parse(date).atStartOfDay(zoneId)
        val millisFromParsedDate = zonedTime.toInstant().toEpochMilli()
        val formattedString = DateTimeFormatter.ofPattern("EEE, dd MMM yyyy HH:mm:ss z", locale)
            .withZone(zoneId)
            .format(zonedTime)

        return Timestamp(millisFromParsedDate, formattedString)
    }

    fun isValid(input: String): Boolean {
        val regex = Regex("^\\d{4}-\\d{2}-\\d{2}$")
        return input.toLongOrNull() != null || regex.matches(input)
    }

    fun createTimestamp(input: String): Timestamp {
        if (!isValid(input)) {
            throw RuntimeException("Invalid date")
        }
        return try {
            createTimestampFromMillis(input)
        } catch (e: NumberFormatException) {
            try {
                createTimestampFromDate(input)
            } catch (e2: DateTimeParseException) {
                throw IllegalArgumentException("Invalid input: $input. Expected millis or yyyy-MM-dd format.")
            }
        }
    }
}