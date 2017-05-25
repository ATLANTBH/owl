package com.atlantbh.test.reporter.filters.specifications;

import com.atlantbh.test.reporter.filters.TestRunFilter;
import com.atlantbh.test.reporter.models.TestRun;
import org.apache.commons.lang3.StringUtils;

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

		if (StringUtils.isNotEmpty(filter.getBuild())) {
			result = criteriaBuilder.equal(root.get(BUILD_PROPERTY), filter.getBuild());
		}

		if (filter.getTestSuite() != null) {
			result = and(criteriaBuilder, result,
					criteriaBuilder.equal(root.get("testSuite").get("id"), filter.getTestSuite()));
		}

		return result;
	}


	private static Predicate and(CriteriaBuilder criteriaBuilder, Predicate... predicate) {
		Predicate result = null;
		for (int i = 0; i < predicate.length; i++) {
			if (predicate[i] != null) {
				if (result == null) {
					result = predicate[i];
				} else {
					result = criteriaBuilder.and(result, predicate[i]);
				}
			}
		}

		return result;
	}

}
