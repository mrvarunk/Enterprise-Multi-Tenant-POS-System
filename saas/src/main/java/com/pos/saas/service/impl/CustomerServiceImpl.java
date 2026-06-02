package com.pos.saas.service.impl;

import com.pos.saas.model.Customer;
import com.pos.saas.repository.CustomerRepository;
import com.pos.saas.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long customerId, Customer customerDetails) throws Exception {
        Customer existingCustomer = getCustomerById(customerId);

        if (customerDetails.getFullName() != null) {
            existingCustomer.setFullName(customerDetails.getFullName());
        }
        if (customerDetails.getEmail() != null) {
            existingCustomer.setEmail(customerDetails.getEmail());
        }
        if (customerDetails.getPhone() != null) {
            existingCustomer.setPhone(customerDetails.getPhone());
        }

        return customerRepository.save(existingCustomer);
    }

    @Override
    public void deleteCustomer(Long customerId) throws Exception {
        Customer customer = getCustomerById(customerId);
        customerRepository.delete(customer);
    }

    @Override
    public Customer getCustomerById(Long customerId) throws Exception {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new Exception("Customer not found with id: " + customerId));
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public List<Customer> searchCustomer(String keyword) {
        // Pass the keyword twice to match either the full name OR the email
        return customerRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
    }
}