const router = require("express").Router({mergeParams: true});
const oCtl = require("./orders.controller")

// TODO: Implement the /orders routes needed to make the tests pass
// In the src/orders/orders.router.js file, add two routes: /orders, and /orders/:orderId and attach the handlers (create, read, update, delete, and list) exported from src/orders/orders.controller.js.


router
    .route("/:orderId")
    .get(oCtl.hasOrderId,oCtl.orderExists,oCtl.read)
    .put(oCtl.hasOrderId,oCtl.orderExists,oCtl.validateBody, oCtl.validateUpdateBody,oCtl.update)
    .delete(oCtl.hasOrderId, oCtl.orderExists,oCtl.destroy)

router
    .route("/")
    .get(oCtl.list)
    .post(oCtl.validateBody, oCtl.create)


module.exports = router;
