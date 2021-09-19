import HomeService from "../HomeService";

export const handleDeleteYes = async (setCloseDeleteModal, currentProject, username, token, parentCallOnDelete) => {
    setCloseDeleteModal();
    const project_id =
        currentProject.username !== username
            ? "shared_" + currentProject.project_id
            : currentProject.project_id;
    const data = {
        username: username,
        project_id: project_id,
        project_name: currentProject.project_name,
        project_description: currentProject.project_description,
        owner: currentProject.username,
    };
    const res = await HomeService.delete_project(token, data);

    parentCallOnDelete();
};
