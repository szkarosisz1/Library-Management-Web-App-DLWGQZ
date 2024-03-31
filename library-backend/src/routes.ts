import express from 'express';
import { BookController } from './Controller/book.controller';
import { BorrowController } from './Controller/borrow.controller';
import { CassetteController } from './Controller/cassette.controller';
import { DvdController } from './Controller/dvd.controller';
import { MemberController } from './Controller/member.controller';

export function getRoutes(){
    const router = express.Router();

    const bookController = new BookController();
    const borrowController = new BorrowController();
    const cassetteController = new CassetteController();
    const dvdController = new DvdController();
    const memberController = new MemberController();

    router.get('/book', bookController.getAll);
    router.get('/book/:id', bookController.getOne);
    router.post('/book', bookController.create);
    router.put('/book', bookController.update);
    router.delete('/book/:id', bookController.delete);

    router.get('/borrow', borrowController.getAll);
    router.get('/borrow/:id', borrowController.getOne);
    router.post('/borrow', borrowController.create);
    router.put('/borrow', borrowController.update);
    router.delete('/borrow', borrowController.delete);

    router.get('/cassette', cassetteController.getAll);
    router.get('/cassette/:id', cassetteController.getOne);
    router.post('/cassette', cassetteController.create);
    router.put('/cassette', cassetteController.update);
    router.delete('/cassette/:id', cassetteController.delete);

    router.get('/dvd', dvdController.getAll);
    router.get('/dvd/:id', dvdController.getOne);
    router.post('/dvd', dvdController.create);
    router.put('/dvd', dvdController.update);
    router.delete('/dvd/:id', dvdController.delete);

    router.get('/member', memberController.getAll);
    router.get('/member/:id', memberController.getOne);
    router.post('/member', memberController.create);
    router.put('/member', memberController.update);
    router.delete('/member/:id', memberController.delete);
}