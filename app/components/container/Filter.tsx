"use client";
import React, { useState, useEffect } from "react";
import { BsSliders2Vertical, BsChevronUp } from "react-icons/bs";
import axios from "axios";

type Props = {};

const Filter = (props: Props) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [allHexValues, setHexValues] = useState<string[]>([]);

  const [price, setPrice] = useState({
    min: 0,
    max: 10,
  });

  const handelMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "min" ? parseInt(e.target.value) : e.target.value;
    setPrice({
      ...price,
      [e.target.name]: value,
    });
  };

  const handlMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "max" ? parseInt(e.target.value) : e.target.value;
    setPrice({
      ...price,
      [e.target.name]: value,
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  useEffect(() => {
    // getAllColors().then((allColors) => {
    //   if (allColors) {
    //     const hextSet = new Set<string>();
    //     allColors.forEach((element: any) => {
    //       const colors = element.color.split(",");
    //       colors.forEach((color: string) => {
    //         const hextValue = color.replace("#", "");
    //         hextSet.add(hextValue);
    //       });
    //     });
    //     const uniqueHexValues: string[] = Array.from(hextSet);
    //     setHexValues(uniqueHexValues);
    //   }
    // });
  }, []);

  useEffect(() => {
    axios
      .get("/api/filterproduct", {
        params: {
          categories: selectedCategories,
          price: {
            min: price.min,
            max: price.max,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  });

  return (
    <div className="relative">
      <div
        className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px] ${
          showFilter ? "max-md:w-[250px]" : "w-0 max-md:invisible"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px]">
          <h1 className="text-neutral-800">Categories</h1>
          <BsSliders2Vertical size={20} className="text-neutral-600" />
        </div>
        <div className="flex flex-col py-3 pb-5 tet-sm text-neutral-600 border-b-[0.5px]">
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Accessories") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("Accessories")}
          >
            Accessories
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Gift sets") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("Gift sets")}
          >
            Gift sets
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Incense cones") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("Incense cones")}
          >
            Incense cones
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Diffuser") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("Diffuser")}
          >
            Diffuser
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Frankincense") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("Frankincense")}
          >
            Frankincense
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Essential oil") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("Essential oil")}
          >
            Essential oil
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Incense burners")
                ? "bg-purple-50"
                : ""
            }`}
            onClick={() => toggleCategory("Incense burners")}
          >
            Incense burners
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("Other") ? "bg-purple-50" : ""
            }`}
            onClick={() => toggleCategory("Other")}
          >
            Other
          </span>
        </div>
        <div className="border-b-[0.5px] pb-10">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">Prices</h1>
            <BsChevronUp size={18} className="text-neutral-600" />
          </div>
          <div className="grid grid-cols-2 gap-5 px-5 overflow-hidden">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="" className="text-[15px] opacity-75">
                Min
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">$</span>
                <input
                  className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                  type="number"
                  name="min"
                  onChange={handelMinChange}
                  value={price.min}
                  id=""
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="" className="text-[15px] opacity-75">
                Max
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">$</span>
                <input
                  className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                  type="number"
                  name="max"
                  onChange={handlMaxChange}
                  value={price.max}
                  id=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="border-b-[0.5px]">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">Colors</h1>
          </div>
          <ul className="grid grid-cols-4 px-5 gap-5 mb-4">
            {allHexValue.map((hexvalue, index) => (
              <li
                key={index}
                className={`w-[40px] h-[40px] rounded-2xl border-[0.5px] border-neutral-300 cursor-pointer ${
                  selectedHexValues.includes(`#${hexvalue}`)
                    ? "shadow-2xl opacity-25"
                    : ""
                }`}
                style={{ backgroundColor: `#${hexvalue}` }}
                onClick={() => toggleColor(`#${hexvalue}`)}
              ></li>
            ))}
          </ul>
        </div>
        <div className="sizes">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">sizes</h1>
          </div>
          <ul className="grid grid-cols-4 px-5 gap-5">
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("SM") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => togglesize("SM")}
            >
              SM
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("MD") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => togglesize("MD")}
            >
              MD
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("XL") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => togglesize("XL")}
            >
              XL
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("2XL") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => togglesize("2XL")}
            >
              2XL
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("3XL") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => togglesize("3XL")}
            >
              3XL
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("4XL") ? "bg-neutral-900 text-white" : ""
              }`}
              onClick={() => togglesize("2XL")}
            >
              4XL
            </li>
          </ul>
        </div> */}
      </div>
      <div
        onClick={() => setShowFilter(!showFilter)}
        className="absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer"
      >
        Filters
      </div>
    </div>
  );
};

export default Filter;