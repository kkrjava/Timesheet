package com.tras.dto;

import java.util.List;

public class TSResponseDTO {
	
	private String status;
	
	private String company;
	
	private String weekendof;

	private List<String> tsdate;

	public List<String> getTsdate() {
		return tsdate;
	}

	public void setTsdate(List<String> tsdate) {
		this.tsdate = tsdate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getWeekendof() {
		return weekendof;
	}

	public void setWeekendof(String weekendof) {
		this.weekendof = weekendof;
	}

}
