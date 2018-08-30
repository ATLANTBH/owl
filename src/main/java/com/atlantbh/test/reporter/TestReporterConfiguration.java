package com.atlantbh.test.reporter;

import com.atlantbh.test.reporter.config.spring.RetriableDataSource;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;
import java.util.List;

/**
 * Test reporter app configuration.
 */
@Configuration
@EnableRetry
public class TestReporterConfiguration extends WebMvcConfigurerAdapter {
	private static Integer CACHE_TIME = 21600;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// Serve assets from public dir
		registry.addResourceHandler("/dist/**")
				.addResourceLocations("classpath:/public/dist/")
				.setCachePeriod(CACHE_TIME)
				.resourceChain(true)
				.addResolver(new GzipResourceResolver());

		// Serve index for all other routes
		registry.addResourceHandler("/**")
				.setCachePeriod(CACHE_TIME)
				.resourceChain(true)
				.addResolver(new IndexResourceResolver());
	}

	@Bean
	public BeanPostProcessor dataSourceWrapper() {
		return new RetriableDataSourceBeanPostProcessor();
	}

	public static class IndexResourceResolver extends PathResourceResolver {
		@Override
		public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
			return new ClassPathResource("public/index.html", this.getClass().getClassLoader());
		}
	}

	@Order(Ordered.HIGHEST_PRECEDENCE)
	private class RetriableDataSourceBeanPostProcessor implements BeanPostProcessor {
		@Override
		public Object postProcessBeforeInitialization(Object bean, String beanName)
				throws BeansException {
			if (bean instanceof DataSource) {
				bean = new RetriableDataSource((DataSource)bean);
			}
			return bean;
		}

		@Override
		public Object postProcessAfterInitialization(Object bean, String beanName)
				throws BeansException {
			return bean;
		}
	}
}
