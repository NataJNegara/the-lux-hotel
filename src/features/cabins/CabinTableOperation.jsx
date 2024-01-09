import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Name (A - Z)" },
          { value: "name-desc", label: "Name (Z - A)" },
          { value: "regularPrice-asc", label: "Lowest Price" },
          { value: "regularPrice-desc", label: "Highest Price" },
          { value: "maxCapacity-asc", label: "Lowest Capacity" },
          { value: "maxCapacity-desc", label: "Highest Capacity" },
          { value: "discount-asc", label: "Lowest Discount" },
          { value: "discount-desc", label: "Highest Discount" },
        ]}
      />
    </TableOperations>
  );
}
