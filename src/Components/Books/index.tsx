import axios from "axios";
import React, { useState, useEffect, useContext, Fragment } from "react";
import { Form, Field } from "react-final-form";
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineMenu,
    AiOutlineClose,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import { api } from "../../Services/api";
import { products } from "./data";

function Books() {
    const toggleFavorite = (product: number) => {
        console.log(product);
    };

    // useEffect(() => {

    //         api.get(`https://www.googleapis.com/books/v1/volumes?q='${}&key=${keyID}`).then(data=>{
    //                       console.log(data);

    //         })

    // }, []);
    return (
        <div className="lg:col-span-3">
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div className="group">
                                <Link
                                    key={product.id}
                                    to={`/book-detail/${product.id}`}
                                >
                                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                        <img
                                            alt="a"
                                            src={product.imageSrc}
                                            className="w-full h-60 object-center object-cover  transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110"
                                        />
                                    </div>
                                </Link>

                                <div className="flex items-center justify-between  pt-4">
                                    <label className="cursor-pointer relative">
                                        <input
                                            name="favorite"
                                            type="checkbox"
                                            id="check-box"
                                            value={product.id}
                                            className="appearance-none h-7 w-7 border-2 rounded-full bg-red-50 border-none "
                                        />
                                        <AiOutlineHeart
                                            className={`text-8xl h-6 w-6 text-plastic-pink absolute left-0.5 top-0.5 text-opacity-100 transition `}
                                        />
                                        <AiFillHeart
                                            className={`text-8xl h-6 w-6 text-plastic-pink absolute left-0.5 top-0.5 text-opacity-0 check transition `}
                                        />
                                    </label>

                                    <div className="bg-gray-100 py-1.5 px-6 rounded-full">
                                        <p className="text-xs text-gray-500">
                                            Pago
                                        </p>
                                    </div>
                                </div>

                                <h3 className="mt-4 text-sm text-gray-700">
                                    {product.name}
                                </h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">
                                    {product.price}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Books;
