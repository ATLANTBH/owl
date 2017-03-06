package com.atlantbh.test.reporter.filters.specifications;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * Base filter specification for filters. All filter related query manipulation per filter and model are done here.
 *
 * If custom filtering is needed for some model, create new filter object and its specification, ie:
 *
 * @Entity
 * class SomeModel {
 *     ...
 * }
 *
 * class SomeModelFilter {
 *     ...
 * }
 *
 * class SomeModelFilterSpecification extends BaseFilterSpecification<SomeModelFilter, SomeModel> {
 *    @Override
 *    public Predicate toPredicate(Root<U> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
 *       ....
 *    }
 * }
 *
 * @param <T> Filter model class type.
 * @param <U> Model class type.
 * @author Kenan Klisura
 */
public class BaseFilterSpecification<T, U> implements Specification<U> {
	/**
	 * The Filter.
	 */
	protected T filter;

	/**
	 * Instantiates a new Base filter specification.
	 *
	 * @param filter the filter
	 */
	public BaseFilterSpecification(T filter) {
		this.filter = filter;
	}

	/**
	 * Override this method to support filtering on current filter type.
	 *
	 * @param root
	 * @param criteriaQuery
	 * @param criteriaBuilder
	 * @return
	 */
	@Override
	public Predicate toPredicate(Root<U> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return null;
	}
}
