import React, { useState } from "react";

import Capa from "../../Assets/capa_teste.jpg";

const BookDetail: React.FC = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    return (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <img className="w-full" alt="img of a girl posing" src={Capa} />
            </div>
            <div className="md:hidden">
                <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                    <img
                        alt="img-tag-one"
                        className="md:w-48 md:h-48 w-full"
                        src={Capa}
                    />
                </div>
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm leading-none text-gray-600">Hobbit</p>
                    <h1
                        className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
                    >
                        Hobbit: Desolação de Smaug
                    </h1>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">Ano</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600">
                            2021
                        </p>
                    </div>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">Autor</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600 mr-3">
                            J.R.R Tolkien
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
                        rounded-md
						hover:bg-gray-700
					"
                >
                    Comprar
                </button>
                <div>
                    <p className=" text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industrys
                        standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it
                        to make a type specimen book. It has survived not only
                        five centuries, but also the leap into electronic
                        typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more
                        recently with desktop publishing software like Aldus
                        PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p className="text-base leading-4 mt-7 text-gray-600">
                        Código do produto: 8BN321AF2IF0NYA
                    </p>

                    <p className="text-base leading-4 mt-4 text-gray-600">
                        Estudio: Lorem Ipsum
                    </p>
                    <p className="text-base leading-4 mt-4 text-gray-600">
                        Diretor: Lorem Ipsum
                    </p>
                    <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                        Autor: Lorem Ipsum
                    </p>
                </div>
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
                            Lorem Ipsum is simply dummy text of the printing and
                            Lorem Ipsum.
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
                                Dúvida sobre o livro?
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
                            Lorem Ipsum is simply dummy text of the printing and
                            Lorem Ipsum.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
