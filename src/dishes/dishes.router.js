const router = require("express").Router({mergeParams: true});
const ctl = require("./dishes.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

// TODO: Implement the /dishes routes needed to make the tests pass
// In the src/dishes/dishes.router.js file, add two routes: /dishes, and /dishes/:dishId and attach the handlers (create, read, update, and list) exported from src/dishes/dishes.controller.js.

router
    .route("/:dishId")
    .get(ctl.hasDishId,ctl.dishIdExists,ctl.read)
    .put(ctl.hasDishId,ctl.dishIdExists, ctl.validateBody,ctl.validateUpdateBody, ctl.update)
    .all(methodNotAllowed)

router
    .route("/")
    .get(ctl.list)
    .post(ctl.validateBody,ctl.create)
    .all(methodNotAllowed)


module.exports = router;
