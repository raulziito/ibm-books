import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import {
    ChevronDownIcon,
    FilterIcon,
    MinusSmIcon,
    PlusSmIcon,
    ViewGridIcon,
} from "@heroicons/react/solid";
import axios, { AxiosResponse } from "axios";
import React, { useState, Fragment, useEffect } from "react";
import { Form, Field } from "react-final-form";
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineMenu,
    AiOutlineClose,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import Books from "../../Components/Books";
import { api } from "../../Services/api";
import { getFav } from "../Redux/store";

const sortOptions = [
    { name: "Mais popular", href: "#", current: true },
    { name: "Melhor avaliação", href: "#", current: false },
    { name: "Novos", href: "#", current: false },
    { name: "Preço: Menor para maior", href: "#", current: false },
    { name: "Price: Maior para menor", href: "#", current: false },
];

const subCategories = [{ name: "Meus favoritos", href: "#" }];

const filters = [
    {
        id: "author",
        name: "Autores mais famosos",
        options: [
            { value: "1", label: "Lorem Ipsum", checked: false },
            { value: "2", label: "Lorem Ipsum", checked: false },
            { value: "3", label: "Lorem Ipsum", checked: true },
            { value: "4", label: "Lorem Ipsum", checked: false },
            { value: "5", label: "Lorem Ipsum", checked: false },
            { value: "6", label: "Lorem Ipsum", checked: false },
        ],
    },
    {
        id: "category",
        name: "Categorias",
        options: [
            { value: "1", label: "Romance", checked: false },
            { value: "2", label: "Ação", checked: false },
            { value: "3", label: "Drama", checked: true },
            { value: "4", label: "Terror", checked: false },
            { value: "5", label: "Mangás", checked: false },
        ],
    },
];

const Dashboard: React.FC = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [books, setBooks] = useState<AxiosResponse | null | void>(null);
    const keyID = "AIzaSyA4yCYQJ6my93smp5OsRivKxv8vArvg2d8";
    const dispatch = useDispatch();
    const favoriteState = useSelector((state: any) => state.favorite);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
    }

    async function onSubmit(values: any) {
        const response = await api.get(
            `https://www.googleapis.com/books/v1/volumes?q='${values}&key=${keyID}`
        );
        setBooks(response);
    }
    useEffect(() => {
        dispatch(getFav(10));
    }, []);

    useEffect(() => {
        console.log("Ivys Gordo Ignorado pela Milfkkk", favoriteState);
    }, [favoriteState]);

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

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul className="font-medium text-gray-900 px-2 py-3">
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <a
                                                        href={category.href}
                                                        className="px-2 py-3 flex items-center"
                                                    >
                                                        <AiFillHeart className="text-plastic-pink mr-2" />{" "}
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>

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
                                                                                defaultValue={
                                                                                    option.value
                                                                                }
                                                                                type="checkbox"
                                                                                defaultChecked={
                                                                                    option.checked
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

                <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        Livros
                    </h1>

                    <div className="flex items-center">
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <input
                                name="livro"
                                type="text"
                                className="text-gray-800 leading-4 p-2 w-full focus:outline-none text-white placeholder-gray-300 rounded-md mr-2 border border-gray-300"
                                placeholder="Pesquisar"
                            />
                            <button type="submit">Botao</button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            option.current
                                                                ? "font-medium text-gray-900"
                                                                : "text-gray-500",
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm"
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <button
                            type="button"
                            className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Ver a grid</span>
                            <ViewGridIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            type="button"
                            className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filtros</span>
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
                                                                    defaultValue={
                                                                        option.value
                                                                    }
                                                                    type="checkbox"
                                                                    defaultChecked={
                                                                        option.checked
                                                                    }
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
                        {/* <Books data={books} /> */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
