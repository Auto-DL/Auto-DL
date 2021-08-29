import HomeService from "../HomeService";

export const handleSaveClone = async (values, SelectedProject, cloneOptions, setCloneStep, setOpenCloneModal, setOpen, setalert, username, token) => {
    var data = {
        language: values.language,
        library: values.library,
        project_name: values.project_name,
        project_id: SelectedProject.project_id,
        project_description: values.project_description,
        task: values.task,
        path: values.data_dir,
        output_file_name: values.output_file_name,
        username: username,
        model_layers: cloneOptions.modelLayers,
        preprocessing_parameters: cloneOptions.preprocessingParameters,
        hyper_parameters: cloneOptions.hyperParameters,
    };

    var res = await HomeService.clone_project(token, data);

    if (res.status === 200) {
        setalert({ ...values, msg: res.data.message, severity: "success" });
        localStorage.setItem("project_details", JSON.stringify(data));
    } else {
        setalert({ ...values, msg: res.data.message, severity: "error" });
    }

    setCloneStep(0);
    setOpenCloneModal(false);
    setOpen(true);
};
