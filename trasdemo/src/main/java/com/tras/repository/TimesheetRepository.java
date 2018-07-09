package com.tras.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tras.dto.Timesheet;

public interface TimesheetRepository extends JpaRepository<Timesheet, Long>{
	

}
