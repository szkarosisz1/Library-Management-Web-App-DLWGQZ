import express from 'express';
import { BookController } from './controller/book.controller';
import { BorrowController } from './controller/borrow.controller';
import { CassetteController } from './controller/cassette.controller';
import { DvdController } from './controller/dvd.controller';
import { MemberController } from './controller/member.controller';

export function getRoutes(): express.Router{
    const router = express.Router();

    const bookController = new BookController();
    const borrowController = new BorrowController();
    const cassetteController = new CassetteController();
    const dvdController = new DvdController();
    const memberController = new MemberController();

    router.get('/book', bookController.getAll);
    router.get('/book/:id', bookController.getOne);
    router.post('/book', bookController.create);
    router.put('/book/:id', bookController.update);
    router.put('/book/:id/status', bookController.update);
    router.delete('/book/:id', bookController.delete);

    router.get('/borrow', borrowController.getAll);
    router.get('/borrow/:id', borrowController.getOne);
    router.post('/borrow', borrowController.create);
    router.put('/borrow/:id', borrowController.update);
    router.delete('/borrow/:id', borrowController.delete);

    router.get('/cassette', cassetteController.getAll);
    router.get('/cassette/:id', cassetteController.getOne);
    router.post('/cassette', cassetteController.create);
    router.put('/cassette/:id', cassetteController.update);
    router.put('/cassette/:id/status', cassetteController.update);
    router.delete('/cassette/:id', cassetteController.delete);

    router.get('/dvd', dvdController.getAll);
    router.get('/dvd/:id', dvdController.getOne);
    router.post('/dvd', dvdController.create);
    router.put('/dvd/:id', dvdController.update);
    router.put('/dvd/:id/status', dvdController.update);
    router.delete('/dvd/:id', dvdController.delete);

    router.get('/member', memberController.getAll);
    router.get('/member/:id', memberController.getOne);
    router.post('/member', memberController.create);
    router.put('/member/:id', memberController.update);
    router.put('/member/:id/status', memberController.update);
    router.delete('/member/:id', memberController.delete);

    return router;
}