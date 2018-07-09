package com.tras.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tras.dto.Timesheet;
import com.tras.repository.TimesheetRepository;

@Service
@Transactional
public class TimesheetService {
	@Autowired
	TimesheetRepository timesheetRepository;
	
	
	public List<Timesheet> save(List<Timesheet> timesheetList) {
		return timesheetRepository.saveAll(timesheetList);
				
	}
	
}
