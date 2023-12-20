"use client";
import React, { useContext } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import useLoginModel from "../hook/useLoginModal";
import { CounterContext } from "../context/counter.context";

type Props = {
  productId?: number;
};

const AddCart = ({ productId }: Props) => {
  const { data: session } = useSession();
  // const { state, dispatch } = useContext(CounterContext);
  // console.log(state.cartproducts);
  const id = session?.user.id;
  const router = useRouter();
  const loginModel = useLoginModel();
  const handleCart = async () => {
    if (session?.user) {
      try {
        const response = await axios
          .post("/api/cart", {
            productId: productId,
            userId: id,
          })
          .then((response) => {
            // router.push("/cart");

            console.log(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      loginModel.onOpen();
    }
  };
  return (
    <div
      onClick={handleCart}
      className="flex items-center space-x-4 bg-amber-400 text-gray-100 p-2 rounded-full cursor-pointer hover:bg-amber-500"
    >
      <span>
        <MdOutlineAddShoppingCart size={20} />
      </span>
    </div>
  );
};

export default AddCart;
