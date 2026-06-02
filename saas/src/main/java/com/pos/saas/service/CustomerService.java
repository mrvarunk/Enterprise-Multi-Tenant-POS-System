package com.pos.saas.service;

import com.pos.saas.model.Customer;
import java.util.List;

public interface CustomerService {
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Long customerId, Customer customerDetails) throws Exception;
    void deleteCustomer(Long customerId) throws Exception;
    Customer getCustomerById(Long customerId) throws Exception;
    List<Customer> getAllCustomers();
    List<Customer> searchCustomer(String keyword);
}