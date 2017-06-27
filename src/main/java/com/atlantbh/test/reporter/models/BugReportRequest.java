package com.atlantbh.test.reporter.models;

/**
 * Bug report request.
 */
public class BugReportRequest {
	private String bugTitle;
	private String bugUrl;

	/**
	 * Gets bug title.
	 *
	 * @return the bug title
	 */
	public String getBugTitle() {
		return bugTitle;
	}

	/**
	 * Sets bug title.
	 *
	 * @param bugTitle the bug title
	 */
	public void setBugTitle(String bugTitle) {
		this.bugTitle = bugTitle;
	}

	/**
	 * Gets bug url.
	 *
	 * @return the bug url
	 */
	public String getBugUrl() {
		return bugUrl;
	}

	/**
	 * Sets bug url.
	 *
	 * @param bugUrl the bug url
	 */
	public void setBugUrl(String bugUrl) {
		this.bugUrl = bugUrl;
	}
}
