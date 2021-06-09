export interface User{
    googleId?: string;  // ?는 입력없을경우 default값(없어도 허용)
    kakaoId?: string;
    naverId?: string;
    username : string;
    userId : number;
    __v: number;
    _id: string;
    likeItemIds : Array<number>;
}
