package com.tras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tras.dto.Timesheet;
import com.tras.dto.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT u FROM User u WHERE LOWER(u.username) = LOWER(:username)") 
	public User findOneByUsername(@Param("username")String username);
	
	/*@Query("SELECT u FROM User u WHERE LOWER(u.email) = LOWER(:email)")
    public User findOneByEmail(@Param("email") String email);*/
	
	@Modifying
	@Query("UPDATE User u SET u.password = ?1 WHERE u.username = ?2")
	 public void updatePassword(@Param("password") String password,@Param("username") String username);
	
	@Query("SELECT u FROM User u WHERE u.username = ?1 and  u.password = ?2 ") 
	public User findOneByUnameAndPwd(@Param("username")String username,@Param("password") String password);
	
	@Query("SELECT t FROM Timesheet t, User u WHERE t.username = u.username and t.username = ?1"  ) 
	public Timesheet populateTimesheetDetails(@Param("username")String username);
	
		
}
