/* eslint-disable react/jsx-props-no-spreading */
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import { ExternalLinkIcon, XIcon } from "@heroicons/react/solid";
import { gapi } from "gapi-script";
import React, { Fragment, useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../../Assets/logo.png";
import { api } from "../../Microservice/api";
import { actions } from "../../Redux/user";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState<{
        id: string;
        name: string;
        email: string;
    }>();
    const userState = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    useEffect(() => {
        if (userState.id) {
            setIsOpen(false);
        }
    });

    const clientId =
        "800255309224-te5imahr4d5q2nmjl3mbu7icssne7eb5.apps.googleusercontent.com";

    const onFailure = (response: any) => {
        console.log(response);
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        if (!userState.id) {
            setIsOpen(true);
        }
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId,
                scope: "",
            });
        }
        gapi.load("client:auth2", start);
    }, []);

    const onSubmit = async (values: any) => {
        api.get(`users?email=${values.email}`)
            .then((response: any) => {
                setProfile(response.data[0]);
                closeModal();
            })
            .catch((err) => {
                return console.log(err);
            });
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Botão mobile (pensar no que fazer) */}
                            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                {open ? (
                                    <AiOutlineClose
                                        className="block h-6 w-6"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <AiOutlineMenu
                                        className="block h-6 w-6"
                                        aria-hidden="true"
                                    />
                                )}
                            </Disclosure.Button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <a href="/">
                                    <img
                                        alt="ibm"
                                        className="block lg:hidden h-8 w-auto"
                                        src={Logo}
                                    />
                                </a>
                                <a href="/">
                                    <img
                                        className="hidden lg:block h-8 w-auto"
                                        src={Logo}
                                        alt="Workflow"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Dropdown do perfil */}
                            <Menu
                                as="div"
                                className="ml-3 relative flex items-center"
                            >
                                <FaRegUserCircle className="text-white mr-2" />

                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="flex text-sm rounded-full focus:outline-none  text-white"
                                >
                                    {userState.id
                                        ? userState.name
                                        : "Seu perfil"}
                                </button>
                                <div className="w-2" />
                                {profile?.id && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProfile({
                                                id: "",
                                                name: "",
                                                email: "",
                                            });
                                        }}
                                        className="flex text-sm rounded-full focus:outline-none  text-white"
                                    >
                                        <ExternalLinkIcon className="w-5" />
                                    </button>
                                )}
                                {userState.id && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            dispatch(actions.removeUser({}));
                                        }}
                                        className="flex text-sm rounded-full focus:outline-none  text-white"
                                    >
                                        <ExternalLinkIcon className="w-5" />
                                    </button>
                                )}
                                <Transition appear show={isOpen} as={Fragment}>
                                    <Dialog
                                        className="relative z-10"
                                        onClose={closeModal}
                                    >
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                                        </Transition.Child>

                                        <div className="fixed inset-0 overflow-y-auto">
                                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel className="w-full relative max-w-md transform overflow-hidden rounded-2xl bg-white p-8  text-left align-middle shadow-xl transition-all">
                                                        <div>
                                                            <button
                                                                onClick={
                                                                    closeModal
                                                                }
                                                                type="button"
                                                                className=" absolute top-4 right-4 flex justify-end hover:text-gray-400 text-gray-600"
                                                            >
                                                                <XIcon className="w-6" />
                                                            </button>

                                                            <div className="flex flex-col items-stretch">
                                                                <span className="text-sm text-gray-900">
                                                                    Bem-vindo de
                                                                    volta!
                                                                </span>
                                                                <h1 className="text-2xl font-bold">
                                                                    Entre na sua
                                                                    conta
                                                                </h1>
                                                            </div>
                                                            <form
                                                                onSubmit={handleSubmit(
                                                                    onSubmit
                                                                )}
                                                            >
                                                                <div className="mt-5">
                                                                    <label className="font-semibold block text-md px-1 text-xs py-2 ">
                                                                        Login
                                                                    </label>
                                                                    <input
                                                                        {...register(
                                                                            "email",
                                                                            {
                                                                                required:
                                                                                    true,
                                                                            }
                                                                        )}
                                                                        className="px-4 w-full border-2 py-2 focus:border-gray-700 duration-200 rounded-md text-sm outline-none"
                                                                        type="email"
                                                                        placeholder="E-mail"
                                                                    />
                                                                    <span className="text-red-600 text-sm px-2 font-light">
                                                                        {errors
                                                                            .email
                                                                            ?.type ===
                                                                            "required" &&
                                                                            "Campo obrigatório."}
                                                                    </span>
                                                                </div>
                                                                <div className="my-3">
                                                                    <label className="font-semibold block text-md px-1 text-xs py-2 ">
                                                                        Senha
                                                                    </label>
                                                                    <input
                                                                        {...register(
                                                                            "password",
                                                                            {
                                                                                required:
                                                                                    true,
                                                                            }
                                                                        )}
                                                                        className="px-4 w-full border-2 focus:border-gray-700 duration-200 py-2 rounded-md text-sm outline-none"
                                                                        type="password"
                                                                        placeholder="Senha"
                                                                    />
                                                                    <span className="text-red-600 text-sm px-2 font-light">
                                                                        {errors
                                                                            .password
                                                                            ?.type ===
                                                                            "required" &&
                                                                            "Campo obrigatório."}
                                                                    </span>
                                                                </div>

                                                                <div className="flex justify-between">
                                                                    <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                                                                        Esqueceu
                                                                        a senha?
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    type="submit"
                                                                    className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 active:bg-green-600  border-b-4 border-green-700 active:border-b-0 active:border-green-800 rounded-md transition duration-200"
                                                                >
                                                                    ENTRAR
                                                                </button>
                                                            </form>
                                                            <div className="flex flex-col items-stretch">
                                                                <GoogleLogin
                                                                    clientId={
                                                                        clientId
                                                                    }
                                                                    buttonText="Ou entre pela sua conta Google"
                                                                    onSuccess={(
                                                                        e: any
                                                                    ) => {
                                                                        dispatch(
                                                                            actions.setUser(
                                                                                e.profileObj
                                                                            )
                                                                        );
                                                                    }}
                                                                    onFailure={
                                                                        onFailure
                                                                    }
                                                                    cookiePolicy="single_host_origin"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    );
}

export default Header;
