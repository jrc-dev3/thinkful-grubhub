const router = require("express").Router({mergeParams: true});
const oCtl = require("./orders.controller")

// TODO: Implement the /orders routes needed to make the tests pass
// In the src/orders/orders.router.js file, add two routes: /orders, and /orders/:orderId and attach the handlers (create, read, update, delete, and list) exported from src/orders/orders.controller.js.


router
    .route("/:orderId")
    .get(oCtl.read)
    .put(oCtl.update)
    .delete(oCtl.destroy)

router
    .route("/")
    .get(oCtl.list)
    .post(oCtl.create)


module.exports = router;
