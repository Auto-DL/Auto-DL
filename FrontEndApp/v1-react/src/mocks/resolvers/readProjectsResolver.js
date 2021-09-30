const mockResponse = [
  {
    "13d6bbfd774b4578af3a300c7cbb31e6": {
      data_dir: "../data",
      lang: "python",
      lib: "Keras",
      output_file_name: "output.py",
      project_description: "first project",
      project_id: "13d6bbfd774b4578af3a300c7cbb31e6",
      project_name: "First",
      task: "Classification",
    },
  },
  {
    "13d6bbfd774b4578af3a300c7cbb31b8": {
      data_dir: "./data",
      lang: "python",
      lib: "Keras",
      output_file_name: "output.py",
      project_description: "second project",
      project_id: "13d6bbfd774b4578af3a300c7cbb31e6",
      project_name: "Second",
      task: "Classification",
    },
  },
];

export const getMockProjects = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ projects: mockResponse }));
};
