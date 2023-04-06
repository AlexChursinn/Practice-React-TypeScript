import { useState, useContext } from "react";
import CreateProduct from "../components/CreateProduct";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Product from "../components/Product";
/* Забираем значения из useProducts кастомного хука */
import { useProducts } from "../hooks/products";
import { IProduct } from "../models";
import { ModalContext } from "../context/ModalContext";

function ProductsPage() {
  /* Забираем значения из useProducts кастомного хука */
  const { products, error, loading, addProduct } = useProducts();

  /* State который отвечает за видимость модального окна */
  /*   const [modal, setModal] = useState(false); */

  /* Получаем Контекст  и забираем данные которые нам нужны*/
  const { modal, open, close } = useContext(ModalContext);

  /* Создаем продукт закрываем модальное окно и запуливаем новый продукт */
  const createHandler = (product: IProduct) => {
    /*  setModal(false); */
    close();
    addProduct(product);
  };

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {/* Показываем loading если в true */}
      {loading && <Loader />}

      {/* Если есть ошибка */}
      {error && <ErrorMessage error={error} />}

      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}

      {/* Передем в чистую модалку компонент который хотим 
      Если modal true то покажем модальное окно
      */}
      {modal && (
        /* При клике в пространство закрываем модальное окно  onClose={() => setModal(false) */
        <Modal
          title="Create new product"
          onClose={close /* () => setModal(false) */}
        >
          {/* Когда продукт был создан в модальном окне оно закроется */}
          <CreateProduct onCreate={createHandler} />
        </Modal>
      )}

      {/* Кнопка чтобы показать модальное окно */}
      <button
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
        onClick={open /* () => setModal(true) */}
      >
        +
      </button>

      {/*    <Product product={products[0]} />
      <Product product={products[1]} /> */}
    </div>
  );
}

export default ProductsPage;
