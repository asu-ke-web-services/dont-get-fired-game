Code Reviews
============

In order for your code to be reviewed, you will need to make a Pull Request into `develop`.

Once the PR passed through TravisCI and all checks pass, then a code review will be held where the following will be looked at:

* Obvious typos, poor variable names, unclear function names, large function defintions
* At least one test accompanies the PR
* Commented out code is deleted
* Violations of the styleguide that the linter does not yet catch
* Frameworks/libraries are utilized properly
* Adequate test coverage or critical code paths covered
* Tests are strengthed over time
* Refactor code for readibility