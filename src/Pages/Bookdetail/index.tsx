import { Transition } from "@headlessui/react";
import { FilterIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import capa from "../../Assets/semcapa.png";
import Rating from "../../Components/Rating";
import { api } from "../../Microservice/api";
import { actions } from "../../Redux/books";

const BookDetail: React.FC = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [books, setBooks] = useState<Array<object | unknown>>([]);
    const { id } = useParams();
    const bookState = useSelector((state: any) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.detailBook({ id }));
    }, []);

    useEffect(() => {
        api.get(
            `https://www.googleapis.com/books/v1/volumes?q='${"Eiichiro"}&key=${
                process.env.REACT_APP_GOOGLE_KEY
            }&maxResults=4`
        )
            .then((response: any) => {
                setBooks(response.data.items);
            })
            .catch((err) => {
                return console.log(err);
            });
    }, []);

    return (
        <>
            <Transition
                appear
                enter="transition-opacity duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-1000"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={bookState.loading}
            >
                Carregando....
            </Transition>

            <Transition
                enter="transition-opacity duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-1000"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={bookState.error}
            >
                Carregando...
            </Transition>

            <Transition
                enter="transition-opacity duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4"
                show={!bookState.loading && !bookState.error}
            >
                <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                    <img
                        className="w-full"
                        alt="Capa"
                        src={
                            bookState.description?.imageLinks?.thumbnail || capa
                        }
                    />
                </div>
                <div className="md:hidden">
                    <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                        <img
                            alt="img-tag-one"
                            className="md:w-48 md:h-48 w-full"
                            src={
                                bookState.description?.imageLinks?.thumbnail ||
                                capa
                            }
                        />
                    </div>
                </div>
                <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                    <div className="border-b border-gray-200 pb-6">
                        <p className="text-sm leading-none text-gray-600">
                            {bookState.description?.publisher}
                        </p>
                        <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                            {bookState.description?.title}
                        </h1>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800">
                            Publicado em:
                        </p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600">
                                {bookState.description?.publishedDate}
                            </p>
                        </div>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800">
                            Páginas
                        </p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600 mr-3">
                                {bookState.description?.pageCount}
                            </p>
                        </div>
                    </div>
                    <a
                        href={bookState.description?.previewLink}
                        target="_blank"
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 rounded-md hover:bg-gray-700"
                        rel="noreferrer"
                    >
                        Detalhar
                    </a>

                    <p className=" text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                        <Rating rating={bookState.description?.averageRating} />
                    </p>

                    <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                        <span className="font-medium text-gray-900">
                            Autor:
                        </span>
                        {bookState.description?.authors}
                    </p>

                    <div>
                        <div className="border-t border-b py-4 mt-7 border-gray-200">
                            <div
                                onClick={() => setShow(!show)}
                                className=" bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500 cursor-pointer"
                            >
                                <p className="flex items-center font-medium text-gray-900 ">
                                    Descrição
                                </p>
                                <p className="ml-6 flex items-center">
                                    {show ? (
                                        <MinusSmIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <PlusSmIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    )}
                                </p>
                            </div>
                            <div
                                className={`pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ${
                                    show ? "block" : "hidden"
                                }`}
                                id="sect"
                            >
                                {bookState.description?.description}
                            </div>
                        </div>
                    </div>

                    <div className="border-b py-4 border-gray-200">
                        <div
                            onClick={() => setShow2(!show2)}
                            className="bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500 cursor-pointer"
                        >
                            <p className="flex items-center font-medium text-gray-900 ">
                                Dúvidas sobre o livro?
                            </p>
                            <p className="ml-6 flex items-center">
                                {show2 ? (
                                    <MinusSmIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <PlusSmIcon
                                        className="h-5 w-5 "
                                        aria-hidden="true"
                                    />
                                )}
                            </p>
                        </div>
                        <div
                            className={`pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ${
                                show2 ? "block" : "hidden"
                            }`}
                            id="sect"
                        >
                            Alguma coisa
                        </div>
                    </div>
                </div>
            </Transition>
            <h1 className="text-2xl flex-1 font-extrabold tracking-tight text-gray-900">
                Livro(s) relacionado(s)
            </h1>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-4">
                {books.map((product: any) => {
                    return (
                        <div className="group">
                            <Link
                                key={product.id}
                                to={{
                                    pathname: `/book-detail/${product.id}`,
                                }}
                            >
                                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        alt="Capa"
                                        src={
                                            product?.volumeInfo?.imageLinks
                                                ?.thumbnail || capa
                                        }
                                        className="w-full h-60 object-center object-cover  transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110"
                                    />
                                </div>
                            </Link>

                            <div className="flex items-center justify-between  pt-4">
                                <div className="bg-gray-100 py-1.5 px-6 rounded-full text-xs text-gray-500 text-ellipsis truncate">
                                    {product?.volumeInfo?.categories ||
                                        "Sem descrição"}
                                </div>
                            </div>

                            <h3 className="mt-1 text-lg font-medium text-gray-900 text-ellipsis truncate">
                                {product?.volumeInfo?.title}
                            </h3>
                            <Rating
                                rating={product?.volumeInfo?.averageRating}
                            />
                            <p className="mt-4 text-sm text-gray-700 font-light">
                                {product?.volumeInfo.authors ||
                                    "Sem informação"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default BookDetail;
