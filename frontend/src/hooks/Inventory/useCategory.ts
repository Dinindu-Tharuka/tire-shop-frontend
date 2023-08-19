import { useEffect, useState } from "react"
import CategoryService,{ Category } from "../../services/Inventory/category-service"


const useCategory = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [errorFetchCategory, setErrorFetchCategory] = useState('')

    useEffect(()=>{
        const {request, cancel} = CategoryService.getAll<Category>()

        request
            .then(res => setCategories(res.data))
            .catch(error => setErrorFetchCategory(error.message !== 'canceled'? error.mesage : ''))

            return ()=> cancel();
        }, [])

        return {categories, errorFetchCategory, setCategories, setErrorFetchCategory}  
}

export default useCategory