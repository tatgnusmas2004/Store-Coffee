package com.coffee_store.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public boolean login(String username, String password) {
		User user = userRepository.findByUsername(username);
		return user != null && user.getPassword().equals(password);
	}

}
