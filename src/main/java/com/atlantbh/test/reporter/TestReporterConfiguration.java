package com.atlantbh.test.reporter;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by kenanklisura on 06/03/2017.
 */
@Configuration
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

	public static class IndexResourceResolver extends PathResourceResolver {
		@Override
		public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
			return new ClassPathResource("public/index.html", this.getClass().getClassLoader());
		}
	}
}
