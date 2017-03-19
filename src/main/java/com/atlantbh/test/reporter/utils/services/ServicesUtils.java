package com.atlantbh.test.reporter.utils.services;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * Services utils
 *
 * @author Kenan Klisura
 */
public final class ServicesUtils {
	public static final Sort CREATED_AT_DESC_SORT = new Sort(new Sort.Order(Sort.Direction.DESC, "createdAt"));
	public static final Sort CREATED_AT_ASC_SORT = new Sort(new Sort.Order(Sort.Direction.ASC, "createdAt"));

	private ServicesUtils() {
		// Empty ctor.
	}

	/**
	 * Create pageable request with default sort.
	 * @param page Page.
	 * @param defaultSort Default sort object.
	 * @return Page object.
	 */
	public static PageRequest createPageRequest(Pageable page, Sort defaultSort) {
		Sort sort = page.getSort();
		sort = sort == null ? defaultSort : sort.and(defaultSort);

		return new PageRequest(page.getPageNumber(), page.getPageSize(), sort);
	}
}
