"use client";

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { categories } from "../../constants/index";
import { IconType } from "react-icons";
import { useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const currentCategory = params.get("category")?.toString();
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            // description={item.description}
            selected={currentCategory === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
