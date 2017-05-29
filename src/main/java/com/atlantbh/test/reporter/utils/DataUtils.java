package com.atlantbh.test.reporter.utils;

import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by Kenan Klisura on 29/05/2017.
 */
public final class DataUtils {
	private DataUtils() {

	}

	/**
	 * Returns list of long values by splititng input string.
	 * @param input Input string.
	 * @return List of long values.
	 */
	public static List<Long> splitToLongList(String input) {
		if (StringUtils.isEmpty(input)) {
			return Collections.emptyList();
		}

		return Arrays.stream(StringUtils.split(input, ','))
				.map(value -> {
					try {
						return Long.parseLong(value);
					} catch (NumberFormatException e) {
						return null;
					}
				})
				.filter(Objects::nonNull)
				.collect(Collectors.toList());
	}
}
