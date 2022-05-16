import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import {
    ChevronDownIcon,
    ChevronRightIcon,
    FilterIcon,
    MinusSmIcon,
    PlusSmIcon,
    ViewGridIcon,
} from "@heroicons/react/solid";
import axios, { AxiosResponse } from "axios";
import React, { useState, Fragment, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Books from "../../Components/Books";
import { api } from "../../Services/api";
import { actions } from "../Redux/books";
import { actions as actionsFav } from "../Redux/favorite";
import { IStores, IFavoriteObjects } from "../Redux/types";

const sortOptions = [
    { name: "Mais popular", href: "#", current: true },
    { name: "Melhor avaliação", href: "#", current: false },
    { name: "Novos", href: "#", current: false },
    { name: "Preço: Menor para maior", href: "#", current: false },
    { name: "Price: Maior para menor", href: "#", current: false },
];

const subCategories = [{ name: "Meus favoritos", href: "#" }];

const Dashboard: React.FC = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
    }

    const favoriteState = useSelector((state: IStores) => state.favorite);
    const bookState = useSelector((state: IStores) => state.books);
    const userState = useSelector((state: IStores) => state.user);
    const dispatch = useDispatch();

    const filters = [
        {
            id: "author",
            name: "Autores mais famosos",
            options: [
                {
                    value: "Eiichiro Oda",
                    label: "Eiichiro Oda",
                    checked: false,
                },
                {
                    value: "J. K. RowlingLia Wyler",
                    label: "J. K. RowlingLia Wyler",
                    checked: false,
                },
                {
                    value: "George R. R. Martin",
                    label: "George R. R. Martin",
                    checked: false,
                },
                {
                    value: "J.R.R. Tolkien",
                    label: "J.R.R. Tolkien",
                    checked: false,
                },
            ],
        },
        {
            id: "category",
            name: "Categorias",
            options: [
                { value: "Computers", label: "Tecnologia", checked: false },
                { value: "Drama", label: "Drama", checked: false },
                { value: "Fiction", label: "Ficção", checked: false },
                { value: "Science", label: "Ciência", checked: false },
            ],
        },
    ];

    useEffect(() => {
        if (bookState.data.length === 0) {
            dispatch(actions.getBook({ keyword: "bem vindo" }));
        }
    }, []);

    useEffect(() => {
        if (userState.id) {
            console.log("sdsdsdsds");
            dispatch(actionsFav.getFav(userState.id));
        }
    }, [userState]);

    function handleFindBook(e: any) {
        e.preventDefault();
        dispatch(actions.getBook({ keyword: bookState.keyword }));
    }

    function handleFindBookCheck(e: any) {
        console.log(e);
        dispatch(
            actions.setFilter({
                keyword: e,
            })
        );
        dispatch(actions.getBook({ keyword: e }));
    }
    return (
        <div className="bg-white">
            <div>
                {/* FILTRO MOBILE */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex z-40">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                                    <div className="px-4 flex items-center justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filtros
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                            onClick={() =>
                                                setMobileFiltersOpen(false)
                                            }
                                        >
                                            <AiOutlineClose
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <h3 className="sr-only">Categories</h3>

                                    <Disclosure
                                        as="div"
                                        key="meusfavoritos"
                                        className="border-t border-gray-200 border-b-0 px-2 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="px-2 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                    <p className="flex items-center font-medium text-gray-900">
                                                        <AiFillHeart className="text-plastic-pink mr-2" />
                                                        Meus Favoritos
                                                    </p>
                                                    <p className="ml-6 flex items-center">
                                                        {open ? (
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
                                                </Disclosure.Button>

                                                <Disclosure.Panel className="">
                                                    <div className="p-4 ">
                                                        {favoriteState.favorite.map(
                                                            (
                                                                item: IFavoriteObjects
                                                            ) => (
                                                                <Link
                                                                    className="flex hover:bg-gray-100 duration-200 p-2"
                                                                    key={
                                                                        item.bookId
                                                                    }
                                                                    to={{
                                                                        pathname: `/book-detail/${item.bookId}`,
                                                                    }}
                                                                >
                                                                    <p className="px-10 flex items-center justify-center ">
                                                                        {
                                                                            item.bookName
                                                                        }
                                                                    </p>
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    {/* Filters */}
                                    <form className="border-t border-gray-200">
                                        {filters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">
                                                                    {
                                                                        section.name
                                                                    }
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
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
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map(
                                                                    (
                                                                        option,
                                                                        optionIdx
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                option.value
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                value={
                                                                                    option.value
                                                                                }
                                                                                type="checkbox"
                                                                                defaultChecked={
                                                                                    option.checked
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleFindBookCheck(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                            >
                                                                                {
                                                                                    option.label
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="relative z-10 flex flex-col md:flex-row items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                    <h1 className="text-4xl flex-1 font-extrabold tracking-tight text-gray-900">
                        IBM Books
                    </h1>
                    <div className="h-2 md:h-0" />
                    <div className="flex flex-wrap">
                        <div className="flex items-center justify-center">
                            <div className="flex shrink border-2 rounded">
                                <input
                                    type="text"
                                    value={bookState.keyword}
                                    className="px-4 py-2 shrink outline-none"
                                    onChange={(e) =>
                                        dispatch(
                                            actions.setFilter({
                                                keyword: e.target.value,
                                            })
                                        )
                                    }
                                    placeholder="Pesquisar..."
                                />
                                <button
                                    type="button"
                                    onClick={handleFindBook}
                                    className="flex items-center justify-center px-4 border-l"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-600"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="p-2 pl-6 flex-1 flex justify-center items-center text-gray-400 hover:text-gray-500 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <FilterIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>

                <section
                    aria-labelledby="products-heading"
                    className="pt-6 pb-24"
                >
                    <h2 id="products-heading" className="sr-only">
                        Produtos
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                        {/* Filtros */}
                        <form className="hidden lg:block">
                            <h3 className="sr-only">Categorias</h3>
                            <ul className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                                {subCategories.map((category) => (
                                    <li key={category.name}>
                                        <a
                                            href={category.href}
                                            className="flex items-center"
                                        >
                                            {" "}
                                            <AiFillHeart className="text-plastic-pink mr-2" />
                                            {category.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {filters.map((section) => (
                                <Disclosure
                                    as="div"
                                    key={section.id}
                                    className="border-b border-gray-200 py-6"
                                >
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">
                                                        {section.name}
                                                    </span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
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
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.options.map(
                                                        (option, optionIdx) => (
                                                            <div
                                                                key={
                                                                    option.value
                                                                }
                                                                className="flex items-center"
                                                            >
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    value={
                                                                        option.value
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleFindBookCheck(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="checkbox"
                                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </form>
                        {/* Grid dos produtos */}
                        <Books
                            data={bookState.data}
                            totalResults={bookState.total}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
