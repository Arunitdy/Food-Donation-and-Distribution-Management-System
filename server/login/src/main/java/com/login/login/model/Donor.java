package com.login.login.model;

import jakarta.persistence.*;

@Entity
@Table(name="Donor")
public class Donor {
    @Id
    @Column(name = "Donor_id")
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fname")
    private String fname;

    @Column(name = "mname")
    private String mname;

    @Column(name = "lname")
    private String lname;

    @Column(name = "contact_info")
    private Long contact_info;

    @Column(name = "address")
    private String address;

    @Column(name = "donor_type")
    private String donor_type;

    @Column(name = "donor_history")
    private String donor_history;

    public Donor(){
        
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public Long getContact_info() {
        return contact_info;
    }

    public void setContact_info(Long contact_info) {
        this.contact_info = contact_info;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDonor_type() {
        return donor_type;
    }

    public void setDonor_type(String donor_type) {
        this.donor_type = donor_type;
    }

    public String getDonor_history() {
        return donor_history;
    }

    public void setDonor_history(String donor_history) {
        this.donor_history = donor_history;
    }
}