"use client";

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { categories } from "../../constants/index";
import { IconType } from "react-icons";
import { useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation'
import { Suspense } from "react";

const Categories = () => {
  return (
    <>
      <Suspense>
        <CategoriesRender />
      </Suspense>
    </>
  )
};

const CategoriesRender = () => {
  const params = useSearchParams();
  const currentCategory = params.get("category")?.toString();
  const pathname = usePathname()
  // console.log(pathname)
  return (
    <>
      {pathname === '/' && (
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
      )}
    </>

  );
}

export default Categories;
