import {
  Button,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  Text,
  Input,
} from "@chakra-ui/react";
import UpdateItem from "../UpdateItemDrawer";
import { useContext, useState } from "react";
import ItemPageContext from "../../../Contexts/Inventory/ItemPageContext";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import ItemDelete from "../ItemDelete";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../../services/pagination-cut-link";
import useStockItem from "../../../hooks/Stock/useStockItems";
import calculateStockitemCount from "../Calculations/CountStockItems";
import ItemTableModel from "./ItemTableModel";
import { AllItemContext } from "../../../Contexts/Inventory/AllItemContest";
import UserMeContext from "../../../Contexts/User/UserMe";

const ItemTable = () => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const userMe = useContext(UserMeContext)
  const {
    items,
    nextItemPageUrl,
    previousItemPageUrl,
    setError,
    setFilterItemPageParams,
    error,
    itemCount,
    setItemQuery,
    setItemSizeQuery,
    setItemBrandQuery,
  } = useContext(ItemPageContext);

  const {
    allItems,
    setAllItemQuery,
    setAllItemBrandQuery,
    setAllItemSizeQuery,
  } = useContext(AllItemContext);
  const numOfPages = Math.ceil(itemCount / MAXIMUM_PAGES_PER_PAGE);
  const { colorMode } = useColorMode();

  const onTypeId = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setItemQuery(event.currentTarget.value+'');
    setAllItemQuery(event.currentTarget.value+'');
  };
  const onTypeSize = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setItemSizeQuery(event.currentTarget.value+'');
    setAllItemSizeQuery(event.currentTarget.value+'');
  };
  const onTypeBrand = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value+'');
    setItemBrandQuery(event.currentTarget.value+'');
    setAllItemBrandQuery(event.currentTarget.value+'');
  };

  const { stockItems } = useStockItem();
  
  return (
    <Flex alignItems="center" flexDir="column">
      {error && <Text textColor="red">Unable to fetch data from the internet.</Text>}
      <HStack>
        <Input placeholder="Search Item" onKeyUp={onTypeId} />
        <Input placeholder="Search Size" onKeyUp={onTypeSize} />
        <Input placeholder="Search Brand" onKeyUp={onTypeBrand} />
        {(userMe.is_superuser || userMe.is_manager) && <ItemTableModel items={allItems} />}
      </HStack>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>ID</Th>
              <Th>Stock Count</Th>
              <Th>Name</Th>
              <Th>Size</Th>
              <Th>Brand</Th>
              <Th>Type</Th>
              <Th>PR</Th>
              <Th>Country</Th>
              <Th>Valve</Th>
              <Th>Category</Th>
              <Th>Supplier</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items?.map((item) => (
              <Tr key={item.item_id}>
                <Td>
                  <UpdateItem selectedUpdateItem={item} />
                </Td>
                <Td>
                  <ItemDelete selectedDeleteItem={item} />
                </Td>
                <Td>{item.item_id}</Td>
                <Td>{calculateStockitemCount(stockItems, item)}</Td>
                <Td>{item.name}</Td>
                <Td>{item.size}</Td>
                <Td>{item.brand}</Td>
                <Td>{item.type}</Td>
                <Td>{item.plyrating}</Td>
                <Td>{item.country}</Td>
                <Td>{item.vale_type}</Td>
                <Td>{item.item_category}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === 1 ? true : false}
          onClick={() => {
            setFilterItemPageParams(
              getCutUrl(previousItemPageUrl, "items-pagination") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setError("");
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight="semibold">
          page {currentPageNum} of {numOfPages}
        </Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === numOfPages ? true : false}
          onClick={() => {
            setFilterItemPageParams(
              getCutUrl(nextItemPageUrl, "items-pagination") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setError("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ItemTable;
