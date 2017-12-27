export interface Request {
    page: number;
    limit: number;
}

export interface LengthAwarePaginator {
    count: number;
    current_page: number;
    links: any;
    per_page: number;
    total: number;
    total_pages: number;
}

export interface Resource<T> {
    data: T;
}

export interface PagedResource<T> {
    data: Array<T>;
    meta: {
        pagination: LengthAwarePaginator;
    };
}

export interface Tag {
    slug: string;
    name: string;
    primary: boolean;
}

export interface TagItem extends Tag {
    posts_count: number;
    questions_count: number;
    followers_count: number;
    image: string;
    following: boolean | undefined;
}

export interface User {
    id: number;
    username: string;
    name: string;
    avatar: Array<string>;
}

export interface UserItem extends User {
    posts_count: number;
    questions_count: number;
    answers_count: number;
    followers_count: number;
    reputation: number;
}

export interface SocialAccount {
    service: string;
    url: string;
    public: boolean;
}

export interface Post {
    id: number;
    hash_id: string;
    user_id: string;
    title: string;
    locale_code: string;
    points: number;
    clipped: boolean;
    rated_value: number | null;
    promoted: boolean;
    promoted_at: string;
    trending: boolean;
    trend_at: string;
    title_slug: string;
    clips_count: number;
    views_count: number;
    comments_count: number;
    user: Resource<User>;
    tags: Resource<Array<Tag>>;
    created_at: string;
    updated_at: string;
    edited_at: string;
}

export interface PostFull extends Post {

}

export interface Series {

}

export interface SeriesFull extends Series {

}

export interface Question {

}

export interface QuestionFull {

}

export interface Answer {

}
