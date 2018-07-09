package com.tras.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tras.dto.Timesheet;
import com.tras.dto.User;
import com.tras.repository.UserRepository;

@Service
@Transactional
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public User save(User user) {
		return userRepository.saveAndFlush(user);
	}
	
	public User find(String username) {
		return userRepository.findOneByUsername(username);
	}

	public void updatePassword(String password,String username) {
		 userRepository.updatePassword(password, username);
	}
		
	public User findOneByUnameAndPwd(String username,String password) {
		return userRepository.findOneByUnameAndPwd(username,password);
	}
	
/*	public Timesheet populateTimesheetDetails(String username) {
		return userRepository.populateTimesheetDetails(username);
	}*/
		
	
	
	/**
	 * This method is used to populate the weekdays of a particular week.
	 * @param weekendof
	 * @return tsResponseDTO
	 */
/*	public TSResponseDTO populateTimesheet(String weekendof){
		TSResponseDTO tsResponseDTO = new TSResponseDTO();
	//	List<String> weekdays = getWeekDays(weekendof);
		tsResponseDTO.setCompany("Braunweiss");
		tsResponseDTO.setStatus("NotSubmitted");
		tsResponseDTO.setWeekendof(weekendof);
		tsResponseDTO.setTsdate(weekdays);
		return tsResponseDTO;
	}*/
	
	public Set<String> populateWeekendOf() {
		final ZonedDateTime input = ZonedDateTime.now();
		//Set<String> weekendSet = new LinkedHashSet<String>();
		SortedSet<String> weekendSet = new TreeSet<String>(Collections.reverseOrder());

		for(int i = 0; i < 6; i++) {
		    //final ZonedDateTime startOfLastWeek = input.plusWeeks(i).with(DayOfWeek.SATURDAY);
		    final ZonedDateTime startOfLastWeek = input.minusWeeks(i).with(DayOfWeek.SATURDAY);
		    weekendSet.add(startOfLastWeek.format(DateTimeFormatter.ISO_LOCAL_DATE));
		}
		//weekendSet.remove(weekendSet.first());
		return weekendSet;
	}
	
	public List<Timesheet> populateTimesheet(String weekendOf) {
		List<Timesheet> tsList = new ArrayList<Timesheet>();
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-d");
		LocalDate localDate = LocalDate.parse(weekendOf, formatter);
	
		//List<String> daysList = new ArrayList<String>();
		for(int j=0;j<7;j++){
			Timesheet ts = new Timesheet();
			final LocalDate weekday = localDate.plusDays(j);
			//final LocalDate weekday = localDate.minusDays(j);
			//System.out.print("\n"+weekday.format(DateTimeFormatter.ofPattern("EE-MM/dd")));
			ts.setTsDate(weekday.format(DateTimeFormatter.ofPattern("EE-MM/dd")));
			ts.setOverTimeHrs("");
		    ts.setRegularHrs("");
		    ts.setWbsCode("");
		    tsList.add(ts);
		}
		
		return tsList;
	}
}
