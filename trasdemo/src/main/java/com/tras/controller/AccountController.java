package com.tras.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

//import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tras.dto.Timesheet;
import com.tras.dto.User;
import com.tras.service.EmailService;
import com.tras.service.TimesheetService;
import com.tras.service.UserService;

@RestController
@RequestMapping("/account")
public class AccountController {

	public static final Logger logger = LoggerFactory.getLogger(AccountController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private TimesheetService timesheetService;

	@Autowired
	private EmailService emailService;

	@RequestMapping(value = "/createPwd", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public User createNewPassword(@RequestBody User userDto) {

		userService.updatePassword(userDto.getPassword(), userDto.getUsername());
		userDto.setSuccess("Password updated successfully!!");
		logger.info("Password updated successfully!!");
		return userDto;
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public User createUser(@RequestBody User user) {
		if (userService.find(user.getUsername()) != null) {
			user.setFailure("user " + user.getUsername() + " already exist ");
			logger.error("username Already exist " + user.getUsername());
		} else {
			userService.save(user);
			String lineseparator = System.lineSeparator();// on Windows systems
															// it is bound to
															// "\r\n".
			SimpleMailMessage registrationEmail = new SimpleMailMessage();
			// TO DO : need to be retrieved dynamically.
			user.setUsername("koteswara@braunweiss.net");
			registrationEmail.setTo(user.getUsername());
			registrationEmail.setSubject("Test mail of TRAS Registration Confirmation");
			final String appUrl = "http://localhost:4200/createPwd";
			// user.setPassword("Welcome2u");

			registrationEmail.setText("Your Temporary Password is: " + user.getPassword() + lineseparator
					+ lineseparator + "Please click on the below link to setup new password:\n" + appUrl + "/"
					+ user.getUsername());

			emailService.sendEmail(registrationEmail);
			user.setSuccess("An email successfully sent to " + user.getUsername() + " for registration!!");
		}
		return user;
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public User login(@RequestBody User user) {
		// boolean isValidUser = false;

		if (userService.findOneByUnameAndPwd(user.getUsername(), user.getPassword()) != null) {
			user.setSuccess("User logged in successfully!!");
			logger.info("User logged in successfully!!");
			user.setValidUser(true);
			user.setTeam("DL - Application Development");
			user.setCompany("BraunWeiss");

		} else {
			user.setFailure("Invalid login.");
			user.setValidUser(false);
		}
		return user;
	}

	@RequestMapping(value = "/timesheet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Timesheet> populateTimesheet(@RequestParam(value = "selectedWeekend") String selectedWeekend) {
		// TSResponseDTO tsResponseDTO =
		// userService.populateTimesheet(selectedWeekend);
		List<Timesheet> tsList = userService.populateTimesheet(selectedWeekend);
		return tsList;

	}

	@RequestMapping(value = "/savetimesheet", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean saveTimesheet(@RequestBody List<Timesheet> timesheetList) throws ParseException {
		// public Collection<Timesheet> saveTimesheet(@RequestBody
		// List<Timesheet> timesheetList) throws ParseException {

		boolean status;
		final ZonedDateTime input = ZonedDateTime.now();
		String currentYear = String.valueOf(input.getYear());
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		for (Timesheet ts : timesheetList) {
			String uiDate = ts.getTsDate(); // "Fri-05/16"
			String dt = currentYear + "-" + uiDate.substring(4, 6) + "-" + uiDate.substring(7, 9);
			Date date = (Date) formatter.parse(dt);
			String dbDate = newFormat.format(date);
			ts.setTsDate(dbDate);

		}
		if (timesheetService.save(timesheetList) != null) {
			status = true;
		} else {
			status = false;
		}
		return status;
	}

	@RequestMapping(value = "/populateweekendOf", method = RequestMethod.GET)
	public Set<String> populateWeekendOf() {
		Set<String> weekendSet = new LinkedHashSet<String>();
		weekendSet = userService.populateWeekendOf();
		return weekendSet;
	}

	/*
	 * @RequestMapping(value = "/bothJSONandXML", method = RequestMethod.POST,
	 * produces = {"application/json", "application/xml"}) public Student
	 * accepetsBothJSONandXML(@RequestBody Student student) {
	 * student.setName("Koti"); student.setAge("30"); Student student1= new
	 * Student(); student1.setName(student.getName());
	 * student1.setAge(student.getAge());
	 * 
	 * return student1; }
	 */
	/*
	 * String jwtToken = ""; jwtToken =
	 * Jwts.builder().setSubject(user.getUsername()).claim("roles",
	 * "user").setIssuedAt(new Date()) .signWith(SignatureAlgorithm.HS256,
	 * "secretkey").compact(); user.setToken(jwtToken);
	 * 
	 * /*@RequestMapping("/login") public Principal user(Principal principal) {
	 * logger.info("user logged " + principal.getName()); return principal; }
	 */

	/*
	 * @RequestMapping(value = "/timesheet", method = RequestMethod.GET,
	 * produces = MediaType.APPLICATION_JSON_VALUE) public Timesheet
	 * populateTimesheet(@RequestParam(value="username") String
	 * username, @RequestParam(value="weekendof") String weekendof) { Timesheet
	 * timesheet = new Timesheet(); timesheet =
	 * userService.populateTimesheetDetails(username); List<String> daysList =
	 * new ArrayList<String>(); daysList = userService.getWeekDays(weekendof);
	 * timesheet(daysList); return timesheet; }
	 */

}
