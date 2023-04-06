/* Вынесли логику в отдельный комопнент */

import axios from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "../models";

/* Собственный хук */
export function useProducts() {
  /* Когда загружается страница данных ещё нет */
  const [products, setProducts] = useState<IProduct[]>([]);
  /* State для индикации загрузки */
  const [loading, setLoading] = useState(false);
  /* State для индикации ошибки */
  const [error, setError] = useState("");

  /* Функция которая будет добавлять созлданный продукт 
	Берем предыдущий массив и в конец добавляем новый продукт
	*/
  function addProduct(product: IProduct) {
    setProducts((prev) => [...prev, product]);
  }

  /* Чтобы делать запрос создадим отдельную асинхронную функцию 
		Ожидаем как дженерик <IProduct[]>
		*/
  async function fetchProducts() {
    try {
      /* Если заново начали делать загрузку данных то можем очистить эту ошибку */
      setError("");
      setLoading(true);
      const response = axios.get<IProduct[]>(
        "https://fakestoreapi.com/products?limit=5"
      );
      /* Как данные загрузятся запулим их в массив */
      setProducts((await response).data);
      setLoading(false);
    } catch (e: any) {
      const error = e;
      setLoading(false);
      setError(error.message);
    }
  }

  /* Когда пустой массив то useEffect вызовится только один раз
		Когда React компонент готов к работе */
  useEffect(() => {
    /* Вызываем нашу функцию с зарпосом за товарами */
    fetchProducts();
  }, []);

  /* То что нужно вернуть */
  return { products, error, loading, addProduct };
}
