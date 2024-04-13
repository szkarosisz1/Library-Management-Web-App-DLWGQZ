export type StatusType = 'szabad' | 'kikölcsönzött' | 'selejtezett' | 'egyéb';
export type StatusMemberType = 'aktív' | 'passzív' | 'egyéb';

export interface BookDTO {
    id: number;
    title: string;
    author: string;
    acquisitionDate: Date;
    serialNumber: string;
    status: string;
    borrows: BorrowDTO[];
}

export interface BorrowDTO {
    id: number;
    borrowDate: Date;
    returnDate: Date;
    member: MemberDTO | null;
    book: BookDTO | null;
    cassette: CassetteDTO | null;
    dvd: DVDDTO | null;
    delay: number;
}


export interface CassetteDTO {
    id: number;
    author: string;
    title: string;
    acquisitionDate: Date;
    serialNumber: string;
    status: string;
    borrows: BorrowDTO[];
}

export interface DVDDTO {
    id: number;
    author: string;
    title: string;
    acquisitionDate: Date;
    serialNumber: string;
    status: string;
    borrows: BorrowDTO[];
}

export interface MemberDTO {
    id: number;
    name: string;
    phoneNumber: string;
    idCardNumber: string;
    address: string; 
    status: string;
    borrows: BorrowDTO[];
}