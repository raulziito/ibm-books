import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Capa from "../../Assets/capa_teste.jpg";
import Rating from "../../Components/Rating";
import { api } from "../../Services/api";

const BookDetail: React.FC = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [load, setLoad] = useState(false);
    const [detailbook, setDetailBook] = useState<AxiosResponse | null | any>(
        null
    );
    const params = useParams();
    const bookid = params.id;
    const keyID = "AIzaSyA4yCYQJ6my93smp5OsRivKxv8vArvg2d8";

    useEffect(() => {
        setLoad(true);
        api.get(
            `https://www.googleapis.com/books/v1/volumes/${bookid}?&key=${keyID}`
        ).then((data) => {
            setDetailBook(data?.data?.volumeInfo);
            console.log(data?.data);

            setLoad(false);
        });
    }, []);
    // console.log(detailbook);

    return (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            {load ? (
                <p> carregando...</p>
            ) : (
                <>
                    <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                        <img
                            className="w-full"
                            alt="Capa"
                            src={
                                detailbook?.imageLinks?.extraLarge ||
                                detailbook?.imageLinks?.thumbnail
                            }
                        />
                    </div>
                    <div className="md:hidden">
                        <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                            <img
                                alt="img-tag-one"
                                className="md:w-48 md:h-48 w-full"
                                src={
                                    detailbook?.imageLinks?.extraLarge ||
                                    detailbook?.imageLinks?.thumbnail ||
                                    Capa
                                }
                            />
                        </div>
                    </div>
                    <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                        <div className="border-b border-gray-200 pb-6">
                            <p className="text-sm leading-none text-gray-600">
                                {detailbook?.publisher}
                            </p>
                            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                                {detailbook?.title}
                            </h1>
                        </div>
                        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                            <p className="text-base leading-4 text-gray-800">
                                Data de publicação
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-sm leading-none text-gray-600">
                                    {detailbook?.publishedDate}
                                </p>
                            </div>
                        </div>
                        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                            <p className="text-base leading-4 text-gray-800">
                                Páginas
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-sm leading-none text-gray-600 mr-3">
                                    {detailbook?.pageCount}
                                </p>
                            </div>
                        </div>
                        <a
                            href={detailbook?.previewLink}
                            target="_blank"
                            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 rounded-md hover:bg-gray-700"
                            rel="noreferrer"
                        >
                            Preview
                        </a>

                        <p className=" text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                            <Rating rating={detailbook?.averageRating} />
                        </p>

                        <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                            Autor: {detailbook?.authors}
                        </p>
                        <p className=" text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                            {detailbook?.description}
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
                                    Lorem Ipsum is simply dummy text of the
                                    printing and Lorem Ipsum.
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
                                    Lorem Ipsum is simply dummy text of the
                                    printing and Lorem Ipsum.
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookDetail;
