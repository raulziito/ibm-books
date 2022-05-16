export interface IFavoriteObjects {
    id: number;
    user: number;
    bookId: string;
    bookName: string;
}

export interface IFavoriteState {
    favorite: Array<IFavoriteObjects>;
    loading: boolean;
    error: boolean;
}

export interface IBookState {
    data: Array<Record<string, unknown>>;
    total: number;
    current_page: number;
    per_page: number;
    keyword: string;
    description: Record<string, unknown>;
    loading: boolean;
    error: boolean;
}

export interface IStores {
    books: IBookState;
    favorite: IFavoriteState;
    user: IProfileUser;
}

export interface IProfileUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    name: string;
}
