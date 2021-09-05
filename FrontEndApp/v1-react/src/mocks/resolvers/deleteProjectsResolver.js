export const deleteMockProject = (req, res, ctx) => {
    let status = 200;
    let success = True;
    let message = "Project Deleted Successfully";

    return res(
        ctx.status(status),
        ctx.json({ "success": success, "message": message })
    );
}
