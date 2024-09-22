package com.login.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface loginrepo extends JpaRepository<loginrepo, Long> {

}



