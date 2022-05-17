import { HeartIcon as OutlinedHeart } from "@heroicons/react/outline";
import { HeartIcon as FillHeart } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import semcapa from "../../Assets/semcapa.png";
import { actions as actionPaginate } from "../../Redux/books";
import { actions } from "../../Redux/favorite";
import { IFavoriteObjects, IStores } from "../../Redux/types";
import Rating from "../Rating";

function Books(data: any) {
    const bookState = useSelector((state: IStores) => state.books);
    const favoriteState = useSelector((state: IStores) => state.favorite);
    const userState = useSelector((state: IStores) => state.user);

    const dispatch = useDispatch();

    function isIncluded(id: string) {
        const inside = favoriteState.favorite.filter(
            (i: IFavoriteObjects) => i.bookId === id
        );
        if (inside.length > 0) {
            return true;
        }
        return false;
    }
    function returnHeart(id: string, name: string) {
        if (!userState.id) {
            return (
                <button type="button" className="cursor-pointer relative">
                    <FillHeart className=" h-6 w-6 text-gray-400  left-0.5 top-0.5 check transition " />
                </button>
            );
        }
        if (userState.id && isIncluded(id)) {
            return (
                <button
                    onClick={() => {
                        dispatch(
                            actions.deleteFav({
                                id: favoriteState.favorite.filter(
                                    (i: IFavoriteObjects) => i.bookId === id
                                )[0].id,
                            })
                        );
                    }}
                    type="button"
                    className="cursor-pointer relative"
                >
                    <FillHeart className="h-6 w-6 text-pink-600 hover:text-pink-700  hover:scale-110 duration-200  " />
                </button>
            );
        }
        if (userState && !isIncluded(id)) {
            return (
                <button
                    onClick={() => {
                        dispatch(
                            actions.postFav({
                                bookName: name,
                                user: userState.id,
                                bookId: id,
                            })
                        );
                    }}
                    type="button"
                    className="cursor-pointer relative"
                >
                    <OutlinedHeart className="h-6 w-6 text-pink-600 hover:text-pink-700  hover:scale-110 duration-200" />
                </button>
            );
        }
        return null;
    }
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="lg:col-span-3">
            <div className="bg-white">
                {/* paginacao aqui? */}
                <div className="max-w-2xl mx-auto  px-4  sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-start">
                        <span className=" flex-1 font-semibold mb-2">
                            {bookState.total} Resultado(s)
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-4">
                        {bookState.data.map((product: any) => {
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
                                                    product?.volumeInfo
                                                        ?.imageLinks
                                                        ?.thumbnail || semcapa
                                                }
                                                className="w-full h-60 object-center object-cover  transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110"
                                            />
                                        </div>
                                    </Link>

                                    <div className="flex items-center justify-between  pt-4">
                                        {returnHeart(
                                            product.id,
                                            product?.volumeInfo?.title
                                        )}
                                        <div className="bg-gray-100 py-1.5 px-6 rounded-full text-xs text-gray-500 text-ellipsis truncate">
                                            {product?.volumeInfo?.categories ||
                                                "Sem descrição"}
                                        </div>
                                    </div>

                                    <h3 className="mt-1 text-lg font-medium text-gray-900 text-ellipsis truncate">
                                        {product?.volumeInfo?.title}
                                    </h3>
                                    <Rating
                                        rating={
                                            product?.volumeInfo?.averageRating
                                        }
                                    />
                                    <p className="mt-4 text-sm text-gray-700 font-light">
                                        {product?.volumeInfo.authors ||
                                            "Sem informação"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            hidden={
                                bookState.current_page * bookState.per_page >=
                                bookState.total
                            }
                            className="bg-gray-800 rounded p-3 text-white transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-120 hover:bg-gray-700"
                            onClick={() => {
                                dispatch(
                                    actionPaginate.paginate({ paginate: "UP" })
                                );
                            }}
                        >
                            Descobrir mais
                        </button>
                    </div>
                    <button
                        onClick={() => scrollTop()}
                        type="button"
                        className="fixed  bottom-14 bg-gray-500 rounded-full p-3 w-12 h-12 z-30 text-white  right-14 hover:bg-gray-700 transition duration-150 ease-in-out focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Books;
