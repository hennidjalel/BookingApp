export const creatError = (status, message) => {
    const err = new Error();
    err.status = 404;
    err.message = "Not found";
    return err;
};
