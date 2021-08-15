export const editMockProject = (req, res, ctx) => {
    let status = 200;
    let success = True;
    let message = "Project Edited Successfully";

    return res(
        ctx.status(status),
        ctx.json({ "success": success, "message": message })
    );
}
