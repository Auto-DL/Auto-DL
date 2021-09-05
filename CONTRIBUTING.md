# Contributing to Auto-DL

First off, thanks for taking the time to contribute! :tada::tada:

The following is a set of guidelines for contributing to Auto-DL and it's packages, which are hosted in the [Auto-DL](https://github.com/Auto-DL) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Auto-DL Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [info.autodl@gmail.com](mailto:info.autodl@gmail.com).

## I don't want to read this whole thing I just have a question!!!

> **Note:** Please don't file an issue to ask a question. You'll get faster results by using the resources below.

* [Join the Auto-DL Stack Team](https://autodl.slack.com/join/shared_invite/zt-qagxiwub-ywRM_oBvvF~F7YNtlBqy_Q#/shared-invite/email)
    * Even though Slack is a chat service, sometimes it takes several hours for community members to respond &mdash; please be patient!
    * Use the `#general` channel for general questions or discussion about Auto-DL
    * Use the `#frontend` channel for questions or discussion about Auto-DL UI and design
    * Use the `#backend` channel for questions and discussion about Auto-DL rest API
    * Use the `#devops` channel for questions and discussion about Auto-DL deployments and devops
    * There are many other channels available, check the channel list

## What should I know before I get started?

## How Can I Contribute?

There are many ways you can contribute to Auto-DL but before contributing to the development of Auto-DL, please first check to see is an [issue exists](https://github.com/Auto-DL/Auto-DL/issues) already for the change you want to make. This is the entry point for your contributions.

### Don't see your issue? Open one

* If you spot some bug or want to suggest an enhancement open an issue using a [template](.github/ISSUE_TEMPLATE). This issue will be used to have a conversation about the problem and how to fix it.
* Add appropriate [labels](https://github.com/Auto-DL/Auto-DL/labels) to the issues so that it's easy to determine the type/domain of the issue. Also labels help to filter issues while searching for issues related to a particular group.

### Local development

Auto-DL and it's packages can be developed locally. For instructions on how to setup the repository you can [refer this](https://auto-dl.readthedocs.io/en/latest/installing.html).

Once the entire environment is setup, you are all set to start developing. Before sending your pull request for review, make sure your changes are consistent with the guidelines and follow the [styleguides](#styleguides).

### Styleguides

#### Git Commit Messages

* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Use [conventional commmits specification](https://www.conventionalcommits.org/en/v1.0.0/)
* Use imperative mood in the subject line eg. use `add` instead of `adds` or `added`
* Wrap the body at 72 characters
* Use the body to explain the what and why

#### Javascript

* We use Prettier for linting javascript. Before commiting and pushing the code run
```
npx prettier --write
```

#### Python

* We use Black code style. Before commiting and pushing the code run the black formatter
```
python -m black [source_file_or_directory]
```

### Open a Pull Request

If you think you have made appropriate changes to resolve a particular issue, you are all set to open a pull request. Please follow these steps while creating a pull request:

1. Make sure you have followed the [styleguides](#styleguides)
2. Follow the [template](.github/PULL_REQUEST.md)
3. Follow the naming convention: `[Fixes #ISSUE_NUMBER] Pull Request Title`
4. After you submit your pull request, verify that all the status checks are passing.
<details>
<summary>What is the status checks fail?</summary>
<br>
If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.
</details>
5. Auto-DL maintainers will review the pull request with you. After that, we may have questions, so please check back on your pull request at regular intervals to keep up with the conversation.

### Your PR is merged

After the pull request is reviewed and approved, it will be merged.

Congratulations! The Auto-DL community thanks you :tada:
