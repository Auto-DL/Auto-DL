class DeploymentException(Exception):
    pass


class ProjectNotFound(DeploymentException):
    def __init__(self, project_id) -> None:
        self.project_id = project_id
        super().__init__(f"\nProject {project_id} not found.")


class CloneGenerationFailed(DeploymentException):
    def __init__(self, deployment_dir) -> None:
        self.deployment_dir = deployment_dir
        super().__init__(f"\nCloning Flask App into {deployment_dir} failed.")


class AppUpsertionFailed(DeploymentException):
    def __init__(self, deployment_dir) -> None:
        self.deployment_dir = deployment_dir
        super().__init__(
            f"\nFlask App directory {deployment_dir} could not be modified."
        )


class AppDownloadFailed(DeploymentException):
    def __init__(self, deployment_dir) -> None:
        self.deployment_dir = deployment_dir
        super().__init__(f"\nDownload for Flask App {deployment_dir} failed.")


class PickleAppendFailed(DeploymentException):
    def __init__(self, project_id) -> None:
        self.project_id = project_id
        super().__init__(f"\nPickle chunk append for Project {project_id} failed.")


class PickleCopyFailed(DeploymentException):
    def __init__(self, pkl_path) -> None:
        self.pkl_path = pkl_path
        super().__init__(
            f"\nPickle file copy from {pkl_path} into Deployment Directory failed."
        )
