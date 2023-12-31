import React, { useEffect, useState } from 'react'
import { Customer } from '../../services/Customer/customer-service'
import allCustomerService from '../../services/Customer/all-customer-service'

const useAllCustomers = () => {
    const [allCustomers, setAllCustomers] = useState<Customer[]>([])
    const [errorAllCustomerFetch, setErrorAllCustomerFetch] = useState('')
    const [allCustomerNameFilter, setAllCustomerNameFilter] = useState('')

    useEffect(()=>{
        const {request, cancel} = allCustomerService.getAll<Customer>({params : { allCustomerNameFilter }})
        request
            .then(res => {              
                setAllCustomers(res.data)
            }
            )
            .catch(err => {
                setErrorAllCustomerFetch(err.message !== 'canceled'? err.message : '')
            })
        return ()=> cancel();
    }, [allCustomerNameFilter])
  return {allCustomers, setAllCustomers, errorAllCustomerFetch, setErrorAllCustomerFetch, setAllCustomerNameFilter}
}

export default useAllCustomers