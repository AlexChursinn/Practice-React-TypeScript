import React, { useState } from "react";
import { IProduct } from "../models";

/* Описываем параметры дл этого комопнента */
interface ProfuctProps {
  product: IProduct;
}

function Product(props: ProfuctProps) {
  /* Состоянии кнопки */
  const [details, setDetails] = useState(false);

  /* Меняем стили при нажатии кнопки */
  const btnBgClassName = details ? "bg-yellow-400" : "bg-blue-400";
  const btnClasses = ["py-2 px-4 border", btnBgClassName];

  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
      <img
        src={props.product.image}
        className="w-1/6"
        alt={props.product.title}
      />
      <p>{props.product.title}</p>
      <p className="font-bold">{props.product.price}</p>

      <button
        className={btnClasses.join(
          " "
        )} /* Массив не может быть приведет к строчке поэтому join который соединяет всё через пробел */
        /* 
				Можно отталкиваться от пердыдущего состояния
			
				*/
        onClick={() => setDetails((prev) => !prev)}
        /* onClick={() => setDetails(true)} */
      >
        {details ? "Hide Details" : "Show Details"}
      </button>

      {/*       <button
        className="py-2 px-4 border bg-blue-400"
        onClick={() => setDetails(false)}
      >
        Hide Details
      </button> */}

      {/* Если details true при клике на кнопку то покажем описание товара */}
      {details && (
        <div>
          <p> {props.product.description}</p>
          <p>
            Rate:{" "}
            <span style={{ fontWeight: "bold" }}>
              {props.product?.rating?.rate}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Product;
