import { useState } from "react";
import { IProduct } from "../models";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

const productData: IProduct = {
  title: "test product",
  price: 13.5,
  description: "lorem ipsum set",
  image: "https://i.pravatar.cc",
  category: "electronic",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

/* Функция которая закроет моадлку после отправки продукта а также она будет получать этот прдукт */
interface CreateProductProps {
  onCreate: (
    product: IProduct
  ) => void /* Функция которая ничего не возвращает */;
}

function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    /* Чистим ошибку */
    setError("");

    /* Если value пустой */
    if (value.trim().length === 0) {
      setError("Please enter valid title.");
      return;
    }

    productData.title = value;

    /* Но value может быть пустым */

    /* Постим productData */
    const response = await axios.post<IProduct>(
      "https://fakestoreapi.com/products",
      productData
    );

    /* Если запрос был успешен то закрываем модалку и передаем данные отправленные */
    onCreate(response.data);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        value={value}
        onChange={changeHandler}
      />

      {/* Если ошибка value пустой то */}
      {error && <ErrorMessage error={error} />}

      <button
        type="submit"
        className="py-2 px-4 border bg-yellow-400 hover:text-white"
      >
        Create
      </button>
    </form>
  );
}

export default CreateProduct;
