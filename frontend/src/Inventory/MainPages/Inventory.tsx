import { Grid, GridItem, Spinner, useColorMode } from "@chakra-ui/react";
import InventorySidePanel from "../SidePanel/InventorySidePanel";
import useItemsPagination from "../../hooks/Inventory/useItemsPage";
import useCategoryPagination from "../../hooks/Inventory/useCategoryPage";
import useSupplier from "../../hooks/Registration/useSupplier";
import { Outlet } from "react-router-dom";
import SupplierContext from "../../Contexts/Registration/SupplierContext";
import ItemCategoryContext from "../../Contexts/Inventory/CategoryContext";
import ItemPageContext from "../../Contexts/Inventory/ItemPageContext";

const Inventory = () => {
  const { colorMode } = useColorMode();
  const {
    suppliers,
    setSuppliers,
    errorFetchSupplier,
    nextSupplierUrl,
    previousSupplierUrl,
    filterSupplierParams,
    setFilterSupplierParams,
    suppliersCount,
    isLoadingSupplierPage,
    setErrorFetchSupplier,
    setSupplierNameFilter,
    supplierNameFilter,
  } = useSupplier();
  const {
    items,
    setItems,
    nextItemPageUrl,
    previousItemPageUrl,
    filterItemPageParams,
    setFilterItemPageParams,
    isLoadingItems,
    error,
    setError,
    itemCount,
    setItemQuery,
    setItemSizeQuery,
    setItemBrandQuery
  } = useItemsPagination();
  const {
    categories,
    setCategories,
    nextCategoryUrl,
    previousCategoryUrl,
    filterCategoryParams,
    setFilterCategoryParams,
    isLoadingCategories,
    errorFetchCategory,
    setErrorFetchCategory,
    categoryCount,
    setCategoryNameFilter,
  } = useCategoryPagination();

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        setSuppliers,
        errorFetchSupplier,
        nextSupplierUrl,
        previousSupplierUrl,
        filterSupplierParams,
        setFilterSupplierParams,
        suppliersCount,
        isLoadingSupplierPage,
        setErrorFetchSupplier,
        setSupplierNameFilter,
      }}
    >
      <ItemPageContext.Provider
        value={{
          items,
          setItems,
          nextItemPageUrl,
          previousItemPageUrl,
          filterItemPageParams,
          setFilterItemPageParams,
          isLoadingItems,
          setError,
          error,
          itemCount,
          setItemQuery,
          setItemSizeQuery,
          setItemBrandQuery
        }}
      >
        <ItemCategoryContext.Provider
          value={{
            categories,
            setCategories,
            nextCategoryUrl,
            previousCategoryUrl,
            filterCategoryParams,
            setFilterCategoryParams,
            isLoadingCategories,
            setErrorFetchCategory,
            errorFetchCategory,
            categoryCount,
            setCategoryNameFilter,
          }}
        >
          {/* Grid */}
          <Grid
            templateAreas={{
              lg: `"main aside"`,
              base: `"aside" "main"`,
            }}
          >
            <GridItem
              area="main"
              height={{ base: "10vh", lg: "85vh" }}
              width={{ base: "100vw", lg: "60vw" }}
            >
              {(isLoadingCategories || isLoadingItems) && <Spinner />}

              <Outlet />
            </GridItem>
            <GridItem
              area="aside"
              height={{ base: "10vh", lg: "85vh" }}
              width={{ base: "100vw", lg: "15vw" }}
              boxShadow="dark-lg"
              borderRadius={30}
              padding={5}
              bg={colorMode === "light" ? "#ca5c4f" : ""}
            >
              <InventorySidePanel />
            </GridItem>
          </Grid>
        </ItemCategoryContext.Provider>
      </ItemPageContext.Provider>
    </SupplierContext.Provider>
  );
};

export default Inventory;
