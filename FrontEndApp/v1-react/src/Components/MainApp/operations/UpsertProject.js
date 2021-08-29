import HomeService from "../HomeService";

export const handleCloseModalSave = async (values, IsEdit, setalert, setOpen, setOpenModal, SelectedProject, username, token) => {
    // vallidation
    if (
        values.project_name &&
        values.project_name.trim() &&
        values.project_description &&
        values.project_description.trim() &&
        values.data_dir &&
        values.data_dir.trim() &&
        values.output_file_name &&
        values.output_file_name.trim()
    ) {
        if (IsEdit) {
            var data = {
                project_name: values.project_name,
                project_description: values.project_description,
                project_id: SelectedProject.project_id,
                data_dir: values.data_dir,
                output_file_name: values.output_file_name,
                username: username,
                owner: SelectedProject.username,
            };

            var res = await HomeService.edit_project(token, data);
        } else {
            data = {
                language: values.language,
                library: values.library,
                project_name: values.project_name,
                project_description: values.project_description,
                task: values.task,
                path: values.data_dir,
                output_file_name: values.output_file_name,
                username: username,
            };
            res = await HomeService.create_project(token, data);
        }
        if (res.status === 200) {
            setalert({ ...values, msg: res.data.message, severity: "success" });
            localStorage.setItem("project_details", JSON.stringify(data));
        } else {
            setalert({ ...values, msg: res.data.message, severity: "error" });
        }
        setOpenModal(false);
    } else {
        setalert({
            ...values,
            msg: "Please fill all the details",
            severity: "warning",
        });
    }
    setOpen(true);
};
