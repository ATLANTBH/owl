package com.atlantbh.test.reporter.filters.specifications;

import com.atlantbh.test.reporter.filters.TestSuiteFilter;
import com.atlantbh.test.reporter.models.TestSuite;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * Created by Kenan Klisura on 29/05/2017.
 */
public class TestSuiteFilterSpecification extends BaseFilterSpecification<TestSuiteFilter, TestSuite> {
	public static final String SUITE_PROPERTY = "suite";

	/**
	 * Instantiates a new Base filter specification.
	 *
	 * @param filter the filter
	 */
	public TestSuiteFilterSpecification(TestSuiteFilter filter) {
		super(filter);
	}

	@Override
	public Predicate toPredicate(Root<TestSuite> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		Predicate result = null;

		if (StringUtils.isNotEmpty(filter.getSuite())) {
			result = criteriaBuilder.like(root.get(SUITE_PROPERTY), filter.getSuite());
		}

		return result;
	}
}
