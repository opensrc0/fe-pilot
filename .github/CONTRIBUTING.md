Thanks for showing interest to contribute to FE-Pilot...!

## Setup the Project
[Setup fe-pilot locally on your machine and use in the your project](SETUP.md)

## Development

To improve our development process, we've set up tooling and systems. FE-Pilot
uses a monorepo structure and we treat each component as an independent package
that can be consumed in isolation.

### Tooling

- [NPM](https://www.npmjs.com/) to manage packages and dependencies

### Commands

**`npm install`**: bootstraps the entire project, symlinks all dependencies for
cross-component development and builds all components.

**`npm start`**: Runs the build and watch command for all component packages.

**`npm run build`**: run build for all component packages.

**`npm run test`**: run test for all component packages.

**`npm run commit`**: to commit the changes.

**`npm run create --component=Share_TEST`**: to create a component along with necessary files

## Think you found a bug?

Please conform to the issue template and provide a clear path to reproduction
with a code example. The best way to show a bug is by sending a CodeSandbox
link.

You may wish to use our starters to help you get going:

- JavaScript Starter: https://codesandbox.io/p/sandbox/fe-pilotjs-lts3rg

## Proposing new or changed API?

Please provide thoughtful comments and some sample API code. Proposals that
don't line up with our roadmap or don't have a thoughtful explanation will be
closed.

## Making a Pull Request?

Pull requests need only the :+1: of two or more collaborators to be merged; when
the PR author is a collaborator, that counts as one.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories


### Steps to PR

1. Fork the fe-pilot repository and clone your fork.

2. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. For example `fix/share` or `docs/scanner`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` will be short name that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/opensrc0/fe-pilot/blob/main/.github/CONTRIBUTING.md#commit-convention).


### Tests

All commits that fix bugs or add features need a test.

> **Dear fe-pilot team:** Please do not merge code without tests

## License

By contributing your code to the fe-pilot GitHub repository, you agree to
license your contribution under the MIT license.
