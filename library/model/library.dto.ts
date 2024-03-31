export interface BookDTO {
    id: number;
    title: string;
    author: string;
    acquisitionDate: Date;
    serialNumber: string;
    status: string;
    borrows: BorrowDTO;
}

export interface BorrowDTO {
    id: number;
    borrowDate: Date;
    returnDate: Date;
    member: MemberDTO;
    book: BookDTO;
    cassette: CassetteDTO;
    dvd: DVDDTO;
}

export interface CassetteDTO {
    id: number,
    author: string,
    title: string,
    acquisitionDate: Date,
    serialNumber: string,
    status: string,
}

export interface DVDDTO {
    id: number,
    author: string,
    title: string,
    acquisitionDate: Date,
    serialNumber: string,
    status: string,
}

export interface MemberDTO {
    id: number,
    name: string,
    phoneNumber: string,
    identityNumber: string,
    address: string, 
    status: string,
}