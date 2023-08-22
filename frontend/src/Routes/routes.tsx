import { createBrowserRouter } from 'react-router-dom'
import GridSection from '../pages/GridSection'
import Inventory from '../componants/Inventory/Main Page/Inventory'
import MainImage from '../componants/MainImage'
import ItemTable from '../componants/Inventory/Item/ItemTable'
import ItemCategoryTable from '../componants/Inventory/Category/ItemCategoryTable'
import SupplierTable from '../componants/Inventory/Supplier/SupplierTable'

const routes = createBrowserRouter([
    {
        path:'/',
        element:<GridSection/>,
        children:[
            {index:true, element:<MainImage/>},
            {path:'inventory', element:<Inventory/>, children:[
                {path:'', element:<ItemTable/>},
                {path:'categories', element:<ItemCategoryTable/>},
                {path:'suppliers', element:<SupplierTable/>},
            ]}
        ]
    }
])

export default routes;
