package com.tras.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "Timesheet")
public class Timesheet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(unique = true)
	private String username;
	
	@Column(name="TS_Date")
	private String tsDate;
	
	@Column(name="WBS_Code")
	private String wbsCode;
	
	@Column(name="Regular_Hrs")
	private String regularHrs;
	
	@Column(name="Overtime_Hrs")
	private String overTimeHrs;
	
	
	@Transient
	private String tsStatus;
	
	public Timesheet(){
		
	}
	
	/*public Timesheet(String username, String TS_Date, String WBS_Code,String Regular_Hrs, String Overtime_Hrs,String Total_Hrs,String TS_Status) {
		this.username = username;
		this.TS_Date = TS_Date;
		this.WBS_Code = WBS_Code;
		this.Regular_Hrs = Regular_Hrs;
		this.Overtime_Hrs = Overtime_Hrs;
		this.Total_Hrs = Total_Hrs;
		this.TS_Status = TS_Status;
	}
	
	@Override
	public String toString() {
		return "Timesheet [id=" + id + ", username=" + username + ", TS_Date=" + TS_Date 
				+ ", WBS_Code=" + WBS_Code + ", Regular_Hrs=" + Regular_Hrs + ", Overtime_Hrs=" + Overtime_Hrs 
				+",Total_Hrs=" + Total_Hrs + ",TS_Status=" + TS_Status+ ",]";
	}*/
		 
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getTsDate() {
		return tsDate;
	}

	public void setTsDate(String tsDate) {
		this.tsDate = tsDate;
	}

	public String getWbsCode() {
		return wbsCode;
	}

	public void setWbsCode(String wbsCode) {
		this.wbsCode = wbsCode;
	}

	public String getRegularHrs() {
		return regularHrs;
	}

	public void setRegularHrs(String regularHrs) {
		this.regularHrs = regularHrs;
	}

	public String getOverTimeHrs() {
		return overTimeHrs;
	}

	public void setOverTimeHrs(String overTimeHrs) {
		this.overTimeHrs = overTimeHrs;
	}

	public String getTsStatus() {
		return tsStatus;
	}

	public void setTsStatus(String tsStatus) {
		this.tsStatus = tsStatus;
	}

	
	
}
