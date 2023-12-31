import { useEffect, useState } from "react"
import CategoryService,{ Category, CategoryPageStructure } from "../../services/Inventory/category-page-service"


const useCategoryPagination = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [errorFetchCategory, setErrorFetchCategory] = useState('')
    const [nextCategoryUrl, setNextCategoryUrl] = useState<string | null>('')
    const [previousCategoryUrl, setpreviousCategoryUrl] = useState<string | null>('')
    const [filterCategoryParams, setFilterCategoryParams] = useState<string | null>('')
    const [isLoadingCategories, setIsLoadingCategories] = useState(false)
    const [categoryCount, setCategoryCount] =useState(0)
    const [categoryNameFilter, setCategoryNameFilter] = useState('')
    useEffect(()=>{
        setIsLoadingCategories(true)
        const {request, cancel} = CategoryService.getAll<CategoryPageStructure>(filterCategoryParams, {params : { categoryNameFilter }})

        request
            .then(res => {
                setCategories(res.data.results)
                setNextCategoryUrl(res.data.next)
                setpreviousCategoryUrl(res.data.previous)
                setIsLoadingCategories(false)
                setCategoryCount(res.data.count)
            })
            .catch(error => {
                setErrorFetchCategory(error.message !== 'canceled'? error.message : '' )
                setIsLoadingCategories(false)
                
            })

            return ()=> cancel();
        }, [filterCategoryParams, categoryNameFilter])

        return {categories, errorFetchCategory, setCategories, nextCategoryUrl, previousCategoryUrl, filterCategoryParams, setFilterCategoryParams, isLoadingCategories, setErrorFetchCategory, categoryCount, setCategoryNameFilter}  
}

export default useCategoryPagination