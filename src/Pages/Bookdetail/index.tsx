import { Transition } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Capa from "../../Assets/semcapa.png";
import Rating from "../../Components/Rating";
import { api } from "../../Services/api";
import { actions } from "../Redux/books";

const BookDetail: React.FC = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const { id } = useParams();

    const bookState = useSelector((state: any) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.detailBook({ id }));
    }, []);

    console.log(bookState);
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
                loading....
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
                I will appear and disappear.
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
                            bookState.description?.imageLinks?.thumbnail || Capa
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
                                Capa
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
                        Preview
                    </a>

                    <p className=" text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                        <Rating rating={bookState.description?.averageRating} />
                    </p>

                    <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                        Autor: {bookState.description?.authors}
                    </p>
                    <p className=" text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                        {bookState.description?.description}
                    </p>
                    <div>
                        <div className="border-t border-b py-4 mt-7 border-gray-200">
                            <div
                                onClick={() => setShow(!show)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <p className="text-base leading-4 text-gray-800">
                                    Formas de pagamento
                                </p>
                                <button
                                    type="button"
                                    className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                                    aria-label="show or hide"
                                />
                            </div>
                            <div
                                className={`pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ${
                                    show ? "block" : "hidden"
                                }`}
                                id="sect"
                            >
                                Lorem Ipsum is simply dummy text of the printing
                                and Lorem Ipsum.
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="border-b py-4 border-gray-200">
                            <div
                                onClick={() => setShow2(!show2)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <p className="text-base leading-4 text-gray-800">
                                    Dúvidas sobre o livro?
                                </p>
                                <button
                                    type="button"
                                    className="cursor-pointerfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                                    aria-label="show or hide"
                                />
                            </div>
                            <div
                                className={`pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ${
                                    show2 ? "block" : "hidden"
                                }`}
                                id="sect"
                            >
                                Lorem Ipsum is simply dummy text of the printing
                                and Lorem Ipsum.
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default BookDetail;
