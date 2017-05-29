package com.atlantbh.test.reporter.filters.specifications;

import com.atlantbh.test.reporter.filters.TestRunFilter;
import com.atlantbh.test.reporter.models.TestRun;
import org.springframework.util.CollectionUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * TestRunFilter specification.
 *
 * @author Kenan Klisura
 */
public class TestRunFilterSpecification extends BaseFilterSpecification<TestRunFilter, TestRun> {
	/**
	 * BUILD_PROPERTY on TestRun model.
	 */
	public static final String BUILD_PROPERTY = "build";

	/**
	 * Instantiates a new Test run filter specification.
	 *
	 * @param filter the filter
	 */
	public TestRunFilterSpecification(TestRunFilter filter) {
		super(filter);
	}

	@Override
	public Predicate toPredicate(Root<TestRun> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		Predicate result = null;

		if (!CollectionUtils.isEmpty(filter.getBuilds())) {
			result = criteriaBuilder.in(root.get(BUILD_PROPERTY)).value(filter.getBuilds());
		}

		if (!CollectionUtils.isEmpty(filter.getTestSuites())) {
			result = and(criteriaBuilder, result,
					criteriaBuilder.in(root.get("testSuite").get("id")).value(filter.getTestSuites()));
		}

		return result;
	}
}
